import { type Extra, s } from '../types';

export const PRODUCT_EXTRA: Record<string, Extra> = {
  'how-talkbalt-works': {
    sections: [
      s('Where your information lives',
        'Everything the receptionist says about your business comes from your dashboard: business info, FAQs, services, products and hours. When you change something, the next call uses it. There is no separate script to maintain and nothing to retrain, which is why owners can keep their receptionist accurate in a few minutes a week.'),
    ],
  },
  'set-up-ai-receptionist-in-ten-minutes': {
    sections: [
      s('After the first week',
        'Once real customers start calling, spend fifteen minutes at the end of the first week reading transcripts. You will almost always find one question you did not cover, one service named differently by customers, and one time of day people want that you do not offer. Fix those three things and your receptionist is noticeably better in week two.',
        'After that, a short monthly check is enough: prices still right, hours still right, seasonal services added or removed.'),
    ],
  },
  'talkbalt-booking-flow': {
    sections: [
      s('Why this matters for your business',
        'Each check in the flow exists because of a real way bookings go wrong at a busy front desk: a number written down with a missing digit, an appointment taken for a day the shop is closed, two customers given the same slot, a booking confirmed before anyone checked. Moving those checks into the booking flow means your team stops cleaning up after them.'),
    ],
  },
  'business-info-form-guide': {
    sections: [
      s('A before and after example',
        'Here is an about text that causes problems: "Welcome to Glow Salon, the best salon in Lahore offering haircuts, colour, keratin, facials, waxing, threading and bridal makeup at amazing prices!" It lists services that may not be on your services list, makes a claim the receptionist cannot back up, and sounds like an advert when spoken.',
        'Here is the same business, rewritten: "Glow Salon is a ladies salon in Gulberg, open since 2015, with an all female team. Most clients come for colour and bridal makeup." It is short, factual and useful. The services and prices then live in the services list, where they can be quoted and booked.'),
      s('Questions that come up for almost every business', [
        'Where exactly are you, and is there a landmark?',
        'Is there parking?',
        'Which payment methods do you accept?',
        'Do I need to book, or can I walk in?',
        'What is your cancellation policy?',
        'Is there anything I should bring or prepare?',
      ]),
    ],
  },
  'services-and-prices-setup': {
    sections: [
      s('A worked example for a clinic',
        'A small dental clinic might set up its list like this: Consultation, 20 minutes, Rs 1,500. Scaling and polishing, 40 minutes, Rs 4,000. Filling, 45 minutes, from Rs 3,500. Root canal session, 60 minutes, priced after examination. Teeth whitening, 60 minutes, Rs 20,000.',
        'Treatments priced after examination can have no price, with an FAQ explaining how pricing works. The receptionist then books the visit and tells the patient the dentist will confirm the price, instead of quoting a number that might be wrong.'),
      s('Checking your list from a customer view',
        'Open your public page and read your services as a customer would. Would a new customer understand every name? Is anything missing that you offer every day? Is anything listed that you no longer do? The page is exactly what your receptionist works from, so if it reads well, your receptionist will sound right too.'),
    ],
  },
  'opening-hours-setup': {
    sections: [
      s('Why the receptionist offers alternatives',
        'A flat "we are closed then" ends conversations. A receptionist that says "we are closed on Sunday, but Monday from 11 is open" keeps the customer. Talkbalt always pairs a refusal with the nearest time that works, using your hours, so a closed day rarely means a lost booking.'),
      s('Hours for businesses that visit customers',
        'If you go to your customers, your hours are the times you are willing to start a visit. Include travel in your service durations rather than in your hours, so the last visit of the day still leaves you time to get there and back.'),
      s('When something unexpected happens',
        'Staff illness, a power outage or a family emergency can close you without warning. Remove that day hours from the dashboard as soon as you know. The receptionist stops offering those times immediately, and you can message anyone already booked from the bookings list.'),
    ],
  },
  'choosing-a-receptionist-voice': {
    sections: [
      s('What customers notice first',
        'In test calls, people tend to notice three things about a voice within the first sentence: whether it sounds warm or cold, whether it sounds rushed, and whether it pronounces your business name properly. If your business name is unusual, listen for it in your test call. A slightly different spelling in your greeting can fix an awkward pronunciation.'),
      s('Mistakes to avoid',
        'Choosing a voice because you like it personally rather than because it suits your customers. Switching voices every few days, which confuses regular customers. Picking a voice in one language and then switching the language without listening again, since each voice sounds a little different in each language.'),
      s('Voice and trust',
        'Customers who hear a natural, polite voice that answers their question directly are more willing to give their name and number. That is the moment that decides whether a call becomes a booking, so it is worth the few minutes it takes to choose well.'),
    ],
  },
  'public-booking-link': {
    sections: [
      s('A link for every situation',
        'The same link works for very different customers. A new customer who found you on Google Maps uses it to check your prices and book a first visit. A regular uses it from your WhatsApp status to book their usual service without waiting for a reply. Someone abroad uses it to book for a parent in Pakistan. You do not need different links for each.'),
      s('Tell people what happens when they tap',
        'Customers are more likely to tap a link when they know what it does. Instead of just pasting the link, add one line: "Tap to ask any question and book by voice, in Urdu or English, any time." That sentence answers the three worries people have: what it is, which language, and whether it works now.'),
      s('How to check it is working',
        'Your overview shows calls for the last 7 and 30 days. If you add your link somewhere new, such as your Google profile, watch whether calls rise over the next week. If they do not, the link may be hard to find there, or the text around it may not explain it.'),
    ],
  },
  'test-call-before-launch': {
    sections: [
      s('What a good test call sounds like',
        'A good receptionist greets briefly, answers each question in a sentence or two, asks one thing at a time, and never repeats a question you already answered. When you give your number, it reads it back digit by digit. When you are closed, it says so and offers another time. If your test call sounds like that, you are ready.'),
      s('Red flags to fix before launch', [
        'It quotes a price you no longer charge',
        'It says a service is not offered when you do offer it',
        'Answers are long paragraphs instead of short sentences',
        'It does not know your location or parking',
        'Your greeting is skipped because it is in a different language',
      ]),
    ],
  },
  'bookings-dashboard-whatsapp': {
    sections: [
      s('Handling a busy day',
        'On a busy day the bookings list is your plan. Glance at it before each customer to see what is next. If someone is running late, message them from the booking instead of hunting for their number. If a gap appears because of a cancellation, you know immediately and can fill it with a walk in.'),
      s('Using your bookings to bring customers back',
        'Your bookings are also a list of real customers with real phone numbers. A short WhatsApp message a few weeks after a visit, such as "Time for your next trim?", brings regulars back. Keep it occasional and personal; customers who feel spammed stop replying.'),
    ],
  },
  'call-transcripts-and-recordings': {
    sections: [
      s('A fifteen minute weekly review',
        'Once a week, open your calls list and read five calls: two that ended in a booking, two that did not, and one that was unusually long. The booked calls show what works. The others show where customers dropped off. The long one usually reveals a confusing answer.',
        'Write down one change from each review, make it in the dashboard, and move on. Small weekly changes add up quickly.'),
      s('Settling "but I said" moments',
        'Occasionally a customer arrives saying they booked a different time or service. The transcript shows exactly what was said and confirmed, which settles the question politely and quickly, and shows you whether the information behind the receptionist needs a fix.'),
      s('Training your own staff',
        'Transcripts are also useful for training. New staff can read real conversations to learn what customers ask, which services they confuse and how prices are explained.'),
    ],
  },
  'how-talkbalt-handles-rude-callers': {
    sections: [
      s('Why one warning is the right number',
        'Ending a call on the first rude word would cut off customers who swear out of habit or frustration and then ask a real question. Never ending it would let a caller waste your usage and keep testing. One calm redirect, one clear warning and then a firm end is how good human receptionists handle it, and it is how Talkbalt does too.'),
    ],
  },
  'what-talkbalt-does-not-do': {
    sections: [
      s('Workarounds that businesses use today',
        'Several businesses already work around these limits. A salon with two stylists makes only one stylist bookable through Talkbalt and keeps the other for walk ins. A clinic sends confirmations from the WhatsApp button every evening. A business with a busy phone line keeps answering it and puts its Talkbalt link on its WhatsApp away message, so calls it misses still have somewhere to go.'),
      s('How to tell us what you need',
        'If a missing feature is stopping you from using Talkbalt, tell us. Features are prioritised by how many businesses need them, and real examples help most: what your customers ask for, and what you do today instead.'),
    ],
  },
};
