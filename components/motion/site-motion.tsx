'use client';

import 'lenis/dist/lenis.css';
import { useEffect } from 'react';

/**
 * Smooth scroll and scroll animations for the public website (the dashboard keeps native scroll).
 * Each page mounts its own instance. One loop, GSAP's ticker, drives both Lenis and ScrollTrigger,
 * so no two animations ever read the scroll position at different times.
 *
 * Markup hooks:
 * - [data-parallax="N"] drifts with scroll by N% of its height (negative N moves the other way).
 * - [data-drift="N"] slides sideways with scroll by N% of its width (wide screens).
 * - [data-progress] is a reading bar that grows to the end of the page.
 * - [data-reveal]: its children fade up when the group enters the screen.
 * - [data-track] is the "how it works" water line. Wide screens: [data-water] and [data-ripple]
 *   draw along a fixed S-curve. Phones: [data-mobile-water] and [data-mobile-ripple] form a wavy
 *   line built from the steps' measured positions. Each step's text rises in as the water reaches
 *   its [data-step-dot] anchor.
 * Everything else animates only transform and opacity; the water line animates SVG dash offsets.
 *
 * Touch devices keep native scrolling (Lenis' default), which is the smoothest option on phones.
 * With reduced motion, Lenis turns smoothing off and nothing animates.
 */
export function SiteMotion() {
  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ anchors: { offset: -24, duration: 1.2 }, stopInertiaOnNavigate: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Measure again once the entrance animation (globals.css, ~1.2s) has settled.
      const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 1300);

      // A step "arrives" when its anchor's centre crosses 65% of the screen.
      const STEP_AT = 'clamp(center 65%)';

      /** Draws SVG strokes along their length as the track scrolls from its first step to its last. */
      const drawOnScroll = (track: HTMLElement, lines: SVGElement[], lengths: number[]) => {
        const anchors = track.querySelectorAll('[data-step-dot]');
        const progress = { p: 0 };
        const apply = () =>
          lines.forEach((el, i) => {
            const len = lengths[i];
            el.style.strokeDasharray = `${len} ${len}`;
            el.style.strokeDashoffset = `${len * (1 - progress.p)}`;
          });
        apply();
        gsap.to(progress, {
          p: 1,
          ease: 'none',
          onUpdate: apply,
          scrollTrigger: {
            trigger: anchors[0],
            start: STEP_AT,
            endTrigger: anchors[anchors.length - 1],
            end: STEP_AT,
            scrub: 0.6,
            onRefresh: apply,
          },
        });
      };

      const mm = gsap.matchMedia();
      // data-drift="N": slides sideways from N% to -N% of its width as it crosses the screen. Wide
      // screens only; matchMedia removes it the moment the screen gets narrow, and restores it.
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
          const amount = Number(el.dataset.drift) || 5;
          gsap.fromTo(el, { xPercent: amount }, { xPercent: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
          // data-parallax="N": drifts from -N% to N% of its own height while its section crosses the screen.
          const amount = Number(el.dataset.parallax) || 5;
          gsap.fromTo(
            el,
            { yPercent: -amount },
            { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'clamp(top bottom)', end: 'clamp(bottom top)', scrub: true } },
          );
        });

        gsap.utils.toArray<HTMLElement>('[data-progress]').forEach((bar) => {
          gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((group) => {
          gsap.from(group.children, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-track]').forEach((track) => {
          // A step "arrives" when its anchor crosses 65% of the screen; its text rises in then.
          // clamp() keeps every trigger reachable, so the last step still arrives at the page end.
          const steps = gsap.utils.toArray<HTMLElement>(track.querySelectorAll('[data-step]'));
          const dots = steps.map((step) => step.querySelector('[data-step-dot]'));
          steps.forEach((step, i) => {
            gsap.fromTo(
              step.querySelector('[data-step-body]'),
              { opacity: 0.15, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: { trigger: dots[i], start: STEP_AT, toggleActions: 'play none none reverse' },
              },
            );
          });
        });
      });

      // The water line (wide screens: an S-curve across the section; phones: a wavy line down the
      // left) draws itself as you scroll, reaching each step as it arrives. Each frame only sets a
      // few dash offsets, nothing runs while the page is still, and scrub: 0.6 lets it glide.
      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 768px)', () => {
        gsap.utils.toArray<HTMLElement>('[data-track]').forEach((track) => {
          const water = track.querySelector<SVGGElement>('[data-water]');
          const centre = water?.querySelector('path');
          if (!water || !centre) return;
          const ripples = gsap.utils.toArray<SVGPathElement>(track.querySelectorAll('[data-ripple]'));
          drawOnScroll(track, [water, ...ripples], [centre.getTotalLength(), ...ripples.map((r) => r.getTotalLength())]);
        });
      });

      mm.add('(max-width: 767px)', () => {
        const rebuilds: (() => void)[] = [];
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        gsap.utils.toArray<HTMLElement>('[data-track]').forEach((track) => {
          const svg = track.querySelector<SVGSVGElement>('[data-mobile-pipe]');
          const water = track.querySelector<SVGGElement>('[data-mobile-water]');
          const ripples = gsap.utils.toArray<SVGPathElement>(track.querySelectorAll('[data-mobile-ripple]'));
          if (!svg || !water) return;
          const lengths: number[] = [];
          // Rebuilt whenever the layout changes (ScrollTrigger refresh): an S-bend between each pair of
          // step anchors, plus two ripple lines riding it as fixed sine waves.
          const build = () => {
            const box = track.getBoundingClientRect();
            svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
            const pts = gsap.utils.toArray<HTMLElement>(track.querySelectorAll('[data-step-dot]')).map((dot) => {
              const r = dot.getBoundingClientRect();
              return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top];
            });
            const d = pts
              .map(([x, y], i) => {
                if (!i) return `M${x} ${y}`;
                const [px, py] = pts[i - 1];
                const span = y - py;
                // Same sign every time, so each S leaves an anchor heading the way the last one
                // arrived: one smooth wave, no kink at the steps.
                const bend = 40;
                return `C${px + bend} ${py + span * 0.3} ${x - bend} ${py + span * 0.7} ${x} ${y}`;
              })
              .join(' ');
            water.querySelectorAll('path').forEach((p) => p.setAttribute('d', d));
            const centre = water.querySelector('path')!;
            const length = centre.getTotalLength();
            const samples = Array.from({ length: 180 }, (_, i) => {
              const at = (i / 179) * length;
              const p = centre.getPointAtLength(at);
              const a = centre.getPointAtLength(Math.max(0, at - 1));
              const b = centre.getPointAtLength(Math.min(length, at + 1));
              const n = Math.hypot(b.x - a.x, b.y - a.y) || 1;
              return { at, x: p.x, y: p.y, nx: -(b.y - a.y) / n, ny: (b.x - a.x) / n };
            });
            ripples.forEach((r, k) => {
              const [amp, wave, offset] = k ? [1.2, 11, -0.8] : [1.8, 18, 0.6];
              r.setAttribute(
                'd',
                samples.map((q, i) => {
                  const o = offset + amp * Math.sin(q.at / wave + k * 1.7);
                  return `${i ? 'L' : 'M'}${(q.x + q.nx * o).toFixed(1)} ${(q.y + q.ny * o).toFixed(1)}`;
                }).join(''),
              );
            });
            lengths.splice(0, lengths.length, length, ...ripples.map((r) => r.getTotalLength()));
          };
          build();
          if (reduce) return;
          ScrollTrigger.addEventListener('refreshInit', build);
          rebuilds.push(build);
          drawOnScroll(track, [water, ...ripples], lengths);
        });
        return () => rebuilds.splice(0).forEach((build) => ScrollTrigger.removeEventListener('refreshInit', build));
      });

      cleanup = () => {
        clearTimeout(refreshTimer);
        mm.revert();
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
