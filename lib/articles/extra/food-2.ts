import { type Extra, s } from '../types';

export const FOOD_EXTRA_2: Record<string, Extra> = {
  'restaurant-faqs-for-receptionist': {
    sections: [
      s('A starter set of FAQs you can adapt', [
        'Timings: "We are open daily from 12 pm to 12 am; on Friday we open at 2 pm."',
        'Family area: "We have a separate family hall on the first floor."',
        'Parking: "Free parking for 20 cars in front; valet on weekends."',
        'Delivery: "We deliver within 5 km; order on our website or delivery apps."',
        'Payment: "We accept cash and all cards."',
        'Cake policy: "You are welcome to bring a cake; we can store it in our fridge."',
        'Children: "High chairs and a kids menu are available."',
        'Prayer area: "There is a prayer area on the ground floor."',
      ]),
      s('Who benefits most',
        'Restaurants that receive many calls asking the same questions benefit most: popular family restaurants, places with outdoor seating that depends on weather, and restaurants in busy areas where parking is a common concern. Every one of those calls answered by the receptionist is a moment your staff can spend serving guests.'),
      s('Menus and prices',
        'If guests often ask about prices of popular dishes or deals, add them as products with prices. The receptionist can then answer "how much is the family platter?" accurately. Keep this list short, with your most asked about items, rather than your whole menu.'),
    ],
  },
  'banquet-hall-viewings': {
    sections: [
      s('Why venues lose bookings',
        'Venue managers are often busy running events, especially in the evenings and on weekends, which is exactly when families call to enquire. A call that goes unanswered on a Saturday night may be the family that would have booked a Rs 2 million event. A receptionist that answers every enquiry, explains capacity and packages and books a viewing protects those high value bookings.'),
      s('Setting up a venue on Talkbalt', [
        'Services: venue viewing (30 to 45 minutes), menu tasting',
        'Products: per head menu packages with prices, decor packages',
        'FAQs: hall capacities, parking, separate seating, timings allowed by law, advance policy',
        'Hours: the times your manager can show the venue',
      ]),
      s('Making viewings count',
        'Before each viewing, read the call transcript so you know the event type, expected guests and preferred dates. Families notice when you remember what they asked, and it makes your venue feel organised and attentive, which is exactly what they want for their event.'),
    ],
  },
  'catering-enquiries': {
    sections: [
      s('Corporate catering',
        'Offices order lunches, iftar boxes and event catering regularly. Administrators often call several caterers and choose the one who responds clearly first. A receptionist that answers menu and pricing questions immediately and books a tasting or consultation puts you first in line. Once an office is happy, it often orders again and again.'),
      s('Setting up a catering business', [
        'Products: per head menus, boxed meals, live stations, with prices',
        'Services: tasting session, catering consultation',
        'FAQs: minimum guests, areas served, staff and crockery, advance policy, notice required',
        'Hours: when consultations and tastings can be booked',
      ]),
    ],
  },
};
