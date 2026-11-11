import { Suspense } from 'react';
import { AnalyticsView } from '@/components/analytics/analytics-view';
import { WaveLoader } from '@/components/motion/wave-loader';

// The date range starts from today, so the view renders per visit, not at build time.
export default function Page() {
  return (
    <Suspense fallback={<WaveLoader label="Loading analytics" />}>
      <AnalyticsView />
    </Suspense>
  );
}
