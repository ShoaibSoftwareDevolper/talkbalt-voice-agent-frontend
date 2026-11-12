import type { ReactNode } from 'react';
import { BlogStrip } from '@/components/site/blog-strip';
import { DemoCallWidget } from '@/components/site/demo-call-widget';
import { SiteFooter } from '@/components/site/site-chrome';

/** The public website: home, about and articles. Each page also mounts SiteMotion (smooth scroll). */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    // data-entrance: these pages play their own entrance (globals.css) instead of the generic page-in.
    <main data-entrance className="flex flex-1 flex-col items-center gap-10 bg-muted p-2 sm:p-3">
      {children}
      <BlogStrip />
      <SiteFooter />
      {/* "Try a demo call": looks like the business widget, but renders the call in this app (no iframe). */}
      <DemoCallWidget />
    </main>
  );
}
