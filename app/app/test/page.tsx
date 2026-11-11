'use client';

import { TalkbaltApp } from '@/components/talkbalt/talkbalt-app';
import { testCallTokenSource } from '@/lib/token-source';

export default function Page() {
  return (
    <TalkbaltApp
      tokenSource={testCallTokenSource}
      title="Test your receptionist"
      description="Call your agent from the browser. It answers with your business info, services and opening hours, and real bookings land in Bookings."
    />
  );
}
