'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { Notice, PageHeader, Panel } from '@/components/dashboard/ui';
import { WaveLoader } from '@/components/motion/wave-loader';
import { type BookingRow, api } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' });
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/** wa.me wants the number as digits only, with the country code and no "+". */
function whatsappLink(b: BookingRow) {
  const text = `Hi ${b.customer_name}, about your ${b.service_name} appointment on ${dayLabel(b.starts_at)} at ${timeLabel(b.starts_at)}.`;
  return `https://wa.me/${b.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

/** Upcoming bookings grouped by day, like a calendar agenda. Each one has the caller's number with
 *  WhatsApp and phone buttons, so the business can follow up itself. */
export function BookingsView({ compact = false }: { compact?: boolean }) {
  const [reload, setReload] = useState(0);
  const bookings = useApiResource<BookingRow[]>('/api/org/bookings', reload);

  const cancel = async (id: string) => {
    await api(`/api/org/bookings/${id}/cancel`, { method: 'POST' }).catch(() => {});
    setReload((n) => n + 1);
  };

  const rows = (bookings?.value ?? []).filter((b) => !compact || b.status === 'confirmed').slice(0, compact ? 5 : undefined);
  const days = new Map<string, BookingRow[]>();
  for (const b of rows) {
    const key = dayLabel(b.starts_at);
    days.set(key, [...(days.get(key) ?? []), b]);
  }

  return (
    <>
      {!compact && <PageHeader title="Bookings" description="Appointments your receptionist booked in the next 30 days. They appear here the moment a caller confirms." />}
      {!bookings && <WaveLoader label="Loading bookings" />}
      {bookings?.error && <Notice tone="error">{bookings.error}</Notice>}
      {bookings?.value && rows.length === 0 && (
        <Panel className="text-sm text-muted-foreground">
          No upcoming bookings yet. <Link href="/app/test" className="font-medium text-brand hover:underline">Make a test call</Link> and book one to see it here.
        </Panel>
      )}
      {[...days].map(([day, list]) => (
        <section key={day} className="space-y-2">
          <h2 className="text-sm font-semibold text-foreground/80">{day}</h2>
          <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {list.map((b) => (
              <div key={b.id} className={cn('flex flex-wrap items-center gap-x-5 gap-y-1 px-4 py-3', b.status === 'cancelled' && 'opacity-55')}>
                <div className="w-44 shrink-0 font-mono text-sm whitespace-nowrap text-foreground tabular-nums">
                  {timeLabel(b.starts_at)}
                  <span className="text-muted-foreground"> – {timeLabel(b.ends_at)}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">
                    {b.customer_name} <span className="font-normal text-muted-foreground">· {b.service_name}</span>
                  </div>
                  <div className="font-mono text-xs text-muted-foreground select-all">{b.customer_phone}</div>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{b.source}</span>
                {b.status === 'cancelled' ? (
                  <span className="text-xs text-muted-foreground">Cancelled</span>
                ) : (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">Confirmed</span>
                )}
                <div className="flex items-center gap-1.5">
                  <a
                    href={whatsappLink(b)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp ${b.customer_name}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  >
                    <MessageCircle className="size-3.5" aria-hidden />
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${b.customer_phone}`}
                    aria-label={`Call ${b.customer_name}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted/70"
                  >
                    <Phone className="size-3.5" aria-hidden />
                    Call
                  </a>
                </div>
                {b.call_id && (
                  <Link href={`/app/calls/${b.call_id}`} className="text-xs font-medium text-brand hover:underline">
                    Call log
                  </Link>
                )}
                {!compact && b.status !== 'cancelled' && (
                  <button type="button" onClick={() => cancel(b.id)} className="text-xs text-muted-foreground hover:text-destructive">
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
