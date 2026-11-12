'use client';

import { useState, useSyncExternalStore } from 'react';
import { Check, Copy, Eye } from 'lucide-react';
import { Notice, PageHeader, Panel } from '@/components/dashboard/ui';
import { WaveLoader } from '@/components/motion/wave-loader';
import { WidgetDesigner } from '@/components/dashboard/widget-designer';
import { type Profile, type WidgetSettings, api } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

const noSubscribe = () => () => {};

function CopyBox({ id, value, multiline = false }: { id: string; value: string; multiline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      (document.getElementById(id) as HTMLTextAreaElement | null)?.select();
    }
  };
  return (
    <div className="flex items-stretch gap-2">
      <textarea
        id={id}
        readOnly
        value={value}
        rows={multiline ? 3 : 1}
        onFocus={(e) => e.currentTarget.select()}
        className="min-w-0 flex-1 resize-none rounded-lg border border-input bg-muted/40 px-3 py-2 font-mono text-xs leading-relaxed text-foreground outline-none"
      />
      <button
        type="button"
        onClick={copy}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-3 text-sm text-foreground hover:bg-muted"
      >
        {copied ? <Check className="size-4 text-foreground" aria-hidden /> : <Copy className="size-4" aria-hidden />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

/** The business's public link and website widget, like Calendly's link and embed options. */
export function ShareView() {
  const [reload, setReload] = useState(0);
  const loaded = useApiResource<Profile>('/api/org/profile', reload);
  const widget = useApiResource<WidgetSettings>('/api/org/widget');
  const [error, setError] = useState<string | null>(null);
  // The links point at wherever this dashboard is served from; unknown during server rendering.
  const origin = useSyncExternalStore(noSubscribe, () => window.location.origin, () => '');

  const p = loaded?.value;
  const toggle = async () => {
    if (!p) return;
    setError(null);
    try {
      await api('/api/org/profile', { method: 'PUT', body: { ...p, public_calls_enabled: !p.public_calls_enabled } });
      setReload((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not change it.');
    }
  };

  const link = p?.slug && origin ? `${origin}/b/${p.slug}` : '';
  const snippet = p?.slug && origin ? `<script src="${origin}/widget.js" data-business="${p.slug}" async></script>` : '';

  return (
    <>
      <PageHeader
        title="Share & embed"
        description="Visitors press “Start your call” and talk to your receptionist. Every call goes to your business only, and bookings land in your dashboard."
      />
      {!loaded && <WaveLoader label="Loading" />}
      {loaded?.error && <Notice tone="error">{loaded.error}</Notice>}
      {p && (
        <>
          <Panel className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h2 className="text-sm font-semibold text-foreground">Online calls</h2>
              <p className="text-sm text-muted-foreground">
                {p.public_calls_enabled ? 'Your link and widget are taking calls.' : 'Your link and widget show your info, but calls are switched off.'}
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={p.public_calls_enabled}
              aria-label="Online calls"
              onClick={toggle}
              className={cn('relative h-7 w-12 rounded-full transition-colors', p.public_calls_enabled ? 'bg-brand' : 'bg-muted-foreground/30')}
            >
              <span aria-hidden className={cn('absolute top-1 left-0 block size-5 rounded-full bg-white transition-transform', p.public_calls_enabled ? 'translate-x-6' : 'translate-x-1')} />
            </button>
          </Panel>
          {error && <Notice tone="error">{error}</Notice>}

          <Panel className="space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Your link</h2>
                <p className="text-sm text-muted-foreground">Share it anywhere: WhatsApp, Instagram bio, Google profile, email signature.</p>
              </div>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted"
                >
                  <Eye className="size-4" aria-hidden /> Preview in browser
                </a>
              )}
            </div>
            {link && <CopyBox id="share-link" value={link} />}
          </Panel>

          <Panel className="space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Website widget</h2>
              <p className="text-sm text-muted-foreground">
                Paste this line before <code className="font-mono text-xs">&lt;/body&gt;</code> on your website. A “Start your call” button appears in the corner.
              </p>
            </div>
            {snippet && <CopyBox id="share-snippet" value={snippet} multiline />}
            <p className="text-xs text-muted-foreground">
              Paste it once: changes you make in Widget design below show on your website automatically.
            </p>
          </Panel>

          {p.slug && widget?.value && <WidgetDesigner slug={p.slug} initial={widget.value} />}
          {widget?.error && <Notice tone="error">{widget.error}</Notice>}
        </>
      )}
    </>
  );
}
