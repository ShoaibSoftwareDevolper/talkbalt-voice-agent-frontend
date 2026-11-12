import { type Extra, s } from '../types';

export const PRODUCT_EXTRA_2: Record<string, Extra> = {
  'add-the-widget-to-your-website': {
    sections: [
      s('Where on the page to place it',
        'Most businesses keep the button in the bottom right corner, where visitors expect chat and call buttons to be. Choose the left side if your website already has a WhatsApp or chat bubble on the right, so the two do not sit on top of each other. On phones, check that the button does not cover your own menu or a "back to top" arrow.',
        'Keep the button text short and clear. Two or three words work best on a small screen: "Book by voice", "Call us now" or "Start your call". Longer text gets cut off or wraps awkwardly.'),
      s('Pages where the button helps most',
        'The button appears on every page that loads the snippet, but some pages convert better than others. Your services and prices page is where visitors decide, so the button there catches people at the right moment. Your contact page is where people go when they already want to talk. Your home page catches visitors who arrive from Google and want a quick answer.',
        'If your website has a separate booking page with a form, consider replacing the form with a short line pointing to the call button. A form asks the visitor to wait for you; the button gets them booked now.'),
      s('Common problems and fixes', [
        'The button does not appear: check the snippet is inside the page body and saved on every page, and clear any website cache plugin',
        'The microphone does not start: the visitor may have blocked it earlier in their browser settings; reloading and allowing it fixes this',
        'The colour clashes with your site: pick a colour from your logo in the dashboard and save; the button updates without a new snippet',
        'The button covers something important on phones: switch it to the other side of the screen',
      ]),
      s('Telling visitors it is there',
        'A floating button is easy to miss on a busy page. Add one sentence near your prices or contact details: "Press the call button to ask a question or book by voice, any time." Visitors who know the button talks back are far more likely to press it.'),
    ],
  },
  'how-talkbalt-avoids-double-bookings': {
    sections: [
      s('An example of two callers',
        'Imagine two customers open your link within seconds of each other on a Saturday morning, and both ask for 4 pm. The first to confirm all their details gets the 4 pm booking. When the second confirms a moment later, the database refuses the overlap. The receptionist does not say "sorry, try again later". It tells the second customer that 4 pm has just been taken and offers the nearest free times, such as 3 pm or 5:30 pm, and books one of those if they agree.',
        'Neither customer is ever told they are booked when they are not, because the receptionist only confirms a booking after the database has accepted it.'),
      s('Why this cannot be left to the AI',
        'An AI language model is good at conversation but should not be trusted to remember every booking across many simultaneous calls. It might say a slot is free because it sounded free earlier in the conversation. That is why Talkbalt keeps the final check outside the AI, in the database, where it is the same for every call and cannot be talked around.'),
      s('Getting the most out of it', [
        'Set realistic durations for every service, including preparation and cleanup',
        'Cancel bookings in the dashboard as soon as customers cancel, so the slot is free again',
        'Make sure your staff check the Talkbalt list before promising a time by hand',
        'Update your hours when you close unexpectedly, so no new bookings land on that day',
      ]),
    ],
  },
  'bookings-dashboard-whatsapp': {
    sections: [
      s('What to do with no shows',
        'Every business gets no shows. When a customer does not arrive, message them from the booking a few minutes after their time. Many simply forgot or got stuck in traffic and will reschedule. If they do not reply, cancel the booking so your list stays accurate. Over time, the bookings list shows you which days and times have the most no shows, so you can send reminders for those more carefully.'),
      s('Sharing the list with your team',
        'Small teams often work from one phone or one computer at the counter. Keep the bookings page open there during the day so whoever is free can see who is next, message a late customer or cancel a booking. One shared list avoids the most common problem in small businesses: two people giving out the same slot from memory.'),
      s('Keeping customer data respectful',
        'Customer numbers in your bookings are for following up on their booking. Use them for confirmations, reminders and the occasional friendly message about their next visit. Avoid adding customers to broadcast lists or sharing their numbers outside your business. Customers who trust you with their number come back.'),
    ],
  },
  'call-transcripts-and-recordings': {
    sections: [
      s('Spotting calls that almost booked',
        'Some of the most useful calls to read are the ones that ended without a booking. Look for where the customer stopped engaging. Did they hear a price and go quiet? Did they ask for a time you do not open? Did they ask for a service you do not list? Each of those is a booking you nearly made, and the fix is usually a small change to your information or your hours.'),
      s('What not to worry about',
        'Transcripts are written by a speech recognition system, so you will sometimes see a misspelled name or an odd word where the caller was unclear. That is normal and does not mean the receptionist misunderstood; the booking details are checked separately. Focus on the overall flow of the conversation rather than individual words.'),
    ],
  },
  'test-call-before-launch': {
    sections: [
      s('Test the edge cases customers create',
        'Real customers do things you will not expect. Try a few of them in your test: change your mind about the service halfway through, give the day before the time, say "hello?" in the middle as if the line dropped, interrupt the receptionist while it is talking, or say "no" when asked for your number. A good receptionist handles each of these calmly, and seeing it handle them gives you confidence before real customers try.'),
      s('Ask someone who does not know the business',
        'You know your own services too well to test like a newcomer. Ask a friend or relative who has never been to your business to call and try to book something. They will use different words, ask basic questions you forgot to answer, and reveal gaps in your FAQs that you would never notice yourself.'),
    ],
  },
  'how-talkbalt-handles-rude-callers': {
    sections: [
      s('What it sounds like in practice',
        'A caller opens with an insult. The receptionist replies with something like "I am here to help with Glow Salon. How can I help you today?" and nothing more. If the next message is another insult, it says "I can only continue if we keep the conversation respectful, otherwise I will need to end the call. Do you need help with a booking?" If the caller carries on, the call ends.',
        'If, instead, the caller says "sorry, I was joking, how much is a haircut?", the conversation simply continues normally. The receptionist does not hold a grudge or mention it again.'),
      s('What you can do as the owner',
        'You do not need to do anything for most abusive calls; they end on their own and are marked in your calls list. If you notice the same pattern again and again, such as many prank calls late at night, you can switch public calls off temporarily from your dashboard while you deal with it.'),
    ],
  },
  'what-talkbalt-does-not-do': {
    sections: [
      s('What it will never do',
        'Some things are not missing features but deliberate choices. Talkbalt will never claim to be a person, never invent prices or services to please a caller, never confirm a booking that the system has not accepted, and never give medical, legal or financial advice. Those rules protect your customers and your reputation, and they will stay in place as new features arrive.'),
    ],
  },
  'opening-hours-setup': {
    sections: [
      s('Hours and walk ins',
        'Your bookable hours do not have to be all the hours you are open. Some businesses make only part of the day bookable through Talkbalt, such as evenings and weekends, and keep quieter mornings for walk ins. Others make every open hour bookable and fit walk ins into gaps. Choose what suits the way your customers actually arrive, and adjust after a few weeks of watching your bookings list.'),
    ],
  },
  'choosing-a-receptionist-voice': {
    sections: [
      s('When to revisit your choice',
        'Revisit your voice when something about your business changes: you open a ladies only section, you start serving more international customers and switch the language to English, or you rebrand. A quick listen to the samples again, followed by a test call, is enough to decide whether your current voice still fits.'),
    ],
  },
  'public-booking-link': {
    sections: [
      s('Printing your link',
        'For printed material, a QR code is easier than a written link. Generate one from your link with any free QR tool, test it with a couple of phones, and print it on your visiting cards, receipts, counter stand or shop window. Add a short line next to it so people know what scanning does.'),
    ],
  },
  'services-and-prices-setup': {
    sections: [
      s('Descriptions are optional but useful',
        'Each service can also have a short description. Use it for what customers need to know before booking, such as "includes wash and blow dry" or "please arrive with clean hair". Keep it to one sentence; long descriptions are rarely read and harder to say aloud.'),
    ],
  },
  'set-up-ai-receptionist-in-ten-minutes': {
    sections: [
      s('If you get stuck',
        'If a step is unclear, skip it and come back. The checklist on your overview shows what is left. The only steps that must be done before sharing your link are services, hours and a test call.'),
    ],
  },
  'business-info-form-guide': {
    sections: [
      s('Keep it current', 'Moved to a new floor, changed your parking arrangement or stopped accepting cards? Update the same day. Outdated information is the most common reason customers lose trust in a receptionist.'),
    ],
  },
};
