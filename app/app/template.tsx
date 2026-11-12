import type { ReactNode } from 'react';

/** Re-mounts on every dashboard navigation, so each page fades gently into place (globals.css .dash-page). */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="dash-page flex flex-1 flex-col gap-6">{children}</div>;
}
