'use client';

import { type ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, LogOut, Menu, Settings, X } from 'lucide-react';
import { api } from '@/lib/api';
import { indicatorClass, useSlidingIndicator } from '@/components/dashboard/sliding-indicator';
import { useMe } from '@/lib/use-me';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/app', label: 'Overview' },
  { href: '/app/bookings', label: 'Bookings' },
  { href: '/app/calls', label: 'Calls' },
  { href: '/app/analytics', label: 'Analytics', adminOnly: true },
  { href: '/app/services', label: 'Services' },
  { href: '/app/hours', label: 'Hours' },
  { href: '/app/settings', label: 'Business info' },
  { href: '/app/test', label: 'Test call' },
  { href: '/app/share', label: 'Share' },
];

/** The four voice bars and the name, used by the dashboard and the public business page. */
export function BrandMark() {
  return (
    <span className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
      <span className="flex size-9 items-center justify-center rounded-full bg-foreground">
        <span aria-hidden className="flex h-4 items-end gap-[3px]">
          {[7, 12, 16, 9].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-background" style={{ height: h }} />
          ))}
        </span>
      </span>
      Talkbalt
    </span>
  );
}

function isActive(pathname: string, href: string) {
  return href === '/app' ? pathname === '/app' : pathname.startsWith(href);
}

/** Desktop navigation: the black pill slides to the open page. Reads the URL, so it sits in Suspense. */
function DesktopNav({ items }: { items: typeof NAV }) {
  const pathname = usePathname();
  const ref = useSlidingIndicator<HTMLElement>(pathname);
  return (
    <nav ref={ref} aria-label="Dashboard" className="relative hidden items-center gap-0.5 rounded-full bg-muted p-1 xl:flex">
      <span data-indicator aria-hidden className={indicatorClass} />
      {items.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            data-active={active}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'relative rounded-full px-3.5 py-1.5 text-sm whitespace-nowrap transition-colors duration-300',
              active ? 'text-background' : 'text-foreground/75 hover:text-foreground',
            )}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Phone and tablet navigation inside the menu panel. */
function MobileNavLinks({ items, onNavigate }: { items: typeof NAV; onNavigate: () => void }) {
  const pathname = usePathname();
  return items.map(({ href, label }) => {
    const active = isActive(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        onClick={onNavigate}
        aria-current={active ? 'page' : undefined}
        className={cn('rounded-full px-4 py-2.5 text-sm', active ? 'bg-foreground text-background' : 'text-foreground hover:bg-muted')}
      >
        {label}
      </Link>
    );
  });
}

function initials(name: string | undefined) {
  return (name ?? '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

/** The business name and email with a small menu holding Business info and Log out. */
function AccountMenu({ orgName, email, onLogout }: { orgName?: string; email?: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-2.5 rounded-full py-1 pr-2 pl-1 hover:bg-muted"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
          {initials(orgName) || ' '}
        </span>
        <span className="hidden max-w-40 flex-col text-left leading-tight lg:flex">
          <span className="truncate text-sm font-medium text-foreground">{orgName ?? ' '}</span>
          <span className="truncate text-xs text-muted-foreground">{email ?? ' '}</span>
        </span>
        <ChevronDown aria-hidden className="hidden size-4 text-muted-foreground lg:block" />
      </button>
      {open && (
        <div role="menu" className="absolute top-full right-0 z-30 mt-2 w-56 rounded-2xl border border-border bg-card p-1.5">
          <div className="px-3 py-2 lg:hidden">
            <div className="truncate text-sm font-medium text-foreground">{orgName}</div>
            <div className="truncate text-xs text-muted-foreground">{email}</div>
          </div>
          <Link role="menuitem" href="/app/settings" onClick={() => setOpen(false)} className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted">
            <Settings aria-hidden className="size-4" /> Business info
          </Link>
          <button role="menuitem" type="button" onClick={onLogout} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-muted">
            <LogOut aria-hidden className="size-4" /> Log out
          </button>
        </div>
      )}
    </div>
  );
}

/** Frame of every dashboard page: a top bar with the logo, pill navigation and the account, then the page. */
export function DashboardShell({ children }: { children: ReactNode }) {
  const me = useMe();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = NAV.filter((item) => me?.value?.is_admin || !item.adminOnly);

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
    // data-dash: smooth button and link feedback for the dashboard (globals.css).
    <div data-dash className="flex min-h-full flex-1 flex-col bg-muted">
      <header className="sticky top-0 z-20 px-2 pt-2 sm:px-4 sm:pt-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full bg-background py-2 pr-2 pl-4">
          <Link href="/app" aria-label="Talkbalt dashboard">
            <BrandMark />
          </Link>

          <Suspense>
            <DesktopNav items={nav} />
          </Suspense>

          <div className="flex items-center gap-1.5">
            <Link
              href="/app/settings"
              aria-label="Business info"
              className="hidden size-10 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted sm:flex"
            >
              <Settings aria-hidden className="size-4" />
            </Link>
            <AccountMenu orgName={me?.value?.org_name} email={me?.value?.email} onLogout={logout} />
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex size-10 items-center justify-center rounded-full bg-foreground text-background xl:hidden"
            >
              {menuOpen ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav aria-label="Dashboard" className="mx-auto mt-2 grid max-w-7xl grid-cols-2 gap-1 rounded-3xl bg-background p-2 sm:grid-cols-3 xl:hidden">
            <Suspense>
              <MobileNavLinks items={nav} onNavigate={() => setMenuOpen(false)} />
            </Suspense>
          </nav>
        )}
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-3 py-6 sm:px-6 sm:py-8">{children}</main>
    </div>
  );
}
