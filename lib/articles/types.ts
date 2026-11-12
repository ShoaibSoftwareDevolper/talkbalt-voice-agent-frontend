export type CategoryKey = 'product' | 'languages' | 'salons' | 'health' | 'food' | 'services' | 'cities' | 'guides' | 'compare';

export type Section = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  code?: string;
};

export type Article = {
  slug: string; // the URL: /articles/<slug>
  title: string;
  description: string; // meta description and the excerpt on cards (about 150 characters)
  date: string; // ISO date
  category: CategoryKey;
  keywords: string[];
  sections: Section[];
  faqs?: { q: string; a: string }[];
};

/** Writes an article section: heading, then paragraphs; a string array as the last argument becomes a list. */
export function s(heading: string, ...parts: (string | string[])[]): Section {
  const list = Array.isArray(parts.at(-1)) ? (parts.pop() as string[]) : undefined;
  return { heading, paragraphs: parts as string[], ...(list ? { list } : {}) };
}

/** More sections and FAQs for an article, kept in lib/articles/extra/ and appended after its own. */
export type Extra = { sections?: Section[]; faqs?: { q: string; a: string }[] };
