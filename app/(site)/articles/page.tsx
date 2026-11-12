import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteMotion } from '@/components/motion/site-motion';
import { ArticleList } from '@/components/site/article-list';
import { PageHero } from '@/components/site/site-chrome';
import { ARTICLES, CATEGORIES, articlesIn } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'Articles · Talkbalt',
  description: 'Guides on AI receptionists, Urdu and Hindi voice agents, and taking more bookings for salons, clinics, restaurants and other businesses in Pakistan.',
  alternates: { canonical: '/articles' },
};

export default function ArticlesPage() {
  return (
    <>
      <SiteMotion />
      <PageHero title={<>Notes on <span className="font-semibold">never missing a booking</span></>}>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
          {ARTICLES.length} articles on AI receptionists, Urdu and Hindi voice agents, and getting more bookings in Pakistan.
        </p>
        <nav aria-label="Topics" className="flex flex-wrap gap-2 text-sm">
          {CATEGORIES.map((c) => (
            <Link key={c.key} href={`/articles/topic/${c.key}`} className="rounded-full bg-background px-3 py-1.5 text-foreground hover:bg-foreground hover:text-background">
              {c.label}
            </Link>
          ))}
        </nav>
      </PageHero>

      <div className="flex w-full flex-col gap-12 px-2 sm:px-6 lg:px-12">
        {CATEGORIES.map((c) => (
          <section key={c.key} data-reveal aria-labelledby={`topic-${c.key}`} className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2 px-2">
              <h2 id={`topic-${c.key}`} className="text-2xl tracking-tight text-foreground">{c.label}</h2>
              <Link href={`/articles/topic/${c.key}`} className="text-sm text-muted-foreground hover:text-foreground">
                All {articlesIn(c.key).length} in {c.label}
              </Link>
            </div>
            <ArticleList articles={articlesIn(c.key).slice(0, 6)} />
          </section>
        ))}
      </div>
    </>
  );
}
