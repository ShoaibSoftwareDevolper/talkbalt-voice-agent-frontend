import Image from "next/image";
import Link from "next/link";
import ribbon from "@/app/Transparent Sky-Blue Glass Ribbon.png";
import type { CSSProperties, ReactNode } from "react";
import { MobileMenu } from "./mobile-menu";

/** Start time for a CSS entrance (.enter-* in globals.css), in ms after the first paint. */
export const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
];

function BrandIcon() {
  return (
    <span aria-hidden className="flex h-5 items-end gap-[3px]">
      {[8, 14, 20, 11].map((h, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-background"
          style={{ height: h }}
        />
      ))}
    </span>
  );
}

/** Logo, pill navigation, Log in and Start. On phones: logo, Start and a menu holding the rest. */
export function SiteHeader() {
  return (
    <header className="relative z-40 flex items-center justify-between gap-3">
      <Link
        href="/"
        aria-label="Talkbalt home"
        style={at(150)}
        className="enter-pop flex size-9 shrink-0 items-center justify-center rounded-full bg-foreground sm:size-11"
      >
        <BrandIcon />
      </Link>
      <nav style={at(250)} className="enter-down hidden items-center gap-1 rounded-full bg-muted p-1.5 text-sm md:flex">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-5 py-2 whitespace-nowrap text-foreground/80 hover:bg-background hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div style={at(350)} className="enter-down flex items-center gap-2">
        <Link
          href="/login"
          className="hidden rounded-full px-4 py-3 text-sm text-foreground/80 hover:text-foreground md:inline-flex"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:bg-foreground/85 sm:px-7 sm:py-3 sm:text-sm"
        >
          Start
        </Link>
        <MobileMenu items={NAV} />
      </div>
    </header>
  );
}

/** The rounded top card of every inner page: header, a big title and an intro. */
export function PageHero({
  title,
  children,
}: {
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="enter-card flex w-full flex-col gap-10 rounded-[1.75rem] bg-background px-4 py-4 sm:gap-20 sm:rounded-[2rem] sm:px-10 sm:py-8 lg:px-14">
      <SiteHeader />
      <div className="flex max-w-4xl flex-col gap-5 pb-6 sm:pb-12">
        <h1 className="line-mask text-3xl leading-[1.1] tracking-tight text-balance text-foreground sm:text-6xl">
          <span style={at(300)} className="enter-line">
            {title}
          </span>
        </h1>
        <div style={at(520)} className="enter-up flex flex-col gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Giant rounded "TB" letters, drawn as thick round-capped strokes in a 1000 x 720 box. Used as a CSS
 * mask, so the photo underneath shows only through the letters (and still loads via next/image).
 */
const LETTERS =
  "M85 85H395M240 85V635" + // T
  "M560 85V635M560 85H690A137.5 137.5 0 0 1 690 360H560M560 360H710A137.5 137.5 0 0 1 710 635H560"; // B
const LETTER_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 720'><path d='${LETTERS}' fill='none' stroke='white' stroke-width='150' stroke-linecap='round' stroke-linejoin='round'/></svg>`,
)}")`;

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/login", label: "Log in" },
  { href: "/signup", label: "Sign up" },
];

export function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden rounded-[2rem] bg-background p-5 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-0">
        <div
          aria-hidden
          className="relative z-10 aspect-[1000/720] w-full max-w-md overflow-hidden bg-[#070a14] md:w-[min(64%,95svh)] md:max-w-none md:shrink-0"
          style={{
            maskImage: LETTER_MASK,
            WebkitMaskImage: LETTER_MASK,
            maskSize: "100% 100%",
            WebkitMaskSize: "100% 100%",
          }}
        >
          <div data-parallax="8" className="absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={ribbon}
              alt=""
              fill
              sizes="(min-width: 768px) 64vw, 448px"
              className="object-cover object-[60%_50%]"
            />
          </div>
        </div>

        {/* Tucked behind the B like a poster, drifting at its own speed for depth; stacks below on phones. */}
        <div data-parallax="-18" className="md:-ml-[5%]">
          <div
            data-reveal
            className="flex flex-col gap-8 font-mono text-foreground"
          >
            <p className="text-5xl leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
              24/7
              <br />
              on call
            </p>
            <nav className="flex flex-col gap-1.5 text-base sm:text-lg md:pl-[clamp(3rem,6vw,6rem)]">
              {FOOTER_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="w-fit underline-offset-4 hover:underline"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <p className="text-sm text-muted-foreground md:pl-[clamp(3rem,6vw,6rem)]">
              Talkbalt, AI voice receptionist
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
