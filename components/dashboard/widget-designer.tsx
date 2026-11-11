'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, ImageUp, Trash2 } from 'lucide-react';
import { Field, Notice, Panel, inputClass } from '@/components/dashboard/ui';
import { Button } from '@/components/ui/button';
import { type LogoSignature, type WidgetSettings, api } from '@/lib/api';
import { cn } from '@/lib/utils';

const COLORS = ['#4b46d6', '#1d4ed8', '#0f766e', '#15803d', '#be123c', '#b45309', '#111827'];
const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

/** The widget's preview page with these settings, so unsaved changes show straight away. */
function previewUrl(slug: string, w: WidgetSettings) {
  const query = new URLSearchParams({ label: w.label, color: w.color, position: w.position });
  if (w.logo_url) query.set('logo', w.logo_url);
  return `/widget-preview/${encodeURIComponent(slug)}?${query}`;
}

/**
 * How the website widget looks (button text, colour, side, logo), with a live preview of the real
 * widget on a sample site. Logos upload straight from the browser to Cloudinary, into the business's
 * own folder, with a signature from the API (the secret stays on the server).
 */
export function WidgetDesigner({ slug, initial }: { slug: string; initial: WidgetSettings }) {
  const [w, setW] = useState<WidgetSettings>(initial);
  const [saved, setSaved] = useState<WidgetSettings>(initial);
  const [preview, setPreview] = useState(() => previewUrl(slug, initial));
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState<'save' | 'upload' | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Reload the preview shortly after the last change, not on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setPreview(previewUrl(slug, w)), 400);
    return () => clearTimeout(t);
  }, [slug, w]);

  const set = <K extends keyof WidgetSettings>(key: K, value: WidgetSettings[K]) => {
    setW({ ...w, [key]: value });
    setNotice(null);
  };

  const save = async (next: WidgetSettings = w) => {
    setBusy('save');
    try {
      const out = await api<WidgetSettings>('/api/org/widget', { method: 'PUT', body: { ...next, label: next.label.trim() || 'Start your call' } });
      setW(out);
      setSaved(out);
      setNotice({ tone: 'ok', text: 'Saved. Your link and website widget use it now.' });
    } catch (err) {
      setNotice({ tone: 'error', text: err instanceof Error ? err.message : 'Could not save.' });
    } finally {
      setBusy(null);
    }
  };

  const upload = async (file: File) => {
    setNotice(null);
    if (!LOGO_TYPES.includes(file.type)) return setNotice({ tone: 'error', text: 'Use a PNG, JPG or WebP image.' });
    if (file.size > LOGO_MAX_BYTES) return setNotice({ tone: 'error', text: 'The logo must be 2 MB or smaller.' });
    setBusy('upload');
    try {
      const sig = await api<LogoSignature>('/api/org/logo/signature', { method: 'POST' });
      const form = new FormData();
      form.append('file', file);
      form.append('api_key', sig.api_key);
      form.append('timestamp', String(sig.timestamp));
      form.append('signature', sig.signature);
      for (const key of ['public_id', 'asset_folder', 'overwrite', 'invalidate', 'allowed_formats'] as const) form.append(key, sig[key]);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloud_name}/image/upload`, { method: 'POST', body: form });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error?.message ?? 'Upload failed');
      // Saved straight away, so the logo isn't lost if the page is left without pressing Save.
      await save({ ...w, logo_url: body.secure_url as string });
    } catch (err) {
      setNotice({ tone: 'error', text: err instanceof Error ? err.message : 'Could not upload the logo.' });
      setBusy(null);
    } finally {
      if (fileInput.current) fileInput.current.value = '';
    }
  };

  const dirty = JSON.stringify(w) !== JSON.stringify(saved);

  return (
    <Panel className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <div className="flex min-w-0 flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Widget design</h2>
          <p className="text-sm text-muted-foreground">How the call button looks on your website and on your link page. Changes show in the preview right away.</p>
        </div>

        <Field label="Logo" htmlFor="logo" hint="Shown on the button and on your link page. PNG, JPG or WebP, up to 2 MB; a square image looks best.">
          <div className="flex items-center gap-3">
            <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
              {w.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element -- remote Cloudinary image, shown as uploaded
                <img src={w.logo_url} alt="Your logo" className="size-full object-cover" />
              ) : (
                <ImageUp className="size-5 text-muted-foreground" aria-hidden />
              )}
            </span>
            <input
              ref={fileInput}
              id="logo"
              type="file"
              accept={LOGO_TYPES.join(',')}
              className="sr-only"
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
            <Button type="button" variant="outline" size="sm" disabled={busy !== null} onClick={() => fileInput.current?.click()}>
              {busy === 'upload' ? 'Uploading…' : w.logo_url ? 'Change logo' : 'Upload logo'}
            </Button>
            {w.logo_url && (
              <button
                type="button"
                disabled={busy !== null}
                onClick={() => save({ ...w, logo_url: null })}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3.5" aria-hidden /> Remove
              </button>
            )}
          </div>
        </Field>

        <Field label="Button text" htmlFor="widget-label">
          <input id="widget-label" value={w.label} maxLength={40} onChange={(e) => set('label', e.target.value)} className={inputClass} />
        </Field>

        <Field label="Colour" htmlFor="widget-color">
          <div className="flex flex-wrap items-center gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={`Colour ${c}`}
                aria-pressed={w.color === c}
                onClick={() => set('color', c)}
                className={cn('size-8 rounded-full ring-offset-2 ring-offset-background', w.color === c && 'ring-2 ring-foreground')}
                style={{ backgroundColor: c }}
              />
            ))}
            <label className="flex items-center gap-2 rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
              <input id="widget-color" type="color" value={w.color} onChange={(e) => set('color', e.target.value)} className="size-6 cursor-pointer rounded-full border-0 bg-transparent p-0" />
              Your own
            </label>
          </div>
        </Field>

        <Field label="Position" htmlFor="widget-position">
          <div id="widget-position" role="radiogroup" aria-label="Position" className="grid grid-cols-2 gap-2">
            {(['left', 'right'] as const).map((side) => (
              <button
                key={side}
                type="button"
                role="radio"
                aria-checked={w.position === side}
                onClick={() => set('position', side)}
                className={cn(
                  'rounded-xl border px-4 py-2.5 text-sm',
                  w.position === side ? 'border-brand bg-brand-soft font-medium text-brand' : 'border-border text-foreground hover:bg-muted/50',
                )}
              >
                Bottom {side}
              </button>
            ))}
          </div>
        </Field>

        {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" onClick={() => save()} disabled={busy !== null || !dirty}>
            {busy === 'save' ? 'Saving…' : 'Save design'}
          </Button>
          {dirty && <span className="text-xs text-muted-foreground">Unsaved changes</span>}
        </div>
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Live preview</span>
          <a href={preview} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-medium text-brand hover:underline">
            Open preview in browser <ExternalLink className="size-3.5" aria-hidden />
          </a>
        </div>
        <iframe
          key={preview}
          src={preview}
          title="Widget preview"
          allow="microphone; autoplay"
          className="h-[480px] w-full rounded-xl border border-border bg-white"
        />
      </div>
    </Panel>
  );
}
