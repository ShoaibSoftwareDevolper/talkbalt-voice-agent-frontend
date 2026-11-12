import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categoryOf, getArticle } from '@/lib/articles';
import { HideOnArticles } from './hide-on-articles';

// Six cornerstone articles shown above the footer: 3 columns x 2 rows on desktop.
const FEATURED = [
  'what-is-talkbalt',
  'ai-receptionist-for-salons',
  'ai-receptionist-for-dentists',
  'ai-receptionist-urdu',
  'missed-calls-small-business',
  'ai-receptionist-cost',
];

/** "From the blog" section above the site footer (not on the articles pages, which list articles already). */
export function BlogStrip() {
  const articles = FEATURED.map(getArticle).filter((a) => a !== undefined);
  return (
    <HideOnArticles>
      <section data-reveal aria-labelledby="blog-strip" className="flex w-full flex-col gap-6 px-2 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h2 id="blog-strip" className="text-3xl tracking-tight text-foreground sm:text-4xl">From the blog</h2>
            <p className="text-muted-foreground">Guides on AI receptionists, Urdu voice agents and getting more bookings.</p>
          </div>
          <Link href="/articles" className="flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:bg-foreground/90">
            All articles <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/articles/${a.slug}`} className="group flex h-full flex-col gap-3 rounded-[1.5rem] bg-background p-6 transition-colors hover:bg-foreground hover:text-background">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase group-hover:text-background/70">
                  {categoryOf(a.category).label}
                </span>
                <h3 className="text-lg font-medium tracking-tight text-foreground group-hover:text-background">{a.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-background/70">{a.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </HideOnArticles>
  );
}
