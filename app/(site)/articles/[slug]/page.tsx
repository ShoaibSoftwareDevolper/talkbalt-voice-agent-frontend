import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { ArticleList } from '@/components/site/article-list';
import { PageHero } from '@/components/site/site-chrome';
import { ARTICLES, categoryOf, formatDate, getArticle, readingMinutes, relatedTo } from '@/lib/articles';
import { SITE_NAME, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<'/articles/[slug]'>): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const url = `/articles/${article.slug}`;
  return {
    title: `${article.title} · Talkbalt`,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: { type: 'article', url, title: article.title, description: article.description, publishedTime: article.date, siteName: SITE_NAME },
    twitter: { card: 'summary', title: article.title, description: article.description },
  };
}

/** Article, breadcrumb and FAQ structured data for search engines. */
function structuredData(article: NonNullable<ReturnType<typeof getArticle>>) {
  const url = `${SITE_URL}/articles/${article.slug}`;
  const category = categoryOf(article.category);
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      dateModified: article.date,
      inLanguage: 'en',
      mainEntityOfPage: url,
      keywords: article.keywords.join(', '),
      author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Articles', item: `${SITE_URL}/articles` },
        { '@type': 'ListItem', position: 2, name: category.label, item: `${SITE_URL}/articles/topic/${category.key}` },
        { '@type': 'ListItem', position: 3, name: article.title, item: url },
      ],
    },
  ];
  if (article.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  // "<" is escaped so article text can never close the script tag.
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}

export default async function ArticlePage({ params }: PageProps<'/articles/[slug]'>) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const category = categoryOf(article.category);

  return (
    <>
      <SiteMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData(article) }} />
      <div aria-hidden data-progress className="fixed inset-x-0 top-0 z-40 h-1 origin-left scale-x-0 bg-foreground" />
      <PageHero title={article.title}>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/articles" className="hover:text-foreground">Articles</Link>
          <span aria-hidden>/</span>
          <Link href={`/articles/topic/${category.key}`} className="hover:text-foreground">{category.label}</Link>
        </nav>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">{article.description}</p>
        <p className="text-sm text-muted-foreground">
          {formatDate(article.date)} · {readingMinutes(article)} min read
        </p>
      </PageHero>

      <article className="flex w-full max-w-2xl flex-col gap-12 px-3 py-6 sm:py-10">
        {article.sections.map((section) => (
          <section key={section.heading} data-reveal className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">{section.heading}</h2>
            {section.paragraphs.map((p) => (
              <p key={p} className="text-lg leading-relaxed text-foreground/75">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="flex list-disc flex-col gap-2 pl-6 text-lg leading-relaxed text-foreground/75">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {section.code && (
              <pre className="overflow-x-auto rounded-2xl bg-foreground p-5 text-sm leading-relaxed text-background">
                <code>{section.code}</code>
              </pre>
            )}
          </section>
        ))}

        {article.faqs && article.faqs.length > 0 && (
          <section data-reveal className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">Questions</h2>
            <dl className="flex flex-col gap-5">
              {article.faqs.map((f) => (
                <div key={f.q} className="flex flex-col gap-1">
                  <dt className="text-lg font-medium text-foreground">{f.q}</dt>
                  <dd className="text-lg leading-relaxed text-foreground/75">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <section data-reveal className="flex flex-col items-start gap-4 rounded-[1.5rem] bg-background p-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Try Talkbalt for your business</h2>
          <p className="text-foreground/75">Set up your receptionist, make a test call and share your link.</p>
          <Link href="/signup" className="rounded-full bg-foreground px-5 py-3 text-sm text-background hover:bg-foreground/90">
            Set up your receptionist
          </Link>
        </section>
      </article>

      <section data-reveal aria-labelledby="keep-reading" className="flex w-full flex-col gap-4 px-2 pb-6 sm:px-6 lg:px-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2 px-2">
          <h2 id="keep-reading" className="text-2xl tracking-tight text-foreground">Keep reading</h2>
          <Link href="/articles" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden /> All articles
          </Link>
        </div>
        <ArticleList articles={relatedTo(article)} />
      </section>
    </>
  );
}
