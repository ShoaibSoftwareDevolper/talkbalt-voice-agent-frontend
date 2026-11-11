'use client';

import { useMemo } from 'react';
import { Globe, Mail, MapPin, Wifi } from 'lucide-react';
import { WaveLoader } from '@/components/motion/wave-loader';
import { TalkbaltApp } from '@/components/talkbalt/talkbalt-app';
import { type PublicBusiness, type PublicItem, WEEKDAYS, formatPrice } from '@/lib/api';
import { publicCallTokenSource } from '@/lib/token-source';
import { useApiResource } from '@/lib/use-api-resource';

function clock(hhmmss: string) {
  const [h, m] = hhmmss.split(':').map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function Items({ title, items }: { title: string; items: PublicItem[] }) {
  if (items.length === 0) return null;
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {items.map((s) => (
          <li key={s.name} className="flex items-start justify-between gap-4 px-4 py-3">
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">{s.name}</div>
              {s.description && <div className="text-xs text-muted-foreground">{s.description}</div>}
            </div>
            <div className="shrink-0 text-right text-sm text-foreground/80 tabular-nums">
              {formatPrice(s.price_cents, s.currency) !== '--' && <div>{formatPrice(s.price_cents, s.currency)}</div>}
              {s.duration_min && <div className="text-xs text-muted-foreground">{s.duration_min} min</div>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Details({ b }: { b: PublicBusiness }) {
  const place = [b.address, b.city, b.country].filter(Boolean).join(', ');
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground">{b.name}</h1>
        {b.about && <p className="max-w-prose leading-relaxed text-muted-foreground">{b.about}</p>}
      </div>
      <ul className="flex flex-col gap-2 text-sm text-foreground/80">
        {b.location_type !== 'remote' && place && (
          <li className="flex items-center gap-2"><MapPin className="size-4 text-brand" aria-hidden />{place}</li>
        )}
        {b.location_type !== 'in_person' && (
          <li className="flex items-center gap-2"><Wifi className="size-4 text-brand" aria-hidden />{b.location_type === 'remote' ? 'Remote service' : 'Remote appointments too'}</li>
        )}
        {b.website && (
          <li className="flex items-center gap-2"><Globe className="size-4 text-brand" aria-hidden /><a href={b.website} target="_blank" rel="noreferrer" className="hover:underline">{b.website.replace(/^https?:\/\//, '')}</a></li>
        )}
        {b.contact_email && <li className="flex items-center gap-2"><Mail className="size-4 text-brand" aria-hidden />{b.contact_email}</li>}
      </ul>
      <Items title="Services" items={b.services} />
      <Items title="Products" items={b.products} />
      {b.hours.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground">Opening hours</h2>
          <ul className="grid gap-1 text-sm sm:grid-cols-2">
            {WEEKDAYS.map((day, i) => {
              const h = b.hours.find((w) => w.weekday === i);
              return (
                <li key={day} className="flex justify-between gap-4 rounded-lg px-3 py-1.5 odd:bg-muted/50">
                  <span className="text-foreground/80">{day}</span>
                  <span className="text-muted-foreground tabular-nums">{h ? `${clock(h.opens)} – ${clock(h.closes)}` : 'Closed'}</span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

/**
 * A business's public page: its info and a "Start your call" button that connects the visitor
 * to that business's receptionist. `embedded` is the compact version inside the website widget.
 */
export function BusinessPage({ slug, embedded = false }: { slug: string; embedded?: boolean }) {
  const loaded = useApiResource<PublicBusiness>(`/api/public/${encodeURIComponent(slug)}`);
  const tokenSource = useMemo(() => publicCallTokenSource(slug), [slug]);
  const b = loaded?.value;

  if (!loaded) return <WaveLoader label="Loading" className="justify-center" />;
  if (!b) {
    return <p className="py-16 text-center text-muted-foreground">{loaded.error ?? 'This business link does not exist.'}</p>;
  }

  const call = b.calls_enabled ? (
    <TalkbaltApp
      tokenSource={tokenSource}
      title={embedded ? b.name : 'Talk to us now'}
      description={`Our AI receptionist answers questions about ${b.name} and can book your appointment.`}
      startLabel="Start your call"
    />
  ) : (
    <p className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
      {b.name} isn’t taking calls online right now.
    </p>
  );

  if (embedded) return <div className="flex flex-1 flex-col px-4">{call}</div>;
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-16">
      <Details b={b} />
      <div className="lg:sticky lg:top-8 lg:self-start">{call}</div>
    </div>
  );
}
