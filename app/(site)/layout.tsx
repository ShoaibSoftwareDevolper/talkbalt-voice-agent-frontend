import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site/site-chrome';

/** The public website: home, about and articles. Each page also mounts SiteMotion (smooth scroll). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // data-entrance: these pages play their own entrance (globals.css) instead of the generic page-in.
    <main data-entrance className="flex flex-1 flex-col items-center gap-10 bg-muted p-2 sm:p-3">
      {children}
      <SiteFooter />
    </main>
  );
}
