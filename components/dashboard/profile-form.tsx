'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Field, Notice, PageHeader, Panel, inputClass } from '@/components/dashboard/ui';
import { WaveLoader } from '@/components/motion/wave-loader';
import { Button } from '@/components/ui/button';
import { type Faq, type LocationType, type Profile, api } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

const TIMEZONES = ['Asia/Karachi', 'Asia/Dubai', 'Asia/Riyadh', 'Europe/London', 'America/New_York', 'America/Chicago', 'America/Los_Angeles'];

const LOCATIONS: { value: LocationType; label: string; hint: string }[] = [
  { value: 'in_person', label: 'At my place', hint: 'Customers visit an address' },
  { value: 'remote', label: 'Remote', hint: 'Online or at the customer’s place' },
  { value: 'both', label: 'Both', hint: 'An address, and remote too' },
];

function Section({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <Panel className="grid gap-5 lg:grid-cols-[220px_1fr]">
      <div className="space-y-1">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">{hint}</p>
      </div>
      <div className="grid min-w-0 gap-4 sm:grid-cols-2">{children}</div>
    </Panel>
  );
}

/** Everything the receptionist knows about the business, in one form. */
function ProfileEditor({ initial }: { initial: Profile }) {
  const [p, setP] = useState<Profile>(initial);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setP({ ...p, [key]: value });
    setNotice(null);
  };
  const text = (key: 'business_name' | 'greeting' | 'about' | 'address' | 'city' | 'country' | 'contact_email' | 'website') => ({
    id: key,
    value: p[key] ?? '',
    onChange: (e: { target: { value: string } }) => set(key, e.target.value),
  });
  const setFaq = (i: number, patch: Partial<Faq>) => set('faqs', p.faqs.map((f, j) => (j === i ? { ...f, ...patch } : f)));

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const blank = (v: string | null) => (v?.trim() ? v.trim() : null);
    try {
      await api('/api/org/profile', {
        method: 'PUT',
        body: {
          ...p,
          business_name: p.business_name.trim(),
          greeting: blank(p.greeting),
          about: blank(p.about),
          address: blank(p.address),
          city: blank(p.city),
          country: blank(p.country),
          contact_email: blank(p.contact_email),
          website: blank(p.website),
          faqs: p.faqs.filter((f) => f.q.trim() && f.a.trim()).map((f) => ({ q: f.q.trim(), a: f.a.trim() })),
        },
      });
      setNotice({ tone: 'ok', text: 'Saved. The next call uses this information.' });
    } catch (err) {
      setNotice({ tone: 'error', text: err instanceof Error ? err.message : 'Could not save.' });
    } finally {
      setBusy(false);
    }
  };

  const physical = p.location_type !== 'remote';
  return (
    <form onSubmit={save} className="flex flex-col gap-4">
      <Section title="Basics" hint="Callers hear the business name. The description helps the receptionist answer questions.">
        <Field label="Business name" htmlFor="business_name">
          <input {...text('business_name')} required maxLength={160} className={inputClass} />
        </Field>
        <Field label="Time zone" htmlFor="timezone" hint="Opening hours and bookings use it.">
          <select id="timezone" value={p.timezone} onChange={(e) => set('timezone', e.target.value)} className={inputClass}>
            {[...new Set([p.timezone, ...TIMEZONES])].map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </Field>
        <Field label="About your business" htmlFor="about" className="sm:col-span-2" hint="What you do, who you serve, anything that makes you different.">
          <textarea {...text('about')} maxLength={2000} rows={4} className={cn(inputClass, 'h-auto py-2 leading-relaxed')} />
        </Field>
        <Field label="Greeting" htmlFor="greeting" className="sm:col-span-2" hint="Spoken word for word when a call starts. Empty: the receptionist greets in its own words.">
          <input {...text('greeting')} maxLength={300} placeholder={`Hello, thank you for calling ${p.business_name}. How can I help?`} className={inputClass} />
        </Field>
      </Section>

      <Section title="Location" hint="Where you serve customers. The receptionist tells callers where to come, or that you work remotely.">
        <div role="radiogroup" aria-label="Where you serve customers" className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
          {LOCATIONS.map((l) => (
            <button
              key={l.value}
              type="button"
              role="radio"
              aria-checked={p.location_type === l.value}
              onClick={() => set('location_type', l.value)}
              className={cn(
                'rounded-xl border px-3 py-2.5 text-left transition-colors',
                p.location_type === l.value ? 'border-brand bg-brand-soft' : 'border-border hover:bg-muted/50',
              )}
            >
              <div className={cn('text-sm font-medium', p.location_type === l.value ? 'text-brand' : 'text-foreground')}>{l.label}</div>
              <div className="text-xs text-muted-foreground">{l.hint}</div>
            </button>
          ))}
        </div>
        {physical && (
          <>
            <Field label="Address" htmlFor="address" className="sm:col-span-2">
              <input {...text('address')} maxLength={300} placeholder="Shop 4, 12 Main Boulevard" className={inputClass} />
            </Field>
            <Field label="City" htmlFor="city">
              <input {...text('city')} maxLength={120} className={inputClass} />
            </Field>
            <Field label="Country" htmlFor="country">
              <input {...text('country')} maxLength={80} className={inputClass} />
            </Field>
          </>
        )}
      </Section>

      <Section title="Contact" hint="Shared with callers who ask how else to reach you. Optional.">
        <Field label="Email" htmlFor="contact_email">
          <input {...text('contact_email')} type="email" maxLength={254} className={inputClass} />
        </Field>
        <Field label="Website" htmlFor="website">
          <input {...text('website')} type="url" maxLength={300} placeholder="https://" className={inputClass} />
        </Field>
      </Section>

      <Section title="Common questions" hint="Answers the receptionist gives in its own words: parking, payment methods, cancellations, anything callers often ask.">
        <div className="flex flex-col gap-3 sm:col-span-2">
          {p.faqs.length === 0 && <p className="text-sm text-muted-foreground">No questions yet.</p>}
          {p.faqs.map((f, i) => (
            <div key={i} className="grid gap-2 rounded-xl border border-border p-3 sm:grid-cols-[1fr_1.4fr_auto]">
              <input aria-label={`Question ${i + 1}`} value={f.q} maxLength={300} placeholder="Is there parking?" onChange={(e) => setFaq(i, { q: e.target.value })} className={inputClass} />
              <input aria-label={`Answer ${i + 1}`} value={f.a} maxLength={1000} placeholder="Yes, free parking behind the shop." onChange={(e) => setFaq(i, { a: e.target.value })} className={inputClass} />
              <button type="button" aria-label={`Remove question ${i + 1}`} onClick={() => set('faqs', p.faqs.filter((_, j) => j !== i))} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          {p.faqs.length < 30 && (
            <button type="button" onClick={() => set('faqs', [...p.faqs, { q: '', a: '' }])} className="flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline">
              <Plus className="size-4" aria-hidden /> Add a question
            </button>
          )}
        </div>
      </Section>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={busy} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
          {busy ? 'Saving' : 'Save business info'}
        </Button>
        {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}
      </div>
    </form>
  );
}

export function ProfileForm() {
  const loaded = useApiResource<Profile>('/api/org/profile');
  return (
    <>
      <PageHeader title="Business info" description="Everything your receptionist knows about your business. Services and products with prices are on their own page." />
      {!loaded && <WaveLoader label="Loading business info" />}
      {loaded?.error && <Notice tone="error">{loaded.error}</Notice>}
      {loaded?.value && <ProfileEditor initial={loaded.value} />}
    </>
  );
}
