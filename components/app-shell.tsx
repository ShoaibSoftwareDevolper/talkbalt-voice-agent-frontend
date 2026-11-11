'use client';

import { type ReactNode, Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart3,
  CalendarDays,
  Clock,
  Home,
  LogOut,
  Menu,
  Mic,
  PhoneCall,
  Scissors,
  Settings,
  Share2,
} from 'lucide-react';
import { api } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

type Me = { name: string; email: string; org_name: string; role: string };

const NAV = [
  { href: '/app', label: 'Overview', icon: Home },
  { href: '/app/bookings', label: 'Bookings', icon: CalendarDays },
  { href: '/app/calls', label: 'Calls', icon: PhoneCall },
  { href: '/app/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/app/services', label: 'Services & products', icon: Scissors },
  { href: '/app/hours', label: 'Opening hours', icon: Clock },
  { href: '/app/settings', label: 'Business info', icon: Settings },
  { href: '/app/test', label: 'Test call', icon: Mic },
  { href: '/app/share', label: 'Share & embed', icon: Share2 },
];

export function BrandMark() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
      <span aria-hidden className="flex h-6 items-end gap-[3px]">
        {[10, 18, 24, 14].map((h, i) => (
          <span key={i} className="w-[3px] rounded-full bg-brand" style={{ height: h }} />
        ))}
      </span>
      Talkbalt
    </span>
  );
}

/** Header of the public pages: landing, login, signup. */
export function PublicHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Talkbalt home">
          <BrandMark />
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/login" className="rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground">
            Log in
          </Link>
          <Link href="/signup" className="rounded-full bg-foreground px-3 py-1.5 text-background hover:bg-foreground/90">
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SideNav({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-0.5 text-sm">
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === '/app' ? pathname === '/app' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-3 py-2 transition-colors',
              active ? 'bg-brand-soft font-medium text-brand' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <Icon aria-hidden className="size-4" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Frame of every dashboard page: sidebar with the business and navigation, content on the right. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const me = useApiResource<Me>('/api/auth/me');
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // The session cookie is still there but the session ended (expired or logged out elsewhere).
  // Clearing the cookie first matters: proxy.ts sends anyone with a cookie away from /login.
  const signedOut = me?.status === 401;
  useEffect(() => {
    if (!signedOut) return;
    const next = `/login?next=${encodeURIComponent(window.location.pathname)}`;
    api('/api/auth/logout', { method: 'POST' })
      .catch(() => {})
      .finally(() => router.replace(next));
  }, [signedOut, router]);

  const logout = async () => {
    await api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    router.replace('/login');
  };

  return (
    <div className="flex min-h-full flex-1">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-20 flex w-64 flex-col gap-6 border-r border-border bg-background px-3 py-4 transition-transform md:static md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <Link href="/app" className="px-3">
          <BrandMark />
        </Link>
        <div className="rounded-lg border border-border bg-card px-3 py-2">
          <div className="truncate text-sm font-medium text-foreground">{me?.value?.org_name ?? ' '}</div>
          <div className="truncate text-xs text-muted-foreground">{me?.value?.email ?? ' '}</div>
        </div>
        <Suspense>
          <SideNav onNavigate={() => setOpen(false)} />
        </Suspense>
        <button
          type="button"
          onClick={logout}
          className="mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <LogOut aria-hidden className="size-4" />
          Log out
        </button>
      </aside>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-10 bg-foreground/20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex h-14 items-center border-b border-border px-4 md:hidden">
          <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-muted">
            <Menu className="size-5" />
          </button>
        </div>
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}
