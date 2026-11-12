import { type Extra, s } from '../types';

export const SALONS_EXTRA_2: Record<string, Extra> = {
  'spa-and-massage-booking': {
    sections: [
      s('Booking flow for a first time guest',
        'A first time guest usually calls with uncertainty. They are not sure which massage to choose, how long it should be, or what happens when they arrive. The receptionist can describe each treatment from your service descriptions and FAQs, suggest the shortest option for a first visit if your FAQs say so, and book it. Then it asks for the guest name and number and reads the number back. The guest ends the call knowing the treatment, the time and the price, which removes most of the nervousness before they arrive.',
        'After the booking, a short WhatsApp message from your spa with your location, parking information and what to bring makes the first visit smooth. Guests who have a calm first visit are the ones who come back monthly.'),
      s('Therapist availability',
        'Spa bookings depend on therapists and rooms. Because Talkbalt books one appointment per time slot for the whole business today, a spa with several therapists working in parallel can make one therapist or one room bookable through Talkbalt and handle the others directly. As bookings grow, many spas use the receptionist for the busiest evenings and weekends, when calls are hardest to answer.'),
      s('Questions to answer in your FAQs', [
        'Is there a separate area or timing for women?',
        'Will my therapist be male or female?',
        'Do you provide robes, towels and slippers?',
        'Can I shower after the treatment?',
        'What is your late arrival and cancellation policy?',
        'Do you sell gift vouchers?',
      ]),
    ],
  },
  'barber-shop-booking': {
    sections: [
      s('An example call for a barber shop',
        [
          'Customer: Bhai, aaj shaam saat baje haircut ho jayega?',
          'Receptionist: Saat baje ka waqt pehle se book hai. Saarhe saat ya aath baje khali hain. Kaun sa theek rahega?',
          'Customer: Aath baje.',
          'Receptionist: Theek hai. Aap ka naam kya hai?',
          'Customer: Bilal.',
          'Receptionist: Bilal bhai, aap ka number bata dein?',
        ]),
      s('Why regulars love booking',
        'A regular customer who comes every two or three weeks hates the queue more than anyone, because he knows exactly what he wants and how long it takes. Being able to book a fixed time, from his phone, without calling and waiting, turns a weekly chore into a quick stop on the way home. Many barbers find their regulars start booking the same day and time every visit, which makes the week more predictable for everyone.'),
      s('Keeping the shop friendly to walk ins',
        'Some customers will always walk in, and that is fine. A simple sign that says "Booked customers are served at their time; walk ins fill the gaps" sets expectations. Your barber can glance at the bookings list on the counter phone to see how long the next gap is and tell walk ins honestly how long they will wait.'),
      s('Pricing tips for barbers', [
        'List combined services, such as haircut and beard, with a combined price and duration',
        'If the senior barber charges more, create separate services for him',
        'Add kids haircuts with a shorter duration',
        'Mention any extras, such as hot towel or massage, as their own services',
      ]),
    ],
  },
  'salon-price-list-online': {
    sections: [
      s('Price lists and trust',
        'Pakistani clients are used to discovering the real price only at the counter, often higher than expected. A salon that publishes clear prices and sticks to them stands out. Clients feel respected, compare with confidence and arrive already decided. Clear prices also protect your staff from awkward arguments at the end of a service, because the price was agreed before the client sat down.'),
      s('Handling services priced after consultation',
        'Colour corrections, extensions and some treatments genuinely depend on the client hair or skin. For these, list a consultation as a bookable service, with a short duration and a small charge or no charge, and explain in your FAQs that the treatment price is confirmed after the consultation. The receptionist then books the consultation and explains the process, instead of quoting a number that might be wrong.'),
      s('Updating prices without confusion', [
        'Change the price in your services list first',
        'Update any printed list at the counter on the same day',
        'Update Instagram highlights and pinned posts',
        'Honour old prices for bookings already made, if that is your policy, and say so in your FAQs',
      ]),
      s('Using price lists to sell more',
        'A well organised price list naturally suggests add ons. A client booking a haircut sees the blow dry next to it. A client booking a facial sees threading. Place related services next to each other with clear durations, and clients often add a second service on their own.'),
    ],
  },
  'home-salon-service-booking': {
    sections: [
      s('An example booking call for home service',
        [
          'Customer: Kya aap ghar par facial karti hain? Main Bahria Town mein hoon.',
          'Receptionist: Ji, hum Bahria Town mein ghar par service deti hain. Ghar par facial dedh ghante ka hota hai aur us ki fees paanch hazaar rupay hai, travel charge alag. Kya aap waqt book karna chahengi?',
          'Customer: Haan, Sunday subah gyarah baje.',
          'Receptionist: Sunday gyarah baje ka waqt khali hai. Aap ka naam kya hai?',
        ]),
      s('What the receptionist does not collect',
        'The receptionist books the time and takes the name and phone number. It does not ask for the full home address on the call, which keeps the call short and keeps sensitive information off the transcript. You collect the exact address and a location pin on WhatsApp after the booking, where the client can share it easily and you can save it with the conversation.'),
      s('Safety habits that build a good business', [
        'Confirm every new client on WhatsApp before the visit',
        'Share your live location with a family member during visits',
        'Visit new clients during daylight where possible',
        'Keep a simple record of visits in your bookings list',
      ]),
    ],
  },
  'nail-studio-bookings': {
    sections: [
      s('An example nail booking call',
        [
          'Client: Gel extensions ka full set kitne ka hai?',
          'Receptionist: Gel extensions ka full set chhe hazaar rupay ka hai aur takreeban do ghante lagte hain. Kya aap book karna chahengi?',
          'Client: Ji, Friday shaam paanch baje.',
          'Receptionist: Friday paanch baje ka waqt khali hai. Aap ka naam kya hai?',
        ]),
      s('Late arrivals and long services',
        'A client who arrives 30 minutes late for a two hour set can push your whole evening back. Add a clear late arrival policy to your FAQs, such as "If you are more than 15 minutes late, we may need to shorten the service or rebook." The receptionist can mention it when asked, and you can include it in your confirmation message.'),
      s('Growing a nail studio from Instagram',
        'Nail art is made for Instagram. Post your designs with the service name and price, and keep your booking link in your bio. Clients who see a design they love can book the same evening. Over time, your most popular designs become your best advertising, and your booking list shows which ones bring clients in.'),
    ],
  },
  'salon-instagram-booking-link': {
    sections: [
      s('Why DMs lose bookings',
        'A DM conversation feels personal but works badly for booking. Messages arrive while you are working. By the time you reply, the follower has moved on, and when they reply back, you are busy again. Each round trip loses some people. Followers also feel awkward asking basic questions like price in a DM, so many never ask at all. A link that lets them ask by voice, privately and instantly, removes both problems.'),
      s('Combining DMs and the link',
        'You do not have to stop replying to DMs. Use a quick reply that answers warmly and includes your link: "Thank you for your message. You can ask anything and book by voice here, any time: [link]." Followers who want a personal answer still get one, and those ready to book can do it immediately.'),
      s('Instagram profile checklist', [
        'Booking link in the links section',
        'A bio line explaining how to book',
        'A Book highlight with prices and location',
        'A pinned post about booking by voice',
        'Contact button pointing to WhatsApp for questions',
      ]),
    ],
  },
  'eid-rush-salon-bookings': {
    sections: [
      s('Eid packages that sell',
        'The most popular Eid bookings combine short services into one visit: threading, a quick facial and mehndi, or a haircut with a blow dry. Packages like these are easy for clients to choose and easy to schedule. Add each one as a service with a combined duration and price, and the receptionist can quote and book it as a single appointment instead of three separate ones.'),
      s('Avoiding the chaand raat disaster',
        'Every salon has a story of a chaand raat that went wrong: double bookings, clients waiting three hours, staff in tears at 2 am. The cause is almost always the same: too many promises made by phone and in person, with no single list. A booking system that refuses overlapping bookings and offers the next free time keeps the night under control, even when demand is far higher than your capacity.'),
      s('Communicating clearly with clients', [
        'Post your Eid hours on Instagram and WhatsApp status',
        'Tell clients that booking is recommended and walk ins may wait',
        'Send a reminder the day before to everyone booked for chaand raat',
        'Thank clients after Eid with a short message',
      ]),
    ],
  },
  'how-to-get-more-salon-clients': {
    sections: [
      s('Google reviews and local search',
        'When someone searches "salon near me", Google shows nearby salons ranked partly by reviews and how complete their profile is. A salon with recent, positive reviews, real photos, correct hours and a working booking link has a clear advantage. Asking every happy client for a review, and replying to each one, is one of the cheapest ways to appear higher in local results over time.'),
      s('Partnerships',
        'Nearby businesses share your clients. A boutique, a wedding photographer or a bridal shop can recommend you to their customers, and you can recommend them. Give partners your booking link so their customers can book with you directly, and track how many bookings come through over a few months.'),
    ],
  },
  'beauty-parlour-appointments': {
    sections: [
      s('An example parlour call',
        [
          'Customer: Party makeup kitne ki hai?',
          'Receptionist: Party makeup hairstyling ke saath aath hazaar rupay ki hai. Kya aap book karna chahengi?',
          'Customer: Saturday shaam chaar baje.',
          'Receptionist: Saturday chaar baje ka waqt khali hai. Aap ka naam kya hai?',
        ]),
      s('Opening hours that match demand',
        'Many parlours open late in the morning and stay open late at night, because that is when working women and students can come. Set your hours to match, and consider opening earlier on weekends and before weddings and Eid, when morning bookings are in demand.'),
    ],
  },
  'bridal-makeup-booking-enquiries': {
    sections: [
      s('Handling multiple events for one family',
        'A single wedding often brings bookings for the bride, her sisters and her mother across mehndi, baraat and walima. Ask families to book each person and event separately so each slot is reserved. The bookings list then shows the whole family schedule, and you can message one family contact with all the details.'),
    ],
  },
  'salon-booking-software-pakistan': {
    sections: [
      s('Trying before committing',
        'Whatever you choose, try it with real clients for a few weeks before committing. Share the booking link with your regulars first, watch how many book without help, and read what they say. Real use tells you more than any demo.'),
      s('Data you own',
        'Ask any vendor how you can see and use your own client list. Your client names and numbers are the most valuable asset your salon has. In Talkbalt, every booking is in your dashboard with the client number and a WhatsApp button.'),
    ],
  },
  'ai-receptionist-for-salons': {
    sections: [
      s('Measuring the difference', 'Count calls and confirmed bookings on your overview for the first month. Compare with how many calls you used to miss. That comparison is the clearest answer to whether the receptionist is worth it for your salon.'),
    ],
  },
};
