import type { Metadata } from 'next';
import { CalendarCheck, Clock, Lock, MessageCircle } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { PageHero } from '@/components/site/site-chrome';

export const metadata: Metadata = {
  title: 'About · Talkbalt',
  description: 'Talkbalt gives every business a voice receptionist that answers visitors and books appointments.',
};

const PRINCIPLES = [
  { icon: MessageCircle, title: 'Sound like a person', text: 'One question at a time, short replies, and room to interrupt. Questions get answered before anything is booked.' },
  { icon: CalendarCheck, title: 'Book only what is real', text: 'Every detail is confirmed out loud, your opening hours are respected, and a slot can never be taken twice.' },
  { icon: Lock, title: 'Keep each business separate', text: 'Every business’s data is isolated at the database level. A call only ever sees the business it belongs to.' },
  { icon: Clock, title: 'Always on', text: 'Day, night and weekends. Visitors never wait on hold, and you never come back to a pile of voicemails.' },
];

export default function AboutPage() {
  return (
    <>
      <SiteMotion />
      <PageHero title={<>We answer the call, <span className="font-semibold">so you can do the work</span></>}>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          Talkbalt is an AI voice receptionist for small businesses. Visitors press “Start your call” on your website or booking
          link, ask what they need to, and book a time. You see every booking in your dashboard.
        </p>
      </PageHero>

      <section className="grid w-full gap-10 px-2 py-10 sm:px-6 md:grid-cols-[1fr_1.4fr] md:py-16 lg:px-12">
        <h2 data-reveal className="text-3xl tracking-tight text-foreground sm:text-4xl">
          <span>Why we built it</span>
        </h2>
        <div data-reveal className="flex flex-col gap-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            Small businesses lose bookings for a simple reason: nobody is free to answer. The person who could pick up is with a
            customer, or it is after hours.
          </p>
          <p>
            We wanted a receptionist that any business could set up in minutes, from a short form: services, prices and opening
            hours. No scripts to write, no phone system to install.
          </p>
        </div>
      </section>

      <section className="flex w-full flex-col gap-8 px-2 pb-6 sm:px-6 lg:px-12">
        <h2 data-reveal className="text-3xl tracking-tight text-foreground sm:text-4xl">
          <span>What we care about</span>
        </h2>
        <div data-reveal className="grid gap-4 sm:grid-cols-2">
          {PRINCIPLES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl bg-background p-6 sm:p-8">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="leading-relaxed text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
