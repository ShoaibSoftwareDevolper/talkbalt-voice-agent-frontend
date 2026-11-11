'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Copy, ExternalLink } from 'lucide-react';

/**
 * Social apps (Instagram, Facebook, Messenger, Threads, TikTok, Snapchat, LinkedIn) open bio links in
 * their own in-app browser, where the microphone is often blocked, so a call can't start there. This
 * gets the visitor to their real browser (Chrome, Safari, Edge, Firefox, UC, whichever is default):
 *
 * - Android: an intent:// link hands the page to the default browser, automatically on load.
 * - iOS: there is no official way. Instagram opens links through instagram://extbrowser/ and Threads
 *   through barcelona://extbrowser/ (both need a tap: Meta drops them when a script fires them);
 *   other apps get x-safari-https://. All are undocumented and may stop working, so the page always
 *   also offers "Copy link" and the app's own "Open in browser" menu step.
 */

type InApp = { app: string; label: string; ios: boolean; android: boolean };

const APPS: [RegExp, string, string][] = [
  [/Instagram/i, 'instagram', 'Instagram'],
  [/Barcelona|Threads/i, 'threads', 'Threads'],
  [/FBAN\/Messenger|MessengerForiOS|Orca-Android/i, 'messenger', 'Messenger'],
  [/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i, 'facebook', 'Facebook'],
  [/musical_ly|BytedanceWebview|TikTok/i, 'tiktok', 'TikTok'],
  [/Snapchat/i, 'snapchat', 'Snapchat'],
  [/LinkedInApp/i, 'linkedin', 'LinkedIn'],
];

function detect(ua: string): InApp | null {
  const hit = APPS.find(([re]) => re.test(ua));
  if (!hit) return null;
  return { app: hit[1], label: hit[2], ios: /iPhone|iPad|iPod/i.test(ua), android: /Android/i.test(ua) };
}

const subscribe = () => () => {};
// A plain string, so the snapshot is stable between renders; empty on the server and outside apps.
const snapshot = () => {
  const found = detect(navigator.userAgent);
  return found ? `${found.app}|${found.label}|${found.ios ? 1 : 0}|${found.android ? 1 : 0}` : '';
};

/** The social app this page is open inside, or null (always null during server rendering). */
export function useInAppBrowser(): InApp | null {
  const key = useSyncExternalStore(subscribe, snapshot, () => '');
  if (!key) return null;
  const [app, label, ios, android] = key.split('|');
  return { app, label, ios: ios === '1', android: android === '1' };
}

function androidIntent(url: URL) {
  // No package: Android opens the user's default browser. The fallback reloads the same page.
  return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=${url.protocol.replace(":", "")};S.browser_fallback_url=${encodeURIComponent(url.href)};end`;
}

function iosEscape(app: string, url: URL) {
  if (app === 'instagram') return `instagram://extbrowser/?url=${encodeURIComponent(url.href)}`;
  if (app === 'threads') return `barcelona://extbrowser/?url=${encodeURIComponent(url.href)}`;
  return `x-safari-${url.href}`;
}

export function OpenInBrowser({ inApp, businessName }: { inApp: InApp; businessName: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === 'undefined' ? null : new URL(window.location.href);

  // Android needs no tap: send the page to the default browser straight away (once per visit).
  useEffect(() => {
    if (!inApp.android || !url) return;
    try {
      if (sessionStorage.getItem('tb-escaped')) return;
      sessionStorage.setItem('tb-escaped', '1');
    } catch {
      // Storage blocked: still try once.
    }
    window.location.href = androidIntent(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inApp.android]);

  const href = !url ? '#' : inApp.android ? androidIntent(url) : iosEscape(inApp.app, url);
  const browser = inApp.ios ? 'Safari' : 'your browser';

  const copy = async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url.href);
      setCopied(true);
    } catch {
      window.prompt('Copy this link', url.href);
    }
  };

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 text-center">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Open in {browser} to talk to {businessName}</h2>
        <p className="text-sm text-muted-foreground">
          {inApp.label} blocks the microphone inside its own browser, so the call can’t start here.
        </p>
      </div>
      <a
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/85"
      >
        <ExternalLink className="size-4" aria-hidden />
        Open in {browser}
      </a>
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          If nothing happens, tap <span className="font-semibold text-foreground">•••</span> at the top of the screen and choose{' '}
          <span className="font-semibold text-foreground">Open in {inApp.ios ? 'external browser' : 'browser'}</span>.
        </p>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted"
        >
          <Copy className="size-3.5" aria-hidden />
          {copied ? 'Link copied. Paste it in your browser.' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
