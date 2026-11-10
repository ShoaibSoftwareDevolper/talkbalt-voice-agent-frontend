'use client';

import { AdminGate } from '@/components/history/admin-gate';
import { CallList } from '@/components/history/call-list';

export default function HistoryPage() {
  return <AdminGate>{(token) => <CallList token={token} />}</AdminGate>;
}
