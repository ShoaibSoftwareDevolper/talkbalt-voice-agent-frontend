'use client';

import { type FormEvent, type InputHTMLAttributes, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Notice } from '@/components/dashboard/ui';
import { api } from '@/lib/api';

type Mode = 'login' | 'signup';

const underline =
  'peer h-12 w-full border-0 border-b border-input bg-transparent px-1 pb-1 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground';

function TextField({ label, hint, ...input }: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={input.id} className="sr-only">
        {label}
      </label>
      <input placeholder={label} className={underline} {...input} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Password input with a show/hide toggle. */
function PasswordField({ label, hint, ...input }: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [shown, setShown] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={input.id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input placeholder={label} type={shown ? 'text' : 'password'} className={`${underline} pr-10`} {...input} />
        <button
          type="button"
          onClick={() => setShown(!shown)}
          aria-label={shown ? 'Hide password' : 'Show password'}
          aria-pressed={shown}
          className="absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 text-muted-foreground hover:text-foreground"
        >
          {shown ? <EyeOff className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}
        </button>
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Login and signup share one form; signup adds the owner's name, the business name and a password check. */
export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const next = useSearchParams().get('next');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const signup = mode === 'signup';

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { confirm, ...form } = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    if (signup && form.password !== confirm) {
      setError('The two passwords do not match.');
      return;
    }
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

  return (
    <div className="w-full max-w-sm space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {signup ? 'Create account' : 'Welcome back'}
        </h1>
        <p className="text-sm text-muted-foreground">
          {signup ? 'Set up your receptionist in about ten minutes.' : 'Log in to see your bookings and calls.'}
        </p>
      </div>
      {/* The switch to sign up / log in sits close under the button, as part of the same action. */}
      <div className="space-y-5">
        <form onSubmit={submit} className="space-y-7">
          {signup && (
            <>
              <TextField id="name" name="name" label="Full name" required maxLength={120} autoComplete="name" />
              <TextField
                id="business_name"
                name="business_name"
                label="Business name"
                hint="Callers hear this name."
                required
                maxLength={160}
                autoComplete="organization"
              />
            </>
          )}
          <TextField id="email" name="email" type="email" label="Email address" required autoComplete="email" />
          <PasswordField
            id="password"
            name="password"
            label="Password"
            hint={signup ? 'At least 8 characters.' : undefined}
            required
            minLength={signup ? 8 : undefined}
            autoComplete={signup ? 'new-password' : 'current-password'}
          />
          {signup && (
            <PasswordField id="confirm" name="confirm" label="Confirm password" required minLength={8} autoComplete="new-password" />
          )}
          {error && <Notice tone="error">{error}</Notice>}
          <button
            type="submit"
            disabled={busy}
            className="mt-4 h-12 w-full rounded-full bg-foreground text-sm font-medium text-background transition-colors hover:bg-foreground/85 disabled:opacity-60"
          >
            {busy ? 'Please wait' : signup ? 'Create account' : 'Log in'}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {signup ? 'Already have an account? ' : 'New to Talkbalt? '}
          <Link href={signup ? '/login' : '/signup'} className="font-medium text-foreground underline decoration-foreground/30 underline-offset-[3px] hover:decoration-foreground">
            {signup ? 'Log in' : 'Create an account'}
          </Link>
        </p>
      </div>
    </div>
  );
}
