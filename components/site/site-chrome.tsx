import Link from "next/link";
import { Headset } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { COPYRIGHT_YEAR } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

/** Start time for a CSS entrance (.enter-* in globals.css), in ms after the first paint. */
export const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const NAV = [
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

/** Logo on the left; About, Articles, Log in and Start on the right. On phones: logo, Start and a menu holding the rest. */
export function SiteHeader() {
  return (
    <header className="relative z-40 flex items-center justify-between gap-3">
      <Link href="/" aria-label="Talkbalt home" style={at(150)} className="enter-pop flex shrink-0 items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-foreground sm:size-11">
          <BrandIcon />
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">Talkbalt</span>
      </Link>
      <div style={at(250)} className="enter-down flex items-center gap-2">
        <nav aria-label="Main" className="hidden items-center md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-3 text-sm whitespace-nowrap text-foreground/80 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
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

const LEGAL_LINKS = [
  { href: "/about", label: "About" },
  { href: "/articles", label: "Articles" },
  { href: "/privacy", label: "Privacy Policy" },
];

/**
 * Closing statement, a call to action and a huge fading "Talkbalt" wordmark, then the legal row.
 * The headline's tones (light, lighter, dark) guide the eye to the promise at the end.
 */
export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center overflow-hidden rounded-[2rem] bg-background px-5 pt-16 pb-6 sm:px-8 sm:pt-24 lg:px-10">
      <h2
        data-reveal
        className="max-w-5xl text-center text-[clamp(1.9rem,5.2vw,4.25rem)] leading-[1.08] font-medium tracking-[-0.035em] text-balance"
      >
        <span className="text-foreground/35">Every call answered, in Urdu, Hindi or English, </span>
        <span className="text-foreground/22">by a receptionist that never takes a break, </span>
        <span className="text-foreground/22">and </span>
        <span className="text-foreground">turned into a booking.</span>
      </h2>

      <Link
        data-reveal
        href="/signup"
        className="mt-10 flex items-center gap-3 rounded-full bg-foreground py-2 pr-6 pl-2 text-background transition-transform hover:scale-[1.03] sm:mt-12"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-background/12">
          <Headset aria-hidden className="size-5" strokeWidth={1.75} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-medium">Set up your receptionist</span>
          <span className="text-xs text-background/55">Ready in about ten minutes</span>
        </span>
      </Link>

      {/* Decorative wordmark: dark at the top, fading into the card at the bottom. */}
      <p
        aria-hidden
        data-parallax="-6"
        className="mt-20 w-full bg-gradient-to-b from-foreground/30 via-foreground/12 to-transparent bg-clip-text pb-[0.04em] text-center text-[clamp(4.5rem,23vw,24rem)] leading-[0.82] font-semibold tracking-[-0.06em] whitespace-nowrap text-transparent select-none sm:mt-28"
      >
        Talkbalt
      </p>

      <div className="mt-6 flex w-full flex-col-reverse items-center gap-3 text-xs sm:flex-row sm:justify-between sm:text-sm">
        <p className="text-muted-foreground">&copy; {COPYRIGHT_YEAR} Talkbalt. All rights reserved.</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          {LEGAL_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-foreground/80 hover:text-foreground">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
