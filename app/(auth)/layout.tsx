import type { ReactNode } from 'react';
import { PublicHeader } from '@/components/app-shell';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 items-start justify-center px-4 py-16 sm:px-6">{children}</main>
    </>
  );
}
