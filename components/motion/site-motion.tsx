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
 * - [data-track] is the "how it works" water line. Wide screens: the water ([data-water],
 *   [data-ripple]) draws itself along the curve. Phones: each [data-track-fill] runs to the next step.
 *   Each dot fills as the water reaches it.
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

      const mm = gsap.matchMedia();
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

        // data-drift="N": slides sideways from N% to -N% of its width as it crosses the screen (wide
        // screens only, where the row is wider than its gap).
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((el) => {
          if (!window.matchMedia('(min-width: 768px)').matches) return;
          const amount = Number(el.dataset.drift) || 5;
          gsap.fromTo(el, { xPercent: amount }, { xPercent: -amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
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
          // A step "arrives" when its dot's centre crosses 65% of the screen. clamp() keeps every
          // trigger reachable, so the last step still completes at the very end of the page.
          const at = 'clamp(center 65%)';
          const steps = gsap.utils.toArray<HTMLElement>(track.querySelectorAll('[data-step]'));
          const dots = steps.map((step) => step.querySelector('[data-step-dot]'));

          // Wide screens: the water draws itself along the curve as you scroll. Each frame sets three
          // dash offsets (the group passes its own to its paths): no masks, no geometry, and nothing
          // runs while the page is still. scrub: 0.6 lets it glide.
          const water = track.querySelector<SVGGElement>('[data-water]');
          const centre = water?.querySelector('path');
          if (water && centre) {
            const length = centre.getTotalLength();
            const ripples = gsap.utils.toArray<SVGPathElement>(track.querySelectorAll('[data-ripple]')).map((el) => ({ el, len: el.getTotalLength() }));
            const lines = [{ el: water as SVGElement, len: length }, ...ripples];
            for (const l of lines) {
              l.el.style.strokeDasharray = `${l.len} ${l.len}`;
              l.el.style.strokeDashoffset = `${l.len}`;
            }
            const progress = { p: 0 };
            gsap.to(progress, {
              p: 1,
              ease: 'none',
              onUpdate: () => {
                for (const l of lines) l.el.style.strokeDashoffset = `${l.len * (1 - progress.p)}`;
              },
              scrollTrigger: { trigger: dots[0], start: at, endTrigger: dots.at(-1), end: at, scrub: 0.6 },
            });
          }

          steps.forEach((step, i) => {
            step.setAttribute('data-pending', '');
            // Phones: a straight stream of water runs towards the next dot.
            const fill = step.querySelector('[data-track-fill]');
            if (fill && dots[i + 1]) {
              gsap.fromTo(
                fill,
                { scaleY: 0 },
                { scaleY: 1, ease: 'none', scrollTrigger: { trigger: dots[i], start: at, endTrigger: dots[i + 1], end: at, scrub: 0.6 } },
              );
            }
            // The dot fills through a CSS transition on [data-pending]; the text rises in.
            gsap.fromTo(
              step.querySelector('[data-step-body]'),
              { opacity: 0.15, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: dots[i],
                  start: at,
                  toggleActions: 'play none none reverse',
                  onEnter: () => step.removeAttribute('data-pending'),
                  onLeaveBack: () => step.setAttribute('data-pending', ''),
                },
              },
            );
          });
        });
        return () => document.querySelectorAll('[data-step]').forEach((step) => step.removeAttribute('data-pending'));
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
