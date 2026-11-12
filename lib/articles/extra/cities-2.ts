import { type Extra, s } from '../types';

export const CITIES_EXTRA_2: Record<string, Extra> = {
  'ai-receptionist-karachi': {
    sections: [
      s('Setting up for Karachi customers',
        'Write your address the way Karachiites give directions: block, area and a well known landmark, such as "Block 2, Clifton, behind the Do Talwar roundabout". Mention parking honestly, because in many commercial areas it is the deciding factor. Set evening hours if you have them; many Karachi customers can only come after office. Choose Urdu for most neighbourhood businesses and English if your customers mostly write to you in English. Then put your link on Google Maps, where most Karachi customers start their search.'),
      s('Karachi seasons to prepare for',
        'Ramadan changes Karachi routines more than most cities, with late night activity after taraweeh and busy chaand raat markets. Wedding season peaks in the cooler months. Monsoon rains can disrupt travel and appointments for a few days at a time. Update your hours and FAQs ahead of each, and message booked customers on WhatsApp when rain or disruptions affect your timings.'),
    ],
    faqs: [
      { q: 'Does Talkbalt work for businesses in Karachi?', a: 'Yes. Customers anywhere in Karachi can open your link and talk to your receptionist from their phone browser, in Urdu or English.' },
      { q: 'Can customers ask about parking in my area?', a: 'Yes, if you add a parking FAQ. The receptionist answers it in one sentence on every call.' },
    ],
  },
  'ai-receptionist-lahore': {
    sections: [
      s('Setting up for Lahore customers',
        'Lahore customers navigate by main roads and well known markets: Main Boulevard, MM Alam Road, Liberty, Model Town Link Road, Johar Town blocks. Use them in your address. If you have branches, consider separate Talkbalt accounts per branch so each has its own hours, services and bookings. Choose Urdu for most businesses; Lahore callers mix in Punjabi and English, and an Urdu receptionist understands that mix well.'),
      s('Winter, smog and timing changes',
        'Lahore winters bring smog, and sometimes official changes to working hours or school timings. Customers adjust their plans quickly. When your timings change, update them the same day so the receptionist books correctly, and add a short FAQ so callers hear the reason.'),
    ],
    faqs: [
      { q: 'Is Talkbalt suitable for Lahore bridal studios?', a: 'Yes. Bridal packages and trials can be added as services, and the receptionist answers package questions and books trials at any hour.' },
      { q: 'Do I need a separate setup for each branch?', a: 'Each branch has different hours and bookings, so a separate account per branch keeps things clear.' },
    ],
  },
  'ai-receptionist-islamabad': {
    sections: [
      s('Setting up for Islamabad customers',
        'Use the sector and markaz in your address, such as "F-10 Markaz, near the main roundabout", and mention whether you are on the ground floor. Islamabad customers often book further ahead than in other cities, so make sure your hours for the coming weeks are correct. If you serve international customers, write your FAQs in clear English so the receptionist can answer precisely.'),
      s('Government and office hours',
        'Many Islamabad customers work in offices with fixed hours. Early morning, lunch time and evening slots are in demand. If you can offer them, set them in your hours and mention them in your FAQs; they are often the first slots to fill.'),
    ],
    faqs: [
      { q: 'Can the receptionist speak English for international clients?', a: 'Yes. Choose English as the receptionist language, and it still understands Urdu callers.' },
      { q: 'Can customers book weeks in advance?', a: 'Yes. Customers can book any future day you are open.' },
    ],
  },
  'ai-receptionist-rawalpindi': {
    sections: [
      s('Setting up for Rawalpindi customers',
        'Name the road, chowk or market people know, such as Saddar, Commercial Market, Chandni Chowk or a Bahria Town phase. Mention parking, which is difficult in many older parts of the city. Choose a polite Urdu voice, and set your hours carefully around Friday prayers if you close then.'),
      s('Busy markets and peak days',
        'Weekends and the days before Eid turn markets into crowds. Customers who can book a specific time avoid the crowd and arrive when you are ready for them. Promote your booking link before those days so the busiest times are planned rather than chaotic.'),
    ],
    faqs: [
      { q: 'Will older customers be comfortable with it?', a: 'The receptionist speaks polite Urdu, asks one question at a time and reads numbers back slowly, which suits customers of every age.' },
      { q: 'Can customers from Islamabad book too?', a: 'Yes. Anyone with your link can book, wherever they are.' },
    ],
  },
  'ai-receptionist-faisalabad': {
    sections: [
      s('Setting up for Faisalabad customers',
        'Describe your location by bazaar, main road or a well known landmark. Choose Urdu for most businesses. If your customers include factory workers on shifts, consider early morning or late evening hours, and mention them in your FAQs; many workers can only come outside their shift.'),
      s('Growing beyond word of mouth',
        'Many Faisalabad businesses grew entirely through word of mouth. Adding a booking link to your WhatsApp profile and Google listing lets those recommendations turn into bookings immediately, even when a friend passes on your link late at night.'),
    ],
    faqs: [
      { q: 'Can patients from nearby towns book in advance?', a: 'Yes. They can book any day you are open and arrive at a confirmed time.' },
      { q: 'Does it understand Punjabi?', a: 'It understands Urdu, including Urdu spoken with a Punjabi accent. Punjabi itself is not supported yet.' },
    ],
  },
  'ai-receptionist-multan': {
    sections: [
      s('Setting up for Multan customers',
        'Use main roads, chowks and well known hospitals or markets in your address. If patients often travel from other districts, add FAQs about nearby accommodation, transport and what to bring. Choose a calm Urdu voice, and update your hours for summer and Ramadan.'),
      s('Education and test season',
        'Multan academies see heavy demand before entry tests and board exams. Update fees and batch timings before each season, and share your booking link with parents and students so demo classes are booked in an orderly way.'),
    ],
    faqs: [
      { q: 'Can patients from other districts book before travelling?', a: 'Yes. They can check timings and fees and book a confirmed slot at any hour.' },
      { q: 'Does it support Saraiki?', a: 'Not yet. Many Saraiki speakers are comfortable in Urdu, which the receptionist speaks and understands.' },
    ],
  },
  'ai-receptionist-peshawar': {
    sections: [
      s('Setting up for Peshawar customers',
        'Use Hayatabad phase and sector numbers, or the road and landmark for the city centre, in your address. Be specific about women only services, female staff and separate waiting areas. Choose a voice your customers will be comfortable with and keep your greeting short and respectful.'),
      s('Students and academies',
        'Peshawar has a large student population. Academies and test preparation centres can list course fees as products and demo classes as services, and share the link in student groups before admission seasons.'),
    ],
    faqs: [
      { q: 'Does the receptionist speak Pashto?', a: 'Not yet. It speaks and understands Urdu, Hindi and English.' },
      { q: 'Can I mention female staff?', a: 'Yes. Add it to your FAQs and the receptionist tells callers when they ask.' },
    ],
  },
  'ai-receptionist-hyderabad': {
    sections: [
      s('Setting up for Hyderabad customers',
        'Use the unit, road and nearby landmark in your address, especially in Latifabad, Qasimabad and Saddar. Choose Urdu for most businesses. If many customers travel in from other towns, add FAQs about parking and the best route from the bypass or main roads.'),
      s('Wedding and Eid demand',
        'Hyderabad parlours, tailors and boutiques see strong demand before weddings and Eid. Update deadlines and seasonal packages early, and share your link on WhatsApp so customers can book before the rush.'),
    ],
    faqs: [
      { q: 'Does it speak Sindhi?', a: 'Not yet. It speaks and understands Urdu, Hindi and English.' },
      { q: 'Can customers from Karachi book with me?', a: 'Yes. Anyone with your link can book from anywhere.' },
    ],
  },
  'ai-receptionist-sialkot-gujranwala': {
    sections: [
      s('Setting up for Sialkot and Gujranwala customers',
        'Describe your location with the main road, chowk or cantonment area people know. If relatives abroad often book for your customers, consider English as the receptionist language, or keep Urdu and add clear English FAQs. Set your hours around Friday prayers if you close then.'),
      s('Export businesses and visitors',
        'Some businesses in these cities host international buyers and visitors. Salons, clinics and restaurants near business areas can benefit from an English receptionist for those customers, while still understanding local callers in Urdu.'),
    ],
    faqs: [
      { q: 'Can relatives abroad book for family in Sialkot or Gujranwala?', a: 'Yes. They can open your link from any country and book in Pakistani time.' },
      { q: 'Which language should I choose?', a: 'Urdu for most local businesses; English if many callers are abroad or international.' },
    ],
  },
  'ai-receptionist-quetta': {
    sections: [
      s('Setting up for Quetta customers',
        'Use the road, area and a well known landmark in your address, such as Jinnah Road or a nearby hospital. Add FAQs for travelling patients about timings, what to bring and nearby accommodation. Update your hours for winter, when many businesses close earlier.'),
      s('Serving patients after long journeys',
        'Patients who travel for hours want certainty that the doctor will see them. A receptionist that confirms timings, books a slot and reads the patient number back means your team can reach them if anything changes before they set off.'),
    ],
    faqs: [
      { q: 'Does it speak Pashto or Balochi?', a: 'Not yet. It speaks and understands Urdu, Hindi and English.' },
      { q: 'Can patients from other districts book ahead?', a: 'Yes. They can book any day you are open, at any hour.' },
    ],
  },
};
