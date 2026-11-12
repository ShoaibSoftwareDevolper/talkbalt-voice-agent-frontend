import { type Extra, s } from '../types';

export const GUIDES_EXTRA_4: Record<string, Extra> = {
  'ramadan-business-hours-guide': {
    sections: [
      s('Clinics in Ramadan',
        'Clinics often see a change in the kind of patients who call during Ramadan. Some postpone routine visits until after Eid, while others want appointments at times that do not clash with fasting, such as just after iftar. If your doctor sits after iftar during Ramadan, make that clear in your hours and FAQs, because many patients will specifically ask for it. The receptionist will offer those evening times to patients who ask for a convenient slot.'),
      s('Gyms and fitness studios in Ramadan',
        'Gyms usually move their busiest hours to late evening after taraweeh, and some open before sehri. Update your hours and mention Ramadan timings in your FAQs so members and trial callers know when to come. Trials booked during Ramadan often convert into memberships after Eid, when people return to their routines.'),
      s('Academies in Ramadan',
        'Academies shorten classes and shift timings. Parents call to confirm the new schedule. A clear FAQ about Ramadan timings, and updated hours for demo classes, answers those calls without staff having to repeat the same message all day.'),
    ],
  },
  'qr-code-booking-at-your-counter': {
    sections: [
      s('An example from a barber shop',
        'A barber shop places a small QR stand next to the payment counter with the line "Scan to book your next cut, any time". After each haircut, the barber mentions it once. Regulars start booking their next visit before leaving, and Saturday afternoons, which used to be a long queue, become a mix of booked regulars and a manageable number of walk ins. The shop did not spend anything on advertising; it simply gave existing customers an easy way to come back.'),
      s('Common QR mistakes', [
        'A code printed too small to scan from a normal distance',
        'A code pointing to an old or wrong link',
        'No sentence explaining what happens after scanning',
        'A glossy surface that reflects light into the camera',
        'Codes placed where customers never stand, such as behind the counter',
      ]),
    ],
  },
  'instagram-bio-booking-link': {
    sections: [
      s('What happens on an iPhone inside Instagram',
        'On iPhones, Instagram opens links in its own browser view, and microphone access there is often blocked. When a follower opens your Talkbalt link inside Instagram on an iPhone, the page recognises it and shows a clear button to open the same page in Safari, plus a copy link option. Once in Safari, the microphone works normally and the call starts. On Android, the page moves to the normal browser automatically in most cases. Your followers do not need to understand any of this; they just follow the button.'),
      s('Testing it yourself', 'Open your own Instagram profile on a phone, tap your bio link and try to start a call. Do this on both an Android phone and an iPhone if you can, so you know exactly what your followers experience.'),
    ],
  },
  'google-business-profile-booking-link': {
    sections: [
      s('Answering questions on your profile',
        'Google profiles have a questions and answers section where anyone can ask, and anyone can answer. Check it regularly and answer questions yourself, so the information is accurate. Common questions such as parking, timings and prices can also be answered with a note that customers can book and ask anything through your link.'),
      s('Getting your first reviews',
        'If your profile has few reviews, start with your most loyal customers. Ask them in person, then send the review link on WhatsApp the same day. A handful of genuine reviews from real customers makes a noticeable difference to how many new customers choose you from the map.'),
    ],
  },
  'after-hours-bookings': {
    sections: [
      s('After hours by business type', [
        'Salons and parlours: late night bookings for the next day, especially before weekends',
        'Clinics: patients and families booking after deciding to see a doctor',
        'Academies: parents booking demo classes after checking results or discussing with children',
        'Workshops: car owners booking a service after noticing a problem on the drive home',
        'Home services: customers booking a technician after a problem appears in the evening',
      ]),
      s('Customers abroad', 'Relatives in the Gulf, UK and North America book appointments for family in Pakistan during their own daytime, which is often night in Pakistan. Answering them immediately, with bookings in Pakistani time, wins business that never even reaches most competitors.'),
    ],
  },
  'ai-receptionist-for-small-business': {
    sections: [
      s('An example from a small workshop',
        'A two mechanic workshop used to miss most calls while working on cars. The owner added a booking link to his Google profile and WhatsApp, listed common services with starting prices, and set his hours. Within weeks, customers were booking oil changes and AC services for specific times, and the workshop day became more planned. The owner still talks to customers in person when they arrive; he just stopped losing the ones who called while he was under a car.'),
      s('Questions to ask before you start', ['Which hours do I miss calls most?', 'Which questions do I answer most often?', 'Which services do customers book most?', 'Where do customers find me online?']),
    ],
  },
  'choosing-an-ai-receptionist-checklist': {
    sections: [
      s('Thinking about the long term',
        'Beyond the first month, think about how the receptionist will grow with your business. Can you change services and prices yourself at any time? Will it handle more calls in your busy season without extra setup? Will you be able to see your data and export your bookings if you ever need to? Choosing a tool that adapts as your business changes saves you from switching later.'),
      s('A word on custom builds', 'Freelancers can build a custom voice agent for your business. That can work, but ask who will update it when your prices or hours change, how quickly, and at what cost. A receptionist you can update yourself in minutes is often more practical for a small business.'),
    ],
  },
  'receptionist-salary-vs-ai-receptionist': {
    sections: [
      s('Thinking about growth',
        'As your business grows, call volume grows with it. A human receptionist eventually reaches a limit and you need a second one. An AI receptionist handles more calls without additional staff, while your human team grows only where in person service is needed. That makes growth smoother and more affordable.'),
      s('A practical plan', 'Start with an AI receptionist for calls and after hours. Watch your numbers for two months. If the front desk is still overwhelmed with walk ins and payments, hire for that specific need, knowing the phone is already covered.'),
    ],
  },
  'whatsapp-business-quick-replies-booking-link': {
    sections: [
      s('Greeting messages for first time chats',
        'WhatsApp Business can send a greeting the first time someone messages you, or after a period of no contact. Use it to welcome new customers and give them your booking link: "Welcome to Glow Salon. You can ask any question and book by voice here, any time: [link]. We will also reply to your message soon." Many new customers book before you even read their message.'),
      s('A common mistake', 'Do not set the same automatic message to reply to every message from regulars. It can feel cold. Use greeting messages for new chats and quick replies when you choose to send the link.'),
    ],
  },
  'write-faqs-for-ai-receptionist': {
    sections: [
      s('Seasonal FAQs',
        'Some questions only appear at certain times of year: Ramadan timings, Eid deadlines, wedding season packages, summer hours. Add these FAQs a week or two before the season and remove them afterwards. Old seasonal FAQs left in place give customers wrong answers and make your business look careless.'),
      s('FAQs your competitors forget', 'Think about what makes customers nervous: hidden charges, hygiene, privacy, female staff, waiting times. Answering these clearly sets you apart, because most businesses leave customers to guess.'),
    ],
  },
  'missed-calls-small-business': {
    sections: [
      s('The compounding effect',
        'A missed booking is not only one lost visit. A customer who books once often returns for years and recommends you to friends. Missing that first call can mean losing a long relationship and everyone it would have brought. That is why fixing missed calls often matters more than any marketing campaign.'),
    ],
  },
  'measure-calls-and-bookings': {
    sections: [
      s('What the overview does not show',
        'The overview counts calls and bookings, but not walk ins, phone calls you answered yourself or WhatsApp bookings. If you want a full picture of your business, add those from your own records. The overview shows how your receptionist and your link are performing, which is the part it can measure precisely.'),
    ],
  },
  'facebook-page-booking-button': {
    sections: [
      s('Getting started on Facebook', 'Add your booking link to your page website field and action button today, pin a post about booking by voice, and set a Messenger instant reply with the link. Then share the link in one local group where business posts are allowed.'),
    ],
  },
  'voice-agent-best-practices': {
    sections: [
      s('Testing these practices yourself', 'Call your receptionist and count the questions in each reply, time how long replies take, give your number in pieces, ask something you never wrote down and say "are you a real person?". Each test checks one practice from this guide.'),
    ],
  },
  'should-ai-receptionist-say-it-is-ai': {
    sections: [
      s('Testing it', 'Make a test call and ask "aap insaan hain?" and "Talkbalt kya hai?". Listen to the answers. They should be honest, short and followed by an offer to help.'),
    ],
  },
  'why-missed-calls-cost-bookings': {
    sections: [
      s('Turning the idea into action', 'Count your missed calls this week, set up your link and share it in three places: your WhatsApp away message, your Google profile and your Instagram bio. Next week, compare.'),
    ],
  },
  'whatsapp-vs-voice-booking': {
    sections: [
      s('Getting started', 'Add your booking link to your WhatsApp Business profile, away message and a quick reply today. Watch how many customers choose voice over the next two weeks.'),
    ],
  },
  'team-workflow-with-ai-receptionist': {
    sections: [
      s('Small teams, big days', 'On the busiest days of the year, the routine above is what keeps a small team calm: one list, one person checking it, and a receptionist handling the phone.'),
    ],
  },
};
