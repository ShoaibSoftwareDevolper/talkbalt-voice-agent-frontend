/** The website's articles. Plain data, so pages stay static and a CMS can replace this later. */
import { CITIES } from './data/cities';
import { COMPARE } from './data/compare';
import { FOOD } from './data/food';
import { GUIDES } from './data/guides';
import { HEALTH } from './data/health';
import { LANGUAGES } from './data/languages';
import { LEGACY } from './data/legacy';
import { PRODUCT } from './data/product';
import { SALONS } from './data/salons';
import { SERVICES } from './data/services';
import { EXTRA } from './extra';
import type { Article, CategoryKey } from './types';

export type { Article, CategoryKey, Section } from './types';

export const CATEGORIES: { key: CategoryKey; label: string; description: string }[] = [
  { key: 'product', label: 'Talkbalt', description: 'How Talkbalt works and how to set it up.' },
  { key: 'languages', label: 'Urdu, Hindi and English', description: 'How the receptionist understands and speaks three languages.' },
  { key: 'salons', label: 'Salons and beauty', description: 'For salons, parlours, barbers, spas and nail studios.' },
  { key: 'health', label: 'Clinics and dentists', description: 'For dental clinics, medical offices and other health practices.' },
  { key: 'food', label: 'Restaurants and cafes', description: 'Reservations and questions for restaurants, cafes and venues.' },
  { key: 'services', label: 'Other businesses', description: 'Gyms, academies, workshops, studios and home services.' },
  { key: 'cities', label: 'Cities', description: 'Talkbalt for businesses across Pakistan.' },
  { key: 'guides', label: 'Guides', description: 'Practical guides for getting more bookings.' },
  { key: 'compare', label: 'Comparisons', description: 'AI receptionists compared with the alternatives.' },
];

/** Adds an article's extra sections and FAQs (lib/articles/extra/*) after its own. */
function withExtra(article: Article): Article {
  const extra = EXTRA[article.slug];
  if (!extra) return article;
  return {
    ...article,
    sections: [...article.sections, ...(extra.sections ?? [])],
    faqs: [...(article.faqs ?? []), ...(extra.faqs ?? [])],
  };
}

export const ARTICLES: Article[] = [
  ...PRODUCT, ...LEGACY, ...LANGUAGES, ...SALONS, ...HEALTH, ...FOOD, ...SERVICES, ...CITIES, ...GUIDES, ...COMPARE,
].map(withExtra);

const BY_SLUG = new Map(ARTICLES.map((a) => [a.slug, a]));
if (BY_SLUG.size !== ARTICLES.length) throw new Error('Two articles share a slug');

export function getArticle(slug: string): Article | undefined {
  return BY_SLUG.get(slug);
}

export function categoryOf(key: CategoryKey) {
  return CATEGORIES.find((c) => c.key === key)!;
}

export function articlesIn(key: CategoryKey): Article[] {
  return ARTICLES.filter((a) => a.category === key);
}

/** Other articles from the same category, then from the rest, for "Keep reading". */
export function relatedTo(article: Article, count = 3): Article[] {
  const same = articlesIn(article.category).filter((a) => a.slug !== article.slug);
  const start = Math.max(0, same.findIndex((a) => a.slug > article.slug));
  const rotated = [...same.slice(start), ...same.slice(0, start)];
  return rotated.slice(0, count);
}

export function readingMinutes(article: Article): number {
  const text = [
    ...article.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.list ?? [])]),
    ...(article.faqs ?? []).flatMap((f) => [f.q, f.a]),
  ].join(' ');
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
