'use client';

import { AdminGate } from '@/components/history/admin-gate';
import { CallDetailView } from '@/components/history/call-detail';

export function CallDetailPage({ id }: { id: string }) {
  return <AdminGate>{(token) => <CallDetailView id={id} token={token} />}</AdminGate>;
}
