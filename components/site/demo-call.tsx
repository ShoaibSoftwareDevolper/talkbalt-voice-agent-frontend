'use client';

import { useMemo } from 'react';
import { OpenInBrowser, useInAppBrowser } from '@/components/public/open-in-browser';
import { TalkbaltApp } from '@/components/talkbalt/talkbalt-app';
import { DEMO_BUSINESS } from '@/lib/site';
import { publicCallTokenSource } from '@/lib/token-source';

/** The call itself, loaded only when a visitor opens the demo panel (see demo-call-widget.tsx). */
export default function DemoCall() {
  const tokenSource = useMemo(() => publicCallTokenSource(DEMO_BUSINESS), []);
  const inApp = useInAppBrowser();
  // Instagram, Facebook and similar apps block the microphone: offer the real browser instead.
  if (inApp) return <OpenInBrowser inApp={inApp} businessName="Talkbalt" />;
  return (
    <TalkbaltApp
      tokenSource={tokenSource}
      title="Talkbalt"
      description="A demo call: hear how Talkbalt would answer your customers. Ask anything about Talkbalt."
      startLabel="Start demo call"
    />
  );
}
