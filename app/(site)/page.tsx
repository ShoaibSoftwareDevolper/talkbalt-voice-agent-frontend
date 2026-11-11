import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { at, SiteHeader } from '@/components/site/site-chrome';
import calendar from '../Glossy Blue Glass Calendar Icon.png';
import hands from '../features/hands.png';
import puck from '../features/puck.png';
import ribbon from '../Transparent Sky-Blue Glass Ribbon.png';

const STATS = [
  { value: '24/7', label: 'Always answering' },
  { value: '0', label: 'Double bookings' },
  { value: '1 link', label: 'Share anywhere' },
];

/**
 * Feature cards, each with a 3D image that breaks out over its top edge. The two photos are
 * transparent cut-outs (app/features/, made from the originals in app/); the calendar and ribbon are
 * transparent already.
 */
const FEATURES = [
  {
    title: ['Always', 'answering'],
    href: '/articles/why-missed-calls-cost-bookings',
    tone: 'light',
    art: (
      <div className="absolute -top-24 right-2 h-52 w-44 rotate-[8deg]">
        <Image src={puck} alt="" fill sizes="176px" className="object-contain object-top" />
      </div>
    ),
  },
  {
    title: ['Smart', 'bookings'],
    href: '/articles/how-talkbalt-avoids-double-bookings',
    tone: 'brand',
    art: (
      <div className="absolute -top-20 -right-4 size-48 rotate-[10deg]">
        <Image src={calendar} alt="" fill sizes="192px" className="object-contain" />
      </div>
    ),
  },
  {
    title: ['One-line', 'widget'],
    href: '/articles/add-the-widget-to-your-website',
    tone: 'dark',
    art: (
      <div className="absolute -top-20 -right-10 size-52 rotate-[-12deg]">
        <Image src={ribbon} alt="" fill sizes="208px" className="object-contain" />
      </div>
    ),
  },
  {
    title: ['Knows your', 'business'],
    href: '/about',
    tone: 'light',
    art: (
      <div className="absolute -top-16 right-6 h-56 w-28 rotate-[6deg]">
        <Image src={hands} alt="" fill sizes="128px" className="object-contain object-top" />
      </div>
    ),
  },
] as const;

const CARD_TONE = {
  light: { card: 'bg-background text-foreground', soft: 'text-muted-foreground', button: 'bg-foreground text-background' },
  brand: { card: 'bg-brand text-white', soft: 'text-white/60', button: 'bg-white text-foreground' },
  dark: { card: 'bg-foreground text-background', soft: 'text-background/50', button: 'bg-background text-foreground' },
} as const;

/**
 * The "how it works" pipe on wide screens, in a 1000 x 900 box with the section's own aspect ratio
 * (so it scales without stretching): it sweeps between the left and right edges, leaving and
 * reaching every step vertically. Equal spacing keeps
 * the fill's tip on each dot exactly when that dot reaches its scroll trigger.
 */
const PIPE_POINTS = [
  [150, 90],
  [850, 330],
  [150, 570],
  [850, 810],
] as const;
const PIPE_PATH = PIPE_POINTS.map(([x, y], i) => {
  if (i === 0) return `M${x} ${y}`;
  const [px, py] = PIPE_POINTS[i - 1];
  return `C${px} ${py + 120} ${x} ${y - 120} ${x} ${y}`;
}).join(' ');
/**
 * The pipe's centre line sampled once (on the server): point, unit normal and distance along it.
 * Ripple lines are drawn from it as fixed sine waves inside the water, so nothing is recomputed while
 * scrolling.
 */
const PIPE_SAMPLES = (() => {
  const out: { x: number; y: number; nx: number; ny: number; dist: number }[] = [];
  let dist = 0;
  PIPE_POINTS.slice(1).forEach(([x3, y3], seg) => {
    const [x0, y0] = PIPE_POINTS[seg];
    const [x1, y1, x2, y2] = [x0, y0 + 120, x3, y3 - 120];
    for (let k = seg ? 1 : 0; k <= 80; k++) {
      const t = k / 80;
      const u = 1 - t;
      const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
      const y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
      const dx = 3 * u * u * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * t * t * (x3 - x2);
      const dy = 3 * u * u * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * t * t * (y3 - y2);
      const len = Math.hypot(dx, dy) || 1;
      const prev = out.at(-1);
      if (prev) dist += Math.hypot(x - prev.x, y - prev.y);
      out.push({ x, y, nx: -dy / len, ny: dx / len, dist });
    }
  });
  return out;
})();

function ripple(amp: number, wave: number, offset: number, phase: number) {
  return PIPE_SAMPLES.map(({ x, y, nx, ny, dist }, i) => {
    const o = offset + amp * Math.sin(dist / wave + phase);
    return `${i ? 'L' : 'M'}${(x + nx * o).toFixed(1)} ${(y + ny * o).toFixed(1)}`;
  }).join('');
}

const WATER = { body: '#3aa0e8', deep: '#1f7fcf', light: '#a9dcfd' } as const;
const RIPPLES = [
  { d: ripple(3.4, 29, 0.8, 0), color: WATER.light, opacity: 0.8, width: 2.4 },
  { d: ripple(2.2, 17, -1.2, 1.7), color: '#ffffff', opacity: 0.85, width: 1.1 },
];

const STEPS = [
  { title: 'Create your account', text: 'Sign up with your email and password. It takes under a minute.' },
  { title: 'Add your business', text: 'Your services, products, prices and opening hours. The receptionist answers from exactly this.' },
  { title: 'Make a test call', text: 'Talk to it yourself from the dashboard, before any visitor does.' },
  { title: 'Share your link', text: 'Send your booking link or paste one line of widget code on your site. Bookings arrive in your dashboard.' },
];

/**
 * The hero band's shape, in a 1000 x 320 box: a pill across the top joined by S-curves to a pill at
 * the bottom right. objectBoundingBox units let it scale with the band, whose aspect ratio is fixed.
 */
const BAND_PATH =
  'M85 0 H740 A60 60 0 0 1 800 60 V80 A40 40 0 0 0 840 120 H900 A100 100 0 0 1 900 320 H740 ' +
  'A100 100 0 0 1 640 220 V210 A40 40 0 0 0 600 170 H85 A85 85 0 0 1 85 0 Z';

export default function Home() {
  return (
    <>
      <SiteMotion />
      {/* Entrance (CSS, globals.css): the card rises, the header drops in, the headline is revealed
          line by line, then the band settles with a small bump and the stats pop in. */}
      <div className="enter-card flex min-h-[calc(100svh-1.5rem)] w-full flex-col gap-10 rounded-[2rem] bg-background px-5 py-5 sm:px-10 sm:py-8 lg:px-14">
        <SiteHeader />

        <section className="grid items-start gap-6 md:grid-cols-[1.3fr_1fr] md:gap-12">
          <h1 className="text-4xl leading-[1.08] font-normal tracking-tight text-balance text-foreground sm:text-5xl xl:text-6xl">
            <span className="line-mask">
              <span style={at(300)} className="enter-line">
                Turning every visitor call
              </span>
            </span>
            <span className="line-mask">
              <span style={at(420)} className="enter-line font-semibold">
                into a booked appointment
              </span>
            </span>
          </h1>
          <p style={at(560)} className="enter-up text-sm leading-relaxed text-muted-foreground md:pt-2 xl:text-base">
            Talkbalt gives your business an AI voice receptionist. It answers visitors from your website or booking link,
            explains your services and prices, and books appointments straight into your dashboard.
          </p>
        </section>

        {/* Desktop: the shaped band, with stats in the cut-out corners. */}
        <section aria-label="Talkbalt at a glance" style={at(620)} className="enter-card relative hidden aspect-[1000/320] w-full md:block">
          <svg aria-hidden width="0" height="0" className="absolute">
            <clipPath id="hero-band" clipPathUnits="objectBoundingBox" transform="scale(0.001 0.003125)">
              <path d={BAND_PATH} />
            </clipPath>
          </svg>
          <div className="absolute inset-0 overflow-hidden bg-[#070a14]" style={{ clipPath: 'url(#hero-band)' }}>
            <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
              <Image
                src={ribbon}
                alt="Blue glass ribbon"
                fill
                fetchPriority="high"
                placeholder="blur"
                sizes="100vw"
                style={at(620)}
                className="enter-zoom object-cover object-[50%_45%]"
              />
            </div>
          </div>
          <div style={at(900)} className="enter-pop absolute top-[3%] right-0 flex h-[34%] w-[16%] flex-col justify-center">
            <span className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold text-foreground">1 line</span>
            <span className="text-[clamp(1rem,1.7vw,1.375rem)] text-muted-foreground">Widget install</span>
          </div>
          <ul className="absolute bottom-0 left-0 grid h-[45%] w-[60%] grid-cols-3 items-center">
            {STATS.map((s, i) => (
              <li key={s.label} style={at(980 + i * 90)} className="enter-pop flex flex-col items-center text-center">
                <span className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold text-foreground">{s.value}</span>
                <span className="text-[clamp(1rem,1.7vw,1.375rem)] text-muted-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Phones: a plain rounded image, then the stats. */}
        <section aria-label="Talkbalt at a glance" className="flex flex-col gap-5 md:hidden">
          <div style={at(620)} className="enter-card relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-[#070a14]">
            <div data-parallax className="absolute inset-x-0 -inset-y-[8%]">
              <Image src={ribbon} alt="Blue glass ribbon" fill fetchPriority="high" placeholder="blur" sizes="100vw" style={at(620)} className="enter-zoom object-cover" />
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-4">
            {[{ value: '1 line', label: 'Widget install' }, ...STATS].map((s, i) => (
              <li key={s.label} style={at(900 + i * 90)} className="enter-pop flex flex-col">
                <span className="text-xl font-semibold text-foreground">{s.value}</span>
                <span className="text-muted-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section id="features" className="flex w-full flex-col gap-16 overflow-x-clip px-2 pt-12 sm:px-6 md:gap-10 md:pt-20 lg:px-12">
        <h2 data-reveal className="text-center text-3xl tracking-tight text-foreground sm:text-5xl">
          <span>
            A receptionist that <span className="font-semibold">never clocks out</span>
          </span>
        </h2>
        {/* Phones: a plain stack. Wide screens: tilted, overlapping cards that drift with scroll. */}
        <div data-drift="5" className="w-full md:flex md:justify-center">
          <div data-reveal className="mx-auto grid w-full max-w-md gap-20 pt-16 sm:max-w-none sm:grid-cols-2 md:mx-0 md:flex md:w-auto md:items-center md:gap-0 md:py-24">
            {FEATURES.map(({ title, href, tone, art }, i) => {
              const t = CARD_TONE[tone];
              return (
                <Link
                  key={href}
                  href={href}
                  aria-label={`${title.join(' ')}: learn more`}
                  style={{ '--lift': `${(i - 1.5) * -28}px` } as React.CSSProperties}
                  className={`group relative flex h-72 flex-col justify-end gap-6 rounded-[2rem] p-7 transition-[translate] duration-500 ease-out hover:-translate-y-3 md:h-[22rem] md:w-72 md:translate-y-(--lift) md:-rotate-[14deg] md:hover:translate-y-[calc(var(--lift)-1rem)] lg:w-80 ${i ? 'md:-ml-8 lg:-ml-6' : ''} ${t.card}`}
                >
                  {art}
                  <h3 className="relative text-3xl leading-[1.05] font-semibold tracking-tight">
                    {title[0]}
                    <br />
                    <span className={t.soft}>{title[1]}</span>
                  </h3>
                  <span className="relative flex items-center gap-3 text-xs font-medium tracking-wide uppercase">
                    <span className={`flex size-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 ${t.button}`}>
                      <ArrowUpRight className="size-4" aria-hidden />
                    </span>
                    Learn more
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how" className="flex w-full flex-col gap-14 px-2 py-12 sm:gap-20 sm:px-6 sm:py-20 lg:px-12">
        <div data-reveal className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-3xl tracking-tight text-foreground sm:text-5xl">
            Live in <span className="font-semibold">four steps</span>
          </h2>
        </div>
        <ol data-track className="relative flex w-full flex-col gap-16 sm:gap-28 md:block md:aspect-[1000/900]">
          {/* Wide screens: one glass pipe sweeping across the full width, from step to step. */}
          {/* Plain dashed strokes only (no masks or filters), so each scroll frame is one cheap repaint
              of this layer: the water group and two ripple lines take a dash offset. */}
          <svg aria-hidden viewBox="0 0 1000 900" className="absolute inset-0 hidden size-full overflow-visible will-change-transform md:block">
            <g data-water fill="none" strokeLinecap="round">
              <path d={PIPE_PATH} stroke={WATER.body} strokeWidth={13} />
              <path d={PIPE_PATH} stroke={WATER.deep} strokeOpacity={0.45} strokeWidth={4} transform="translate(2 2)" />
            </g>
            {RIPPLES.map((r, i) => (
              <path key={i} data-ripple d={r.d} fill="none" stroke={r.color} strokeOpacity={r.opacity} strokeWidth={r.width} strokeLinecap="round" />
            ))}
          </svg>
          {STEPS.map(({ title, text }, i) => {
            const [x, y] = PIPE_POINTS[i];
            const onLeft = x < 500;
            return (
              <li
                key={title}
                data-step
                style={{ '--x': `${x / 10}%`, '--y': `${(y / 900) * 100}%` } as React.CSSProperties}
                className="group relative grid grid-cols-[2.5rem_1fr] items-start gap-5 md:absolute md:inset-x-0 md:top-(--y) md:block md:h-0"
              >
                {i < STEPS.length - 1 && (
                  // Phones: a straight segment of pipe from this dot to the next (the list's gap included).
                  <span aria-hidden className="absolute top-5 left-5 h-[calc(100%+4rem)] w-2.5 -translate-x-1/2 overflow-hidden rounded-full sm:h-[calc(100%+7rem)] md:hidden">
                    <span data-track-fill className="water block size-full origin-top" />
                  </span>
                )}
                <span
                  data-step-dot
                  className="glass-orb relative flex size-10 items-center justify-center rounded-full text-sm font-semibold md:absolute md:top-0 md:left-(--x) md:size-14 md:-translate-1/2 md:text-base"
                >
                  <span className="relative">{i + 1}</span>
                </span>
                {/* On wide screens the text sits across from its dot, clear of the pipe's sweep. */}
                <div data-step-body className={`flex flex-col gap-2 pt-1.5 md:absolute md:-top-7 md:w-[min(30%,26rem)] md:pt-0 ${onLeft ? 'md:right-[12%]' : 'md:left-[12%]'}`}>
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">{title}</h3>
                  <p className="leading-relaxed text-muted-foreground md:text-lg">{text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
}
