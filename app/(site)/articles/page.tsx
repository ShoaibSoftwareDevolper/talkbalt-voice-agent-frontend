import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { PageHero } from '@/components/site/site-chrome';
import { ARTICLES, formatDate } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles · Talkbalt',
  description: 'Guides and notes on answering every call and turning it into a booking.',
};

export default function ArticlesPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <>
      <SiteMotion />
      <PageHero title={<>Notes on <span className="font-semibold">never missing a booking</span></>}>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">Guides for getting set up, and how the receptionist works.</p>
      </PageHero>

      <section data-reveal className="flex w-full flex-col gap-4 px-2 sm:px-6 lg:px-12">
        <Link
          href={`/articles/${featured.slug}`}
          className="group grid gap-6 rounded-[2rem] bg-background p-6 sm:p-10 md:grid-cols-[1.4fr_1fr] md:items-end"
        >
          <div className="flex flex-col gap-4">
            <Meta tag={featured.tag} date={featured.date} minutes={featured.minutes} />
            <h2 className="text-3xl tracking-tight text-foreground sm:text-4xl">{featured.title}</h2>
          </div>
          <div className="flex items-end justify-between gap-6">
            <p className="leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <Arrow />
          </div>
        </Link>
        <div className="grid gap-4 md:grid-cols-2">
          {rest.map((a) => (
            <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex flex-col gap-4 rounded-[2rem] bg-background p-6 sm:p-8">
              <Meta tag={a.tag} date={a.date} minutes={a.minutes} />
              <h2 className="text-2xl tracking-tight text-foreground">{a.title}</h2>
              <div className="mt-auto flex items-end justify-between gap-6">
                <p className="leading-relaxed text-muted-foreground">{a.excerpt}</p>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function Meta({ tag, date, minutes }: { tag: string; date: string; minutes: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
      <span className="rounded-full bg-muted px-3 py-1 text-foreground">{tag}</span>
      <span>{formatDate(date)}</span>
      <span aria-hidden>·</span>
      <span>{minutes} min read</span>
    </div>
  );
}

function Arrow() {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
      <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
    </span>
  );
}
