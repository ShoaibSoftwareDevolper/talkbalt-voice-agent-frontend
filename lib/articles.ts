/** The website's articles. Plain data, so pages stay static and a CMS can replace this later. */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO date
  minutes: number;
  tag: string;
  body: { heading: string; paragraphs: string[]; code?: string }[];
};

export const ARTICLES: Article[] = [
  {
    slug: 'why-missed-calls-cost-bookings',
    title: 'Why a missed call is a missed booking',
    excerpt: 'Most people who want to book do it the moment they think of it. If nobody answers, they book somewhere else.',
    date: '2026-11-11',
    minutes: 3,
    tag: 'Business',
    body: [
      {
        heading: 'Booking is an impulse',
        paragraphs: [
          'Someone sees your website in the evening, decides they want an appointment, and reaches out right then. That moment is when they are most likely to say yes.',
          'If the answer is a contact form or a voicemail, the moment passes. Many will simply try the next business on the list.',
        ],
      },
      {
        heading: 'Small teams cannot answer everything',
        paragraphs: [
          'A salon, a clinic or a workshop is busy doing the work. Answering every call, during and after hours, means stopping that work or paying for a front desk.',
          'An AI receptionist covers the gaps: it answers instantly, any time, and never puts anyone on hold.',
        ],
      },
      {
        heading: 'What a good receptionist does',
        paragraphs: [
          'It answers questions about your services and prices, checks your opening hours, and confirms each detail before booking. If a time is taken, it offers the nearest free slots instead.',
          'That is exactly what Talkbalt does, and every booking lands in your dashboard.',
        ],
      },
    ],
  },
  {
    slug: 'how-talkbalt-avoids-double-bookings',
    title: 'How Talkbalt avoids double bookings',
    excerpt: 'Two callers, one time slot. Here is how the receptionist makes sure only one of them gets it.',
    date: '2026-11-08',
    minutes: 4,
    tag: 'Product',
    body: [
      {
        heading: 'It confirms before it books',
        paragraphs: [
          'The receptionist asks for one detail at a time: the service, the day and time, the caller’s name and how to reach them. It reads them back, and only books once the caller says yes.',
          'Unclear answers, like a bare “hello” or “sorry, what?”, are never saved as details. It simply asks again.',
        ],
      },
      {
        heading: 'Your hours are the rules',
        paragraphs: [
          'Requests outside your opening hours are turned down politely, with a time that works. A booking is never placed when you are closed.',
        ],
      },
      {
        heading: 'The database has the final word',
        paragraphs: [
          'Even if two calls ask for the same slot at the same second, the database itself refuses an overlapping booking. The second caller hears the nearest free times instead.',
          'So your calendar never shows two people at once, no matter how busy it gets.',
        ],
      },
    ],
  },
  {
    slug: 'add-the-widget-to-your-website',
    title: 'Add the call button to your website in one line',
    excerpt: 'Paste one script tag and visitors can talk to your receptionist without leaving your site.',
    date: '2026-11-05',
    minutes: 2,
    tag: 'Guide',
    body: [
      {
        heading: 'Copy your snippet',
        paragraphs: ['Open Share & embed in your dashboard. Your snippet already has your business filled in. It looks like this:'],
        code: '<script src="https://YOUR-TALKBALT-DOMAIN/widget.js" data-business="your-business-slug" async></script>',
      },
      {
        heading: 'Paste it before </body>',
        paragraphs: [
          'Any website works: WordPress, Wix, Shopify or plain HTML. A “Start your call” button appears in the bottom-right corner.',
          'You can change the button text with data-label and its colour with data-color.',
        ],
      },
      {
        heading: 'What visitors see',
        paragraphs: [
          'Pressing the button opens a small panel. The browser asks once for the microphone, and the call starts. Closing the panel ends the call.',
          'The widget is isolated from your page, so your styles cannot break it and it cannot slow your site down.',
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
