'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import { BookingsView } from '@/components/dashboard/bookings-view';
import { PageHeader, Panel } from '@/components/dashboard/ui';
import type { HoursWindow, Profile, ServiceRow } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

/** Home of the dashboard: what is left to set up, and the next bookings. */
export function Overview() {
  const services = useApiResource<ServiceRow[]>('/api/org/services');
  const hours = useApiResource<HoursWindow[]>('/api/org/hours');
  const profile = useApiResource<Profile>('/api/org/profile');

  const steps = [
    { done: Boolean(profile?.value?.about), label: 'Fill in your business info', href: '/app/settings' },
    { done: (services?.value?.length ?? 0) > 0, label: 'Add services and prices', href: '/app/services' },
    { done: (hours?.value?.length ?? 0) > 0, label: 'Set opening hours', href: '/app/hours' },
    { done: false, label: 'Make a test call and book', href: '/app/test' },
    { done: false, label: 'Share your link or add the widget', href: '/app/share' },
  ];

  return (
    <>
      <PageHeader title={profile?.value ? `Welcome, ${profile.value.business_name}` : 'Welcome'} description="Your AI receptionist answers calls, explains your services and books appointments." />
      <Panel className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Get your receptionist ready</h2>
        <ol className="grid gap-2 sm:grid-cols-2">
          {steps.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm hover:bg-muted/50">
                <span className={cn('flex size-5 items-center justify-center rounded-full border', s.done ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-border text-transparent')}>
                  <Check className="size-3" aria-hidden />
                </span>
                <span className={cn(s.done ? 'text-muted-foreground line-through' : 'text-foreground')}>{s.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </Panel>
      <div className="flex items-baseline justify-between">
        <h2 className="text-base font-semibold text-foreground">Next bookings</h2>
        <Link href="/app/bookings" className="text-sm font-medium text-brand hover:underline">
          All bookings
        </Link>
      </div>
      <BookingsView compact />
    </>
  );
}
