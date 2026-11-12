/** The public website's address, for canonical URLs, the sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL to the real domain (for example https://talkbalt.com) before going live. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001').replace(/\/+$/, '');
export const SITE_NAME = 'Talkbalt';

/** Where people send privacy and data requests. Set NEXT_PUBLIC_CONTACT_EMAIL before going live. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;

/** Shown in the footer copyright. Static pages cannot read the clock while prerendering; update yearly. */
export const COPYRIGHT_YEAR = 2026;

/** The demo receptionist behind "Try a demo call" on the website (platform-api/scripts/seed_demo_business.py). */
export const DEMO_BUSINESS = process.env.NEXT_PUBLIC_DEMO_BUSINESS || 'talkbalt-demo';
