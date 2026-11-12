import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { SiteMotion } from '@/components/motion/site-motion';
import { ArticleList } from '@/components/site/article-list';
import { PageHero } from '@/components/site/site-chrome';
import { CATEGORIES, type CategoryKey, articlesIn } from '@/lib/articles';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ topic: c.key }));
}

function find(topic: string) {
  return CATEGORIES.find((c) => c.key === (topic as CategoryKey));
}

export async function generateMetadata({ params }: PageProps<'/articles/topic/[topic]'>): Promise<Metadata> {
  const category = find((await params).topic);
  if (!category) return {};
  return {
    title: `${category.label} · Talkbalt articles`,
    description: category.description,
    alternates: { canonical: `/articles/topic/${category.key}` },
  };
}

export default async function TopicPage({ params }: PageProps<'/articles/topic/[topic]'>) {
  const category = find((await params).topic);
  if (!category) notFound();
  const articles = articlesIn(category.key);

  return (
    <>
      <SiteMotion />
      <PageHero title={category.label}>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-lg">{category.description}</p>
        <Link href="/articles" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" aria-hidden /> All articles
        </Link>
      </PageHero>
      <div data-reveal className="w-full px-2 sm:px-6 lg:px-12">
        <ArticleList articles={articles} />
      </div>
    </>
  );
}
