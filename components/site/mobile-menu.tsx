'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

type Item = { href: string; label: string };

/**
 * Phone menu: a hamburger that morphs into a cross, opening a dark bubble that grows out of the
 * button's corner with a small bump, its links arriving one after another. CSS transitions only
 * (transform and opacity, see globals.css), so it stays light. Closes on Escape, an outside tap, or
 * choosing a link.
 */
export function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={root} data-open={open} className="menu relative md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="menu-toggle relative flex size-9 items-center justify-center rounded-full bg-muted text-foreground"
      >
        <span aria-hidden className="menu-line menu-line-top" />
        <span aria-hidden className="menu-line menu-line-bottom" />
      </button>

      <nav id={id} aria-label="Menu" inert={!open} className="menu-panel absolute top-[calc(100%+0.625rem)] right-0 z-50 w-[min(17rem,calc(100vw-2rem))] rounded-[1.75rem] bg-foreground p-2 text-background">
        <ul className="flex flex-col">
          {items.map((item, i) => (
            <li key={item.href} className="menu-item" style={{ '--i': i } as React.CSSProperties}>
              <Link href={item.href} onClick={close} className="flex rounded-2xl px-4 py-3 text-base hover:bg-background/10">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="menu-item mt-1" style={{ '--i': items.length } as React.CSSProperties}>
            <Link
              href="/login"
              onClick={close}
              className="flex justify-center rounded-full border border-background/25 px-4 py-2.5 text-sm font-medium hover:bg-background/10"
            >
              Log in
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
