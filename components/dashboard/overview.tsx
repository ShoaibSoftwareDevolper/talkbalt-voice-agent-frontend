'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowUp,
  CalendarCheck,
  CalendarClock,
  Check,
  MessageCircle,
  Mic,
  Phone,
  PhoneCall,
  Search,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WaveLoader } from '@/components/motion/wave-loader';
import { indicatorClass, useSlidingIndicator } from '@/components/dashboard/sliding-indicator';
import type { BookingRow, HoursWindow, Profile, ServiceRow } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

type Stats = {
  days: number;
  calls: number;
  bookings_confirmed: number;
  bookings_cancelled: number;
  upcoming: number;
  prev_calls: number;
  prev_bookings_confirmed: number;
  daily: { date: string; calls: number; bookings: number }[];
};

const RANGES = [7, 30] as const;
type Range = (typeof RANGES)[number];

// min-w-0: charts and tables inside grid cells must be allowed to shrink, or they widen the page on phones.
const card = 'min-w-0 rounded-3xl bg-card p-5 sm:p-6';

function percent(part: number, whole: number) {
  return whole > 0 ? Math.round((part / whole) * 100) : 0;
}

/** Change against the previous period, as a small pill: up, down or flat. */
function Change({ now, before, dark }: { now: number; before: number; dark?: boolean }) {
  if (before === 0 && now === 0) return null;
  const pct = before === 0 ? 100 : Math.round(((now - before) / before) * 100);
  const up = pct >= 0;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums',
        dark ? 'bg-background/15 text-background' : up ? 'bg-muted text-foreground' : 'bg-destructive/10 text-destructive',
      )}
    >
      {up ? <ArrowUp aria-hidden className="size-3" /> : <ArrowDown aria-hidden className="size-3" />}
      {Math.abs(pct)}%
    </span>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  footer,
  change,
  dark,
}: {
  label: string;
  value: string;
  icon: typeof PhoneCall;
  footer: string;
  change?: { now: number; before: number };
  dark?: boolean;
}) {
  return (
    <div className={cn(card, 'flex flex-col gap-4', dark && 'bg-foreground text-background')}>
      <div className="flex items-start justify-between gap-3">
        <span className={cn('text-sm', dark ? 'text-background/70' : 'text-muted-foreground')}>{label}</span>
        <span className={cn('flex size-10 items-center justify-center rounded-full', dark ? 'bg-background text-foreground' : 'bg-foreground text-background')}>
          <Icon aria-hidden className="size-4" />
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-4xl font-semibold tracking-tight tabular-nums">{value}</span>
        {change && <Change now={change.now} before={change.before} dark={dark} />}
      </div>
      <span className={cn('text-xs', dark ? 'text-background/60' : 'text-muted-foreground')}>{footer}</span>
    </div>
  );
}

function shortDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Performance({ stats, range }: { stats: Stats; range: Range }) {
  const data = stats.daily.map((d) => ({ date: shortDate(d.date), calls: d.calls, bookings: d.bookings }));
  const size = range === 7 ? 30 : 9;
  return (
    <ChartContainer
      config={{ calls: { label: 'Calls', color: 'var(--chart-1)' }, bookings: { label: 'Bookings', color: 'var(--foreground)' } }}
      className="h-64 w-full"
    >
      <BarChart data={data} margin={{ left: -12, right: 4, top: 8 }} barGap={-size} barSize={size}>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} interval={range === 7 ? 0 : 'preserveStartEnd'} minTickGap={16} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={36} />
        <ChartTooltip cursor={{ fill: 'var(--muted)', fillOpacity: 0.5, radius: 10 }} content={<ChartTooltipContent />} />
        <Bar dataKey="calls" fill="var(--color-calls)" radius={8} isAnimationActive={false} />
        <Bar dataKey="bookings" fill="var(--color-bookings)" radius={8} isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  );
}

function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

function timeLabel(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function whatsappLink(b: BookingRow) {
  const text = `Hi ${b.customer_name}, about your ${b.service_name} appointment on ${dayLabel(b.starts_at)} at ${timeLabel(b.starts_at)}.`;
  return `https://wa.me/${b.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

type Sort = 'soonest' | 'latest' | 'name';

function UpcomingTable() {
  // Only bookings that have not started yet, matching the Upcoming card (filtered by the API).
  const bookings = useApiResource<BookingRow[]>('/api/org/bookings?upcoming=true');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>('soonest');

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (bookings?.value ?? []).filter(
      (b) => (!q || [b.customer_name, b.service_name, b.customer_phone].some((v) => v.toLowerCase().includes(q))),
    );
    return list.sort((a, b) =>
      sort === 'name' ? a.customer_name.localeCompare(b.customer_name) : (sort === 'soonest' ? 1 : -1) * a.starts_at.localeCompare(b.starts_at),
    );
  }, [bookings, query, sort]);

  return (
    <section className={cn(card, 'flex flex-col gap-4')}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Upcoming bookings</h2>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-10 items-center gap-2 rounded-full bg-muted px-4 text-sm">
            <Search aria-hidden className="size-4 text-muted-foreground" />
            <span className="sr-only">Search bookings</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, service, phone"
              className="w-44 bg-transparent text-foreground outline-none placeholder:text-muted-foreground sm:w-56"
            />
          </label>
          <label className="flex h-10 items-center rounded-full border border-border px-3 text-sm">
            <span className="sr-only">Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="bg-transparent pr-1 text-foreground outline-none">
              <option value="soonest">Soonest first</option>
              <option value="latest">Latest first</option>
              <option value="name">Customer name</option>
            </select>
          </label>
          <Link href="/app/bookings" className="flex h-10 items-center rounded-full bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/85">
            All bookings
          </Link>
        </div>
      </div>

      {!bookings && <WaveLoader label="Loading bookings" className="justify-center" />}
      {bookings?.error && <p className="text-sm text-destructive">{bookings.error}</p>}
      {bookings?.value && rows.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          {query ? 'No bookings match your search.' : 'No upcoming bookings yet. Make a test call and book one to see it here.'}
        </p>
      )}
      {rows.length > 0 && (
        <div className="-mx-5 overflow-x-auto sm:-mx-6">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground">
                {['Customer', 'Service', 'Date', 'Time', 'Phone', 'Status', ''].map((h, i) => (
                  <th key={i} className="bg-muted px-5 py-3 font-medium first:rounded-l-2xl last:rounded-r-2xl sm:first:pl-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((b) => (
                <tr key={b.id} className={cn(b.status === 'cancelled' && 'opacity-55')}>
                  <td className="px-5 py-3.5 font-medium text-foreground sm:pl-6">{b.customer_name}</td>
                  <td className="px-5 py-3.5 text-foreground/80">{b.service_name}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-foreground/80">{dayLabel(b.starts_at)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-foreground/80 tabular-nums">{timeLabel(b.starts_at)}</td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-foreground/80 tabular-nums">{b.customer_phone}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-medium',
                        b.status === 'confirmed' ? 'bg-foreground text-background' : 'bg-muted text-muted-foreground',
                      )}
                    >
                      {b.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 sm:pr-6">
                    <div className="flex justify-end gap-1.5">
                      <a href={whatsappLink(b)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${b.customer_name}`} className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-muted">
                        <MessageCircle aria-hidden className="size-4" />
                      </a>
                      <a href={`tel:${b.customer_phone}`} aria-label={`Call ${b.customer_name}`} className="flex size-8 items-center justify-center rounded-full border border-border hover:bg-muted">
                        <Phone aria-hidden className="size-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/** Shown until the business has finished the basics, then it disappears. */
function SetupChecklist() {
  const services = useApiResource<ServiceRow[]>('/api/org/services');
  const hours = useApiResource<HoursWindow[]>('/api/org/hours');
  const profile = useApiResource<Profile>('/api/org/profile');
  if (!services || !hours || !profile) return null;
  const steps = [
    { done: Boolean(profile.value?.about), label: 'Business info', href: '/app/settings' },
    { done: (services.value?.length ?? 0) > 0, label: 'Services and prices', href: '/app/services' },
    { done: (hours.value?.length ?? 0) > 0, label: 'Opening hours', href: '/app/hours' },
  ];
  if (steps.every((s) => s.done)) return null;
  return (
    <section className={cn(card, 'flex flex-wrap items-center justify-between gap-4')}>
      <div>
        <h2 className="font-semibold text-foreground">Finish setting up your receptionist</h2>
        <p className="text-sm text-muted-foreground">It can only answer and book with this information.</p>
      </div>
      <ol className="flex flex-wrap gap-2">
        {steps.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className={cn(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm',
                s.done ? 'border-border text-muted-foreground line-through' : 'border-foreground text-foreground hover:bg-muted',
              )}
            >
              <Check aria-hidden className={cn('size-4', !s.done && 'opacity-30')} />
              {s.label}
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** Home of the dashboard, kept calm on purpose: four numbers, one chart and the next bookings. */
export function Overview() {
  const [range, setRange] = useState<Range>(7);
  const stats = useApiResource<Stats>(`/api/org/stats?days=${range}`, 0, { keepPrevious: true });
  const rangeRef = useSlidingIndicator<HTMLDivElement>(range);
  const s = stats?.value;
  const rate = s ? percent(s.bookings_confirmed, s.calls) : 0;
  const prevRate = s ? percent(s.prev_bookings_confirmed, s.prev_calls) : 0;
  const prevLabel = `Previous ${range} days`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Overview</h1>
          <p className="text-sm text-muted-foreground">Your calls and bookings for the last {range} days.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div ref={rangeRef} role="group" aria-label="Period" className="relative flex rounded-full bg-card p-1">
            <span data-indicator aria-hidden className={indicatorClass} />
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                aria-pressed={range === r}
                data-active={range === r}
                className={cn('relative rounded-full px-4 py-1.5 text-sm duration-300', range === r ? 'text-background' : 'text-foreground/75 hover:text-foreground')}
              >
                {r} days
              </button>
            ))}
          </div>
          <Link href="/app/share" className="flex h-10 items-center gap-2 rounded-full bg-card px-4 text-sm text-foreground hover:bg-background">
            <Share2 aria-hidden className="size-4" /> Share link
          </Link>
          <Link href="/app/test" className="flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background hover:bg-foreground/85">
            <Mic aria-hidden className="size-4" /> Test call
          </Link>
        </div>
      </div>

      <SetupChecklist />

      {stats?.error && <p className="text-sm text-destructive">{stats.error}</p>}

      {/* While a new period loads, the old numbers stay, slightly faded, instead of blinking away. */}
      <div className={cn('grid gap-3 transition-opacity duration-300 sm:grid-cols-2 xl:grid-cols-4', stats?.stale && 'opacity-60')}>
        <StatCard dark label="Calls" icon={PhoneCall} value={s ? String(s.calls) : '–'} change={s && { now: s.calls, before: s.prev_calls }} footer={s ? `${prevLabel}: ${s.prev_calls}` : ' '} />
        <StatCard label="Confirmed bookings" icon={CalendarCheck} value={s ? String(s.bookings_confirmed) : '–'} change={s && { now: s.bookings_confirmed, before: s.prev_bookings_confirmed }} footer={s ? `${prevLabel}: ${s.prev_bookings_confirmed} · ${s.bookings_cancelled} cancelled` : ' '} />
        <StatCard label="Booking rate" icon={TrendingUp} value={s ? `${rate}%` : '–'} footer={s ? `${prevLabel}: ${prevRate}%` : ' '} />
        <StatCard label="Upcoming" icon={CalendarClock} value={s ? String(s.upcoming) : '–'} footer="Confirmed bookings still ahead" />
      </div>

      <section className={cn(card, 'flex flex-col gap-4')}>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Calls and bookings</h2>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-chart-1" /> Calls</span>
            <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-foreground" /> Bookings</span>
          </div>
        </div>
        {s ? <Performance stats={s} range={range} /> : <WaveLoader label="Loading your numbers" className="h-64 justify-center" />}
      </section>

      <UpcomingTable />
    </>
  );
}
