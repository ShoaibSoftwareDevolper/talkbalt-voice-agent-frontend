import type { ReactNode } from 'react';
import { DashboardShell } from '@/components/app-shell';
import { IntroLoader } from '@/components/motion/intro-loader';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <IntroLoader />
      <DashboardShell>{children}</DashboardShell>
    </>
  );
}
