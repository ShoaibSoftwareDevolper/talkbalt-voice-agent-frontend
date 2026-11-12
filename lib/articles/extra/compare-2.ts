import { type Extra, s } from '../types';

export const COMPARE_EXTRA_2: Record<string, Extra> = {
  'ai-receptionist-vs-call-center': {
    sections: [
      s('A side by side view', [
        'Setup: call center needs contracts, scripts and training; AI receptionist needs your business information',
        'Knowledge: call center agents handle many businesses; AI receptionist knows yours exactly',
        'Availability: call centers run shifts; AI receptionist answers at any hour',
        'Cost: call centers charge for agent time and minimums; AI receptionist charges by usage',
        'Judgment: call center agents can handle unusual cases; AI receptionist sticks to what it knows',
      ]),
      s('Pakistani context',
        'Pakistan has a large call center industry serving local and international clients, mostly large companies. For a small business in Lahore or Karachi, those services are usually out of reach or overkill. A dedicated AI receptionist gives a small business the responsiveness of a large company without the overhead.'),
      s('An example',
        'A physiotherapy clinic considers outsourcing calls to an answering service. The service would read from a sheet of notes and call the clinic to check availability. With an AI receptionist, the clinic hours and services are already known, availability is checked instantly and bookings are confirmed on the call. For the clinic, the receptionist is simpler, faster and more accurate.'),
    ],
  },
  'ai-receptionist-vs-chatbot': {
    sections: [
      s('An example of the same booking',
        'By chatbot: the customer clicks "Book", chooses a service from a list, picks a date from a calendar, picks a time, types a name, types a phone number and presses confirm. By voice: the customer says "kal shaam paanch baje facial book karna hai", gives a name and a number, hears it read back and is booked. Both work. For customers comfortable speaking, voice is usually quicker and feels more personal.'),
      s('Accessibility',
        'Voice helps customers who find small screens or typing difficult, including older customers and people with limited literacy. A business that offers voice booking serves a wider audience than one that offers only forms and chat.'),
      s('Combining both on a website',
        'Many websites show prices and information for browsing, a call button for voice booking, and a WhatsApp link for messages. Customers choose the channel that suits them, and each channel does what it does best.'),
    ],
  },
  'ai-receptionist-vs-virtual-receptionist': {
    sections: [
      s('Which to choose', [
        'Mostly routine calls about prices, timings and bookings: an AI receptionist',
        'Complex calls needing judgment or negotiation: a human virtual receptionist',
        'Urdu speaking customers: an AI receptionist with natural Urdu',
        'Very low call volume with high value calls: a human may be worth it',
      ]),
      s('Using both',
        'Some businesses use an AI receptionist for all calls and forward unusual requests to a person through an FAQ that explains how to reach the team. That keeps costs low while preserving a human route for the few calls that need it.'),
    ],
  },
  'ai-receptionist-cost': {
    sections: [
      s('An example monthly estimate',
        'A salon receives about 300 calls a month, averaging two and a half minutes each, which is 750 minutes. If an AI receptionist plan includes that many minutes for a fixed monthly fee, the cost is predictable. If 60 of those calls become bookings worth Rs 3,000 on average, they represent Rs 180,000 of bookings, many of which would have been missed without an answer. Your own numbers will differ, but the method is the same.'),
      s('Keeping costs down', [
        'Keep FAQs short so answers are brief',
        'Keep service names simple so calls do not drag',
        'Share your prices on your public page so callers arrive informed',
        'Watch usage on your dashboard and adjust your plan if needed',
      ]),
    ],
  },
  'ai-receptionist-vs-human-receptionist': {
    sections: [
      s('Cost in Pakistani terms',
        'A full time receptionist in Pakistan costs a monthly salary plus extras such as leave, Eid bonuses and training. An AI receptionist usually costs a monthly fee based on usage. For many small businesses the AI receptionist is cheaper, but the better question is what each brings in. A human who builds relationships with regulars and an AI that never misses a call both have value.'),
      s('The combined approach in practice', 'Your receptionist greets customers and handles payments; the AI handles phone bookings and after hours. Your receptionist starts each day with the bookings list the AI filled overnight.'),
    ],
  },
  'what-is-an-ai-voice-agent': {
    sections: [
      s('Glossary', [
        'Speech recognition: turning spoken words into text',
        'Language model: the AI that decides what to say',
        'Text to speech: turning text into a natural voice',
        'Turn detection: knowing when the caller has finished speaking',
        'Transcript: the written record of the call',
      ]),
      s('Choosing one for your business', 'Look for natural speech in your customers language, short replies, honesty, confirmed details and records of every call. Test it yourself before relying on it.'),
    ],
  },
};
