'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { WaveLoader } from '@/components/motion/wave-loader';

// The call (LiveKit and the call screen) loads only after the first click, so the website stays light.
const DemoCall = dynamic(() => import('./demo-call'), {
  ssr: false,
  loading: () => <WaveLoader label="Loading the demo" className="h-full justify-center" />,
});

/**
 * "Try a demo call" on Talkbalt's own website. It looks and behaves like the widget businesses add
 * to their sites (public/widget.js), but renders the call right here instead of loading a second
 * page in an iframe, since the call screen is already part of this app. Closing the panel ends the call.
 */
export function DemoCallWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div
        role="dialog"
        aria-label="Talkbalt demo call"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-50 flex origin-bottom-right flex-col overflow-hidden bg-background transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:inset-auto sm:right-5 sm:bottom-20 sm:h-[600px] sm:max-h-[calc(100svh-6.5rem)] sm:w-[380px] sm:rounded-[20px] sm:border sm:border-border motion-reduce:transition-none ${
          open ? 'opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="flex justify-end p-1.5">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close demo call"
            className="flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>
        {/* Unmounting the call when the panel closes ends it, like closing the business widget. */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">{open && <DemoCall />}</div>
      </div>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={`fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-foreground px-[18px] py-3 text-[15px] leading-none font-semibold text-background transition-transform hover:scale-[1.03] active:scale-95 motion-reduce:transition-none ${
          open ? 'max-sm:hidden' : ''
        }`}
      >
        <span aria-hidden className="flex h-3.5 items-end gap-0.5">
          {[6, 10, 14, 8].map((h, i) => (
            <i key={i} className="block w-[3px] rounded-sm bg-background" style={{ height: h }} />
          ))}
        </span>
        {open ? 'Close' : 'Try a demo call'}
      </button>
    </>
  );
}
