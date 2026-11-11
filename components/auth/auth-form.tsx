'use client';

import { type FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Field, Notice, inputClass } from '@/components/dashboard/ui';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

type Mode = 'login' | 'signup';

/** Login and signup share one form; signup adds the owner's name and the business name. */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const next = useSearchParams().get('next');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setBusy(true);
    setError(null);
    try {
      await api(`/api/auth/${mode}`, { method: 'POST', body: form });
      // Only same-site dashboard paths, so the link can't send people elsewhere.
      router.replace(next?.startsWith('/app') ? next : '/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong, try again.');
      setBusy(false);
    }
  };

  const signup = mode === 'signup';
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {signup ? 'Create your Talkbalt account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {signup
            ? 'Your AI receptionist answers calls, explains your services and books appointments.'
            : 'Log in to see your bookings and calls.'}
        </p>
      </div>
      <form onSubmit={submit} className="space-y-4">
        {signup && (
          <>
            <Field label="Your name" htmlFor="name">
              <input id="name" name="name" required maxLength={120} autoComplete="name" className={inputClass} />
            </Field>
            <Field label="Business name" htmlFor="business_name" hint="Callers hear this name.">
              <input id="business_name" name="business_name" required maxLength={160} autoComplete="organization" className={inputClass} />
            </Field>
          </>
        )}
        <Field label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} />
        </Field>
        <Field label="Password" htmlFor="password" hint={signup ? 'At least 8 characters.' : undefined}>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={signup ? 8 : undefined}
            autoComplete={signup ? 'new-password' : 'current-password'}
            className={inputClass}
          />
        </Field>
        {error && <Notice tone="error">{error}</Notice>}
        <Button type="submit" disabled={busy} className="h-11 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
          {busy ? 'Please wait' : signup ? 'Create account' : 'Log in'}
        </Button>
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {signup ? 'Already have an account? ' : 'New to Talkbalt? '}
        <Link href={signup ? '/login' : '/signup'} className="font-medium text-brand hover:underline">
          {signup ? 'Log in' : 'Create an account'}
        </Link>
      </p>
    </div>
  );
}
