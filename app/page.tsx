import Link from 'next/link';
import { CalendarCheck, Globe, PhoneCall } from 'lucide-react';
import { PublicHeader } from '@/components/app-shell';
import { IntroLoader } from '@/components/motion/intro-loader';

const FEATURES = [
  {
    icon: PhoneCall,
    title: 'Answers every visitor',
    text: 'Visitors tap “Start your call” on your website or booking link, day or night, and talk to a receptionist that sounds like a real person.',
  },
  {
    icon: Globe,
    title: 'Knows your business',
    text: 'It explains your services, prices and opening hours, and never books outside them.',
  },
  {
    icon: CalendarCheck,
    title: 'Books into your calendar',
    text: 'Confirmed appointments land in your dashboard the moment a caller says yes. No double bookings.',
  },
];

const STEPS = ['Create your account', 'Add your business info and prices', 'Make a test call', 'Share your link or add the widget'];

export default function Home() {
  return (
    <>
      <IntroLoader />
      <PublicHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-16 px-4 py-16 sm:px-6 sm:py-24">
        <section className="flex max-w-3xl flex-col gap-6">
          <span className="w-fit rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">AI voice receptionist</span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl">
            Never miss a booking again.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Talkbalt answers your website visitors by voice, explains your services and prices, and books appointments
            straight into your dashboard, like Calendly with a voice.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:bg-brand/90">
              Start free
            </Link>
            <Link href="/login" className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-muted">
              Log in
            </Link>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-foreground">Live in four steps</h2>
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
