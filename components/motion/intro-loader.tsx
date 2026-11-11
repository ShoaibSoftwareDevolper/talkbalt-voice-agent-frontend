'use client';

import { useEffect, useRef, useState } from 'react';

const BARS = [0.35, 0.6, 0.85, 1, 0.85, 0.6, 0.35];
// Heights the bars settle on before the exit: the brand mark's shape.
const LOGO = [0.3, 0.55, 0.8, 1, 0.7, 0.45, 0.25];
const WORD = 'Talkbalt';
const BAR_X = 47;
const BAR_GAP = 10;
const BAR_W = 6;
const MID = 80;
const MIN_MS = 1100;
const MAX_WAIT_MS = 3500;

function pageReady(): Promise<void> {
  const loaded =
    document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));
  const timeout = new Promise<void>((resolve) => setTimeout(resolve, MAX_WAIT_MS));
  return Promise.race([Promise.all([loaded, document.fonts.ready]).then(() => undefined), timeout]);
}

/**
 * Full-screen intro shown on every full page load (the root layout persists across client
 * navigations, so it never replays while moving between pages).
 *
 * The overlay is server-rendered, so it covers the first paint before any JS runs; a CSS wave
 * animates the bars meanwhile. GSAP is loaded lazily, outside the initial bundle, then plays the
 * timeline: an equalizer wave until the page is ready, bars settle into the logo,
 * the wordmark rises, and the overlay crossfades away while the page content settles in. Flat by design
 * (no glow, gradient or shadow), and only transforms and opacity animate, so it all
 * stays on the compositor. If JS never runs, a CSS fallback fades the overlay out after a few seconds.
 */
export function IntroLoader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let cancelled = false;
    let revert: (() => void) | undefined;
    const started = performance.now();

    const finish = () => {
      document.documentElement.removeAttribute('data-intro');
      setDone(true);
    };

    (async () => {
      const { gsap } = await import('gsap');
      if (cancelled) return;
      el.style.animation = 'none'; // GSAP takes over from the no-JS fallback
      el.classList.add('intro-js');

      const ctx = gsap.context(() => {
        const bars = gsap.utils.toArray<SVGRectElement>('.intro-bar');
        // Scale each bar around its own centre (SVG coordinates), so the wave stays centred.
        gsap.set(bars, { svgOrigin: (i: number) => `${BAR_X + i * BAR_GAP + BAR_W / 2} ${MID}` });
        const mm = gsap.matchMedia();

        mm.add('(prefers-reduced-motion: reduce)', () => {
          gsap.set('.intro-letter', { yPercent: 0, opacity: 1 });
          pageReady().then(() => {
            if (cancelled) return;
            gsap.to(el, { autoAlpha: 0, duration: 0.3, onStart: () => document.documentElement.removeAttribute('data-intro'), onComplete: finish });
          });
        });

        mm.add('(prefers-reduced-motion: no-preference)', () => {
          // Idle loop until the page is ready: a travelling equalizer wave.
          const wave = gsap.timeline({ repeat: -1 });
          bars.forEach((bar, i) => {
            wave.to(bar, { scaleY: 0.25, duration: 0.42, ease: 'sine.inOut', yoyo: true, repeat: 1 }, i * 0.08);
          });

          gsap.from('.intro-mark', { scale: 0.8, opacity: 0, duration: 0.6, ease: 'back.out(1.6)' });
          gsap.from('.intro-letter', { yPercent: 110, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.035, delay: 0.15 });
          gsap.from('.intro-tagline', { opacity: 0, y: 6, duration: 0.5, delay: 0.45 });

          pageReady().then(() => {
            const wait = Math.max(0, MIN_MS - (performance.now() - started)) / 1000;
            gsap
              .timeline({ delay: wait, defaults: { ease: 'power3.inOut' }, onComplete: finish })
              .add(() => {
                wave.kill();
              })
              .to(bars, { scaleY: (i) => LOGO[i] / BARS[i], duration: 0.55, ease: 'power3.out', stagger: 0.03 })
              // One soft, overlapping exit: the mark and text drift up and fade while the surface
              // crossfades to the page, which settles in underneath at the same moment.
              .addLabel('exit', '+=0.15')
              .to('.intro-stage', { y: -12, scale: 0.98, opacity: 0, duration: 0.6, ease: 'power2.out' }, 'exit')
              .add(() => document.documentElement.removeAttribute('data-intro'), 'exit+=0.1')
              .to(el, { opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 'exit+=0.1');
          });
        });
      }, el);
      revert = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={root} className="intro" role="status" aria-live="polite" aria-label="Loading Talkbalt">
      <div className="intro-surface">
        <div className="intro-stage">
          <svg className="intro-mark" viewBox="40 40 80 80" width="104" height="104" aria-hidden>
            {BARS.map((h, i) => (
              <rect
                key={i}
                className="intro-bar"
                x={BAR_X + i * BAR_GAP}
                y={MID - 32 * h}
                width={BAR_W}
                height={64 * h}
                rx="3"
                fill="var(--brand)"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </svg>
          <p className="intro-word" aria-hidden>
            {WORD.split('').map((ch, i) => (
              <span key={i} className="intro-letter-mask">
                <span className="intro-letter">{ch}</span>
              </span>
            ))}
          </p>
          <p className="intro-tagline">Voice receptionist</p>
        </div>
      </div>
    </div>
  );
}
