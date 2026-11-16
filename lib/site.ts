/** Public canonical domain confirmed by the owner. Override only for another public deployment. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://talkbalt.online').replace(/\/+$/, '');
export const SITE_NAME = 'Talkbalt';

/** Where people send privacy and data requests. Set NEXT_PUBLIC_CONTACT_EMAIL before going live. */
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || null;

/** Shown in the footer copyright. Static pages cannot read the clock while prerendering; update yearly. */
export const COPYRIGHT_YEAR = 2026;

/** The demo receptionist behind "Try a demo call" on the website (platform-api/scripts/seed_demo_business.py). */
export const DEMO_BUSINESS = process.env.NEXT_PUBLIC_DEMO_BUSINESS || 'talkbalt-demo';
