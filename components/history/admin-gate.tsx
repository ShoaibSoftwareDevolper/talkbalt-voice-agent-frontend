'use client';

import { type FormEvent, type ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { setAdminToken, useAdminToken } from '@/lib/admin-api';

/** Page frame for the history views: header plus a one-time admin token prompt. */
export function AdminGate({ children }: { children: (token: string) => ReactNode }) {
  const token = useAdminToken();
  const [draft, setDraft] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (draft.trim()) setAdminToken(draft.trim());
    setDraft('');
  };

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-semibold tracking-wide text-zinc-200 hover:text-white">
            Talkbalt
          </Link>
          <Link href="/history" className="text-zinc-400 hover:text-zinc-200">
            History
          </Link>
          <Link href="/analytics" className="text-zinc-400 hover:text-zinc-200">
            Analytics
          </Link>
        </nav>
        {token && (
          <button
            type="button"
            onClick={() => setAdminToken(null)}
            className="font-mono text-xs text-zinc-500 hover:text-zinc-300"
          >
            Forget token
          </button>
        )}
      </header>

      {token === undefined ? null : token ? (
        children(token)
      ) : (
        <form onSubmit={submit} className="mx-auto mt-16 flex w-full max-w-sm flex-col gap-3">
          <label htmlFor="admin-token" className="text-sm text-zinc-300">
            Admin token
          </label>
          <input
            id="admin-token"
            type="password"
            autoComplete="off"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-zinc-100 outline-none focus:border-sky-400/60"
          />
          <p className="text-xs text-zinc-500">
            ADMIN_TOKEN from backend-web/.env.local. Kept only for this tab.
          </p>
          <Button type="submit" className="h-10 rounded-full">
            Continue
          </Button>
        </form>
      )}
    </div>
  );
}
