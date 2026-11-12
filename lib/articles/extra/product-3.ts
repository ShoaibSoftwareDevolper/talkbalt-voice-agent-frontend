import { type Extra, s } from '../types';

export const PRODUCT_EXTRA_3: Record<string, Extra> = {
  'what-talkbalt-does-not-do': {
    sections: [
      s('Questions to ask yourself before starting', [
        'Do most of my customers find me online, through WhatsApp, Instagram, Google or my website?',
        'Do I usually serve one customer per time slot, or several at once?',
        'Are my services and prices clear enough to say out loud?',
        'Am I comfortable following up on bookings myself through WhatsApp?',
        'Do my customers mostly speak Urdu, Hindi or English?',
      ]),
      s('If the answers are mostly yes',
        'Then the current limits are unlikely to get in your way, and the benefits arrive on the first day: every call answered, bookings without back and forth, and a clear list of who is coming. If several answers are no, start small, for example by sharing your link only in your WhatsApp away message, and see how your customers respond before relying on it.'),
    ],
  },
  'choosing-a-receptionist-voice': {
    sections: [
      s('A note on accents',
        'Each voice has its own accent and pace, and that accent changes slightly between English, Urdu and Hindi. A voice that sounds neutral in English may sound more formal or more casual in Urdu. That is why the samples are recorded per language and why it is worth listening again whenever you change the receptionist language. Choose the voice that your customers will find easiest to understand on a phone speaker in a noisy place, not just the one that sounds best in a quiet room.'),
    ],
  },
  'opening-hours-setup': {
    sections: [
      s('An example week',
        'A barber shop might set Monday to Thursday from 11 am to 10 pm, Friday from 3 pm to 11 pm after Jumma, Saturday and Sunday from 11 am to 11 pm. With those hours, a caller asking for Friday at noon hears that the shop opens at 3 on Fridays and is offered 3 pm or later. A caller asking for 10:45 pm on a Thursday for a 30 minute haircut hears that it would run past closing and is offered an earlier time.'),
    ],
  },
  'public-booking-link': {
    sections: [
      s('Using the link in conversations',
        'Your link is also useful in everyday conversations. When a customer messages "price?" on WhatsApp, reply with your link. When someone comments on a post asking about availability, reply with your link. When a regular says "I will call you to book", send them the link instead. Each time, you save yourself a back and forth and give them a way to book immediately.'),
    ],
  },
  'call-transcripts-and-recordings': {
    sections: [
      s('Recordings and consent',
        'If you listen to recordings, remember they contain your customers voices. Keep them inside your business, listen only when there is a reason, and mention in your FAQs or greeting that calls may be recorded if that matters in your area.'),
    ],
  },
  'test-call-before-launch': {
    sections: [
      s('Keep a short test script', 'Write your test questions down and reuse them after every big change. The same five questions each time make it easy to notice when something has changed for better or worse.'),
    ],
  },
  'bookings-dashboard-whatsapp': {
    sections: [
      s('Bookings at a glance on your phone', 'The dashboard works on phones too. Many owners check the day bookings from their phone before leaving home and message late customers from wherever they are.'),
    ],
  },
  'how-talkbalt-avoids-double-bookings': {
    sections: [
      s('Peace of mind on busy days', 'On Eid week or a wedding season Saturday, when calls come in nonstop, this is the feature owners appreciate most. Nobody has to keep the whole day in their head.'),
    ],
  },
  'how-talkbalt-handles-rude-callers': {
    sections: [
      s('Your staff stay protected', 'Because the receptionist handles these callers, your staff, especially young or female staff, are never the ones on the line hearing it.'),
    ],
  },
  'services-and-prices-setup': {
    sections: [
      s('Currency', 'Prices are in Pakistani rupees by default. If you serve customers in another currency, set it per service so the receptionist quotes it correctly.'),
    ],
  },
};
