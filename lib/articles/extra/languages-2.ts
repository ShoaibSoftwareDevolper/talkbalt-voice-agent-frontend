import { type Extra, s } from '../types';

export const LANGUAGES_EXTRA_2: Record<string, Extra> = {
  'natural-urdu-receptionist-tips': {
    sections: [
      s('Handling English heavy industries',
        'Some industries in Pakistan run almost entirely on English terms even when the conversation is in Urdu: dentistry, aesthetics, IT services, car detailing. Words like "scaling", "filler", "ceramic coating" or "root canal" have no everyday Urdu equivalent that customers use. In those businesses, keep every service name in English and let the receptionist build Urdu sentences around them. Customers expect to hear "root canal" in an Urdu sentence, and a forced translation would only confuse them.',
        'On the other hand, everyday words like timings, parking, payment and location sound more natural in Urdu. The receptionist handles that balance for you as long as your service names match what customers actually say.'),
      s('Respectful forms for different customers',
        'Urdu speakers often address older customers with extra respect, using "sahab", "baji" or "aunty" depending on the business. The receptionist keeps a neutral, respectful tone with "aap" and "ji" for everyone, which is safe in every situation. If a customer gives their name, the receptionist may use it politely, which most customers appreciate.'),
      s('Pace and patience',
        'A natural receptionist does not rush. If a customer pauses to think, it waits. If a customer asks it to repeat something, it repeats in simpler words rather than the same sentence again. If a customer is clearly elderly or unsure, short sentences and one question at a time help them follow. Talkbalt is built to work this way by default, and the test call is where you can hear it for yourself.'),
    ],
  },
  'multilingual-receptionist-pakistan': {
    sections: [
      s('A day of calls at one clinic',
        'Picture a family clinic in Rawalpindi on a weekday. In the morning, a retired government officer calls in formal Urdu to ask about the doctor timings. Before lunch, a young mother asks in Roman Urdu style speech, full of English words, whether the clinic sees children. In the afternoon, a son calls from Dubai in English to book a check up for his father. In the evening, a student asks a quick question in Urdu with a Punjabi accent and books a slot.',
        'An English only receptionist would struggle with half of these. An Urdu only one would struggle with the son in Dubai. A receptionist that understands all of them, and answers in the clinic chosen language, handles the whole day without anyone being turned away.'),
      s('Consistency for your brand',
        'Speaking one language does not just help callers; it helps your brand. Every caller hears the same greeting, the same tone and the same way of describing your services. Your transcripts are consistent and easy to review, and your staff know exactly what customers were told.'),
      s('Planning for the future',
        'Regional languages such as Punjabi, Pashto and Sindhi are not supported yet. If your customers mostly speak one of them, an Urdu receptionist is still the best option today, and it is worth testing with a few regular customers to hear how comfortable they are.'),
    ],
  },
  'reading-urdu-transcripts': {
    sections: [
      s('A sample transcript, explained',
        'Imagine a call where the customer says "Hydra facial ka rate kya hai?" and the receptionist answers with the price, then asks if they would like to book. The customer says "Haan, kal shaam" and the receptionist asks for a time. The customer says "chhe baje" and the receptionist asks for their name. In the transcript, the customer lines may show "ہائیڈرا فیشل" in Urdu letters, "کل شام" and "چھ بجے". The receptionist lines show complete Urdu sentences. Reading only the receptionist lines tells you the story: price quoted, booking for tomorrow at 6, name requested.'),
      s('Finding calls worth reading',
        'You do not need to read every transcript. The most useful ones are calls that were long but ended without a booking, calls that ended within a few seconds, and calls where a booking was made for an unusual service or time. Those show you where your information is unclear, where callers drop off and where demand you did not expect is coming from.'),
      s('Keeping transcripts private',
        'Transcripts may contain customer names, phone numbers and sometimes personal details customers choose to mention. Read them in the dashboard rather than copying them into WhatsApp groups, and limit dashboard access to the people who need it.'),
    ],
  },
  'ai-voice-chat-urdu-for-business': {
    sections: [
      s('Working hours of an Urdu voice assistant',
        'Unlike your staff, the assistant does not have working hours. It answers at 11 pm after a family dinner, at 6 am before a customer leaves for work, and during Friday prayers. It still books only within your opening hours, so customers who call at night are booked for the next day you are open. For many businesses, a large share of voice bookings arrive outside opening hours, which is exactly when nobody was answering before.'),
      s('What it needs from you to sound expert',
        'An Urdu voice assistant sounds knowledgeable when it has specific facts: exact prices, exact timings, the real landmark near your shop, the name of the doctor or stylist, the payment methods you accept. Vague information leads to vague answers. Spend ten minutes making your business info specific and the assistant immediately sounds like it has worked at your business for years.'),
      s('Measuring whether it works',
        'Watch two numbers on your overview: calls and confirmed bookings. If calls rise after you share your link but bookings stay low, read a few Urdu transcripts to see where customers hesitate. If bookings rise in step with calls, your assistant is doing its job.'),
    ],
  },
  'dates-and-times-in-urdu': {
    sections: [
      s('Days of the week in Urdu and Hindi',
        'Callers use several names for the same day. Monday can be Peer, Tuesday Mangal, Wednesday Budh, Thursday Jumeraat, Friday Jumma, Saturday Hafta and Sunday Itwaar. Talkbalt understands these Urdu names in Roman letters and in Urdu script, the Hindi names when they are written in Devanagari, and the English names that most callers use anyway. Hindi day names spoken in Roman form, such as Somvaar, are not recognised yet, so a Hindi receptionist relies on the speech model writing them in Devanagari, which it usually does.'),
      s('What happens on the edges of your hours',
        'If a caller asks for a time right at closing, the receptionist checks that the whole service fits before closing time. If they ask for a time just after you open, it accepts it. If they ask for a time that has already passed today, it explains and offers the next available time. These small checks prevent the most common front desk mistakes: bookings that run late, bookings on closed days, and bookings in the past.'),
    ],
  },
  'receptionist-greeting-examples': {
    sections: [
      s('How long should a greeting be?',
        'Aim for one sentence, two at most. Callers who hear a long greeting often start speaking before it finishes, which can make the first moments of the call messy. A short greeting lets the caller speak first, which is what they want to do: ask their question. If you have something important to say, such as new timings, put it in your FAQs so it is mentioned when relevant.'),
      s('Greeting and voice together',
        'The same greeting can sound warm with one voice and rushed with another. After choosing a voice, read your greeting aloud at a natural pace, then make a test call. If the voice sounds hurried, try a shorter greeting. If it sounds flat, try a greeting with a question at the end, which naturally lifts the tone.'),
    ],
  },
  'pakistani-phone-numbers-read-back': {
    sections: [
      s('Why the receptionist does not shorten numbers',
        'It might seem friendlier to say "zero three hundred, one two three, four five six seven". But "three hundred" is exactly where digits get lost or doubled, and a customer half listening will say "yes" without noticing. Reading every digit individually, in small groups with a pause between them, gives the customer the best chance to notice a mistake. It takes a few more seconds and saves a lost booking.'),
      s('Numbers from abroad',
        'Relatives abroad often book for family in Pakistan. They can give the Pakistani mobile number of the person the booking is for, so your team can contact them directly. US numbers are also accepted for customers who prefer to be contacted there.'),
    ],
  },
  'choose-receptionist-language': {
    sections: [
      s('Revisiting the decision later',
        'Your first choice does not have to be permanent. After a month, read a sample of transcripts and look at which language callers used to start. If most started in a different language from your receptionist, switch and compare the next month. Your overview numbers, calls and confirmed bookings, will show whether the change helped.'),
    ],
  },
  'business-info-in-any-language': {
    sections: [
      s('What to keep in one language',
        'While facts can be written in any language, keep a few things consistent. Your business name should be written the same way everywhere. Service names should match what customers say, which is often English. Prices should be written as numbers. Keeping these consistent avoids small confusions when the receptionist moves between languages.'),
    ],
  },
  'ai-voice-agent-hindi': {
    sections: [
      s('Testing a Hindi receptionist', 'Make a test call in Hindi mixed with English, ask about a price, book a slot for "कल शाम", give your number in pieces and check the read back. Then read the transcript to confirm the Devanagari text is clear for your team.'),
    ],
  },
  'urdu-english-mixed-callers': {
    sections: [
      s('Accents across Pakistan', 'Callers from Lahore, Karachi, Peshawar and Multan say the same Urdu words with different accents. The speech model handles common accents; test calls with your own customers accents are the best way to confirm it works for you.'),
    ],
  },
};
