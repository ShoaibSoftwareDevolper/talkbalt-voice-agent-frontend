'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ribbon from '@/app/Transparent Sky-Blue Glass Ribbon.png';

/**
 * The hero ribbon on the auth pages. The (auth) layout stays mounted between /login and /signup,
 * so switching pages glides the ribbon gently up with a small change of tilt, and switching back
 * glides it the same way back down. No spin: only a short, smooth drift.
 */
export function AuthRibbon({ className }: { className: string }) {
  const signup = usePathname().startsWith('/signup');
  return (
    <div aria-hidden className={className}>
      <div
        className="relative size-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        style={{ transform: signup ? 'translateY(-7%) rotate(4deg) scale(0.97)' : 'translateY(0) rotate(-8deg) scale(1)' }}
      >
        <Image src={ribbon} alt="" fill priority sizes="(min-width: 768px) 26rem, 12rem" className="object-contain" />
      </div>
    </div>
  );
}
