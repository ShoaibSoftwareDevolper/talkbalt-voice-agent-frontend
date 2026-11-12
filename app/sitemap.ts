import type { MetadataRoute } from 'next';
import { ARTICLES, CATEGORIES } from '@/lib/articles';
import { SITE_URL } from '@/lib/site';

/** /sitemap.xml: the public website and every article. Dashboard, auth and API routes are left out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const latest = ARTICLES.reduce((d, a) => (a.date > d ? a.date : d), '2026-11-01');
  return [
    { url: `${SITE_URL}/`, lastModified: latest, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/articles`, lastModified: latest, changeFrequency: 'weekly', priority: 0.8 },
    ...CATEGORIES.map((c) => ({ url: `${SITE_URL}/articles/topic/${c.key}`, lastModified: latest, changeFrequency: 'weekly' as const, priority: 0.6 })),
    ...ARTICLES.map((a) => ({ url: `${SITE_URL}/articles/${a.slug}`, lastModified: a.date, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
