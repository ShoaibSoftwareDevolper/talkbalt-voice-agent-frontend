import type { ReactNode } from 'react';
import { PublicHeader } from '@/components/app-shell';
import { IntroLoader } from '@/components/motion/intro-loader';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IntroLoader />
      <PublicHeader />
      <main className="flex flex-1 items-start justify-center px-4 py-16 sm:px-6">{children}</main>
    </>
  );
}
