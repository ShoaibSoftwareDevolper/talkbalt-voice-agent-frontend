import { type Extra, s } from '../types';

export const FOOD_EXTRA: Record<string, Extra> = {
  'catering-enquiries': {
    sections: [
      s('Why catering enquiries are lost',
        'Catering calls usually come from someone organising an event with many decisions to make: a wedding, a corporate lunch, a family dawat. They call several caterers in one sitting, often in the evening after work. If your manager is at an event or in the kitchen, the call goes unanswered, and the organiser moves on to the next caterer on the list. Unlike a restaurant table, a catering order can be worth hundreds of thousands of rupees, so each lost enquiry hurts.'),
      s('What to put in your services and FAQs', [
        'Per head menus as products, such as "Wedding menu A (per head)" with a price',
        'Minimum number of guests for each menu',
        'Areas and cities you serve, and any delivery charge',
        'Whether you provide serving staff, crockery and tables',
        'How far in advance orders must be confirmed',
        'Advance payment and cancellation policy',
        'Whether you offer tasting sessions, and their cost',
      ]),
      s('An example catering call',
        [
          'Caller: Hamein agle mahine 200 logon ki dawat ke liye catering chahiye. Per head kitna hoga?',
          'Receptionist: Hamara standard menu dedh hazaar rupay per head se shuru hota hai, aur premium menu do hazaar paanch sau rupay per head. Kya aap tasting ya consultation book karna chahenge, taake hamare manager aap se details discuss kar saken?',
          'Caller: Ji, consultation.',
          'Receptionist: Is Saturday shaam paanch baje ka waqt khali hai. Kya woh theek rahega?',
        ]),
      s('Making consultations productive',
        'Before each consultation, read the call transcript. You will know the event size, date and menu interest before the client arrives, which makes the meeting shorter and more focused. Clients notice when you already understand what they need.'),
      s('Seasons for catering',
        'Wedding season, Ramadan iftar events and the end of the financial year for corporate events are the busiest catering periods. Update your menus and prices before each season, and share your booking link with corporate clients and event planners who book often.'),
    ],
    faqs: [
      { q: 'Can the receptionist confirm a catering order?', a: 'It books a tasting or consultation. Final menus, quantities and payments are agreed by your team.' },
    ],
  },
  'banquet-hall-viewings': {
    sections: [
      s('How families choose a venue',
        'Families usually shortlist venues by location, capacity and per head price, then visit two or three before deciding. The visit is where the decision is made. Venues that make viewing easy, answer questions clearly and follow up quickly get chosen more often. A receptionist that books viewings at any hour, including late at night when families discuss plans, keeps your venue on the shortlist.'),
      s('An example viewing call',
        [
          'Caller: Hamein February mein walima ke liye hall dekhna hai. Capacity kitni hai?',
          'Receptionist: Hamare main hall ki capacity aath sau mehmanon ki hai, aur chhote hall ki teen sau. Kya aap hall dekhne ke liye waqt book karna chahenge?',
          'Caller: Ji, Sunday ko.',
          'Receptionist: Sunday dopahar teen baje ka waqt khali hai. Aap ka naam kya hai?',
        ]),
      s('What to include in your information', [
        'Each hall name and guest capacity',
        'Per head menu packages as products with prices',
        'Parking capacity and valet availability',
        'Decor packages and whether outside decorators are allowed',
        'Separate seating arrangements for men and women',
        'Advance booking amount and cancellation policy',
        'Government time limits on functions, if they apply in your city',
      ]),
      s('Following up after a viewing',
        'Families visit several venues in a weekend. Send a short WhatsApp message after their viewing thanking them, summarising the package they liked and inviting questions. The venue that follows up personally is often the one families remember.'),
      s('Peak dates',
        'Popular wedding dates sell out months in advance. When families ask about a date, your team confirms availability after the viewing. Make sure your FAQs explain that dates are confirmed with an advance payment, so families understand the next step.'),
    ],
  },
  'restaurant-faqs-for-receptionist': {
    sections: [
      s('Why FAQs matter even before reservations',
        'Most calls to a restaurant are not reservations. They are questions: are you open, where are you, do you have parking, do you deliver, is there a family area. These calls take staff away from the floor at the busiest times. A receptionist that answers these questions instantly, from your FAQs, saves staff time even if you take reservations another way.'),
      s('Writing answers guests understand',
        'Be specific. "Yes, we have parking" is less useful than "Free parking for about 20 cars in front, and valet on weekends." "We deliver" is less useful than "We deliver within 5 km; order through our website or call our delivery number." Specific answers end the conversation quickly and leave guests confident.'),
      s('An example of FAQs in action',
        [
          'Guest: Aap ke yahan family hall hai?',
          'Receptionist: Ji, pehli manzil par alag family hall hai.',
          'Guest: Parking?',
          'Receptionist: Saamne bees gaariyon ki free parking hai, aur weekends par valet bhi hai.',
        ]),
      s('Updating FAQs through the year', [
        'Ramadan: iftar and sehri timings, deals, prayer area',
        'Summer: outdoor seating availability, AC',
        'Winter: rooftop or BBQ nights',
        'Holidays: special timings for Eid and national holidays',
      ]),
      s('A note on reservations',
        'Talkbalt currently books one appointment per time slot for the whole business, which suits private dining rooms, tasting sessions or event bookings better than everyday table reservations. Support for several bookings at once is planned. Until then, many restaurants use the receptionist mainly for questions, and handle table reservations directly.'),
    ],
  },
};
