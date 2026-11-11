import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { PageHero } from '@/components/site/site-chrome';
import { ARTICLES, formatDate, getArticle } from '@/lib/articles';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? { title: `${article.title} · Talkbalt`, description: article.excerpt } : {};
}

export default async function ArticlePage({ params }: PageProps<'/articles/[slug]'>) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const next = ARTICLES[(ARTICLES.indexOf(article) + 1) % ARTICLES.length];

  return (
    <>
      <SiteMotion />
      <div aria-hidden data-progress className="fixed inset-x-0 top-0 z-40 h-1 origin-left scale-x-0 bg-foreground" />
      <PageHero title={article.title}>
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(article.date)} · {article.minutes} min read
        </p>
      </PageHero>

      <article className="flex w-full max-w-2xl flex-col gap-12 px-3 py-6 sm:py-10">
        {article.body.map((section) => (
          <section key={section.heading} data-reveal className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-foreground/75">
                {p}
              </p>
            ))}
            {section.code && (
              <pre className="overflow-x-auto rounded-2xl bg-foreground p-5 text-sm leading-relaxed text-background">
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}

        <div className="flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/articles" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden /> All articles
          </Link>
          <Link href={`/articles/${next.slug}`} className="rounded-full bg-background px-5 py-3 text-sm text-foreground hover:bg-foreground hover:text-background">
            Next: {next.title}
          </Link>
        </div>
      </article>
    </>
  );
}
