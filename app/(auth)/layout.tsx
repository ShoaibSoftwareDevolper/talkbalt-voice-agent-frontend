import type { ReactNode } from 'react';
import Link from 'next/link';
import { AuthRibbon } from '@/components/auth/auth-ribbon';

function BrandMark() {
  return (
    <Link href="/" aria-label="Talkbalt home" className="flex w-fit items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-full bg-foreground">
        <span aria-hidden className="flex h-5 items-end gap-[3px]">
          {[8, 14, 20, 11].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-background" style={{ height: h }} />
          ))}
        </span>
      </span>
      <span className="text-lg font-semibold tracking-tight text-foreground">Talkbalt</span>
    </Link>
  );
}

/**
 * Log in and sign up: a soft brand panel with the hero ribbon on the left, and the form on a white
 * card that overlaps it on the right. On phones the panel becomes a short band above the card.
 */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main data-entrance className="flex min-h-svh flex-1 items-center justify-center bg-muted p-2 sm:p-6">
      <div className="enter-card relative flex w-full max-w-6xl flex-col md:min-h-[min(46rem,calc(100svh-3rem))] md:flex-row">
        {/* Brand panel */}
        <div className="relative flex flex-col gap-4 overflow-visible rounded-[1.75rem] bg-brand-soft px-6 pt-6 pb-28 sm:rounded-[2rem] sm:px-10 sm:pt-10 md:w-[44%] md:pb-10">
          <BrandMark />
          <p className="max-w-xs text-xl leading-snug tracking-tight text-foreground/80 sm:text-2xl">
            Your AI receptionist, in Urdu, Hindi and English. Every call answered, every booking confirmed.
          </p>
          {/* The ribbon spills over the card edge on wide screens, like an object resting between the two. */}
          <AuthRibbon className="pointer-events-none absolute right-2 -bottom-10 z-20 h-40 w-40 sm:h-48 sm:w-48 md:top-1/2 md:right-[-14%] md:bottom-auto md:h-[min(26rem,60%)] md:w-[min(26rem,85%)] md:-translate-y-[38%]" />
        </div>

        {/* Form card */}
        <div className="relative z-10 -mt-6 flex flex-1 items-center justify-center rounded-[1.75rem] bg-background px-6 py-12 sm:rounded-[2rem] sm:px-12 md:mt-0 md:-ml-10 md:py-16 md:pl-24 lg:pl-28">
          {children}
        </div>
      </div>
    </main>
  );
}
