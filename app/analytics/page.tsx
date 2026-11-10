'use client';

import { AnalyticsView } from '@/components/analytics/analytics-view';
import { AdminGate } from '@/components/history/admin-gate';

export default function AnalyticsPage() {
  return <AdminGate>{(token) => <AnalyticsView token={token} />}</AdminGate>;
}
