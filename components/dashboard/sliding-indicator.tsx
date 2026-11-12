'use client';

import { useLayoutEffect, useRef } from 'react';

/**
 * A pill that slides to the active tab instead of jumping. Put it inside a `relative` container
 * whose active child has `data-active="true"`, as `<span data-indicator ... />`. Only the pill's
 * transform and width change; the first placement and resizes are instant, tab changes glide.
 */
export function useSlidingIndicator<T extends HTMLElement>(active: unknown) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const box = ref.current;
    const pill = box?.querySelector<HTMLElement>('[data-indicator]');
    if (!box || !pill) return;
    const place = (animate: boolean) => {
      const tab = box.querySelector<HTMLElement>('[data-active="true"]');
      pill.style.transitionDuration = animate ? '' : '0s';
      pill.style.opacity = tab ? '1' : '0';
      if (!tab) return;
      pill.style.width = `${tab.offsetWidth}px`;
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    };
    place(pill.dataset.placed === '1');
    pill.dataset.placed = '1';
    const resize = new ResizeObserver(() => place(false));
    resize.observe(box);
    return () => resize.disconnect();
  }, [active]);
  return ref;
}

/** The pill itself: black, behind the tab labels. */
export const indicatorClass =
  'pointer-events-none absolute inset-y-1 left-0 rounded-full bg-foreground transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';
