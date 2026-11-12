import { type Extra, s } from '../types';

export const GUIDES_EXTRA: Record<string, Extra> = {
  'missed-calls-small-business': {
    sections: [
      s('Missed calls by business type',
        'Different businesses miss calls in different ways. Salons miss them during their busiest evenings and weekends. Clinics miss them while doctors and assistants are with patients. Workshops miss them because mechanics are under cars with dirty hands. Home service businesses miss them because technicians are on jobs across the city. Academies miss them during class hours, which is exactly when working parents call. Knowing your own pattern tells you when you need cover most.'),
      s('What customers do after a missed call',
        'Some customers call back. Many send a WhatsApp message, then wait. Others search again and call a competitor. A few leave a review saying you never answer. The longer the gap, the less likely they are to book with you. That is why the first contact matters so much: it is the moment the customer has chosen you, and the window closes quickly.'),
      s('A one week experiment',
        'For one week, write down every missed call and every unanswered WhatsApp message older than an hour, along with the time of day. At the end of the week, look at the pattern. Most businesses find a few clear peaks. Those peaks are where an AI receptionist, or a change in staffing, will make the biggest difference.'),
    ],
  },
  'after-hours-bookings': {
    sections: [
      s('Who books after hours',
        'After hours bookers are often your best customers: working professionals who cannot call during office hours, parents who plan the family week after children sleep, students who decide on a haircut at midnight, and relatives abroad booking for family in Pakistan in their own daytime. These customers have the intent and the money; they simply do not have the time during your opening hours.'),
      s('An example late night call',
        [
          'Caller: Itni raat ko bhi booking ho jati hai?',
          'Receptionist: Ji, main kisi bhi waqt booking kar sakti hoon. Kal hum subah gyarah baje khulte hain. Aap kis waqt aana chahengi?',
          'Caller: Dopahar ek baje.',
          'Receptionist: Ek baje ka waqt khali hai. Aap ka naam kya hai?',
        ]),
      s('Respecting your team time',
        'Answering after hours used to mean an owner keeping the shop phone by the bed, or a staff member replying to WhatsApp at midnight. That wears people out. Letting a receptionist handle after hours enquiries means your team can rest, and still start each morning with new bookings.'),
      s('What to update before you start',
        'Make sure your hours are correct for the next few weeks, because after hours callers book ahead. Make sure your FAQs answer the questions people ask when they cannot reach a person, such as directions, parking and payment.'),
    ],
  },
  'whatsapp-vs-voice-booking': {
    sections: [
      s('A WhatsApp booking, message by message',
        'Here is a typical WhatsApp booking for a salon. Customer at 9:12 pm: "Price for keratin?" Salon at 10:40 pm: a photo of the rate list. Customer at 10:52 pm: "Saturday available?" Salon at 9:30 am next day: "What time?" Customer at 11:15 am: "4". Salon at 12:05 pm: "4 is booked, 5?" Customer at 1:30 pm: "Ok". Salon at 1:45 pm: "Name please". Customer at 3:10 pm: "Hina". Five hours of elapsed time across two days, for a booking that takes one minute by voice.'),
      s('When customers prefer WhatsApp',
        'Some customers prefer typing: those in an office, in a quiet place, or who are shy about speaking. WhatsApp remains the right channel for them, and for sending photos of a desired haircut or a reference design. Offer both: your booking link for fast bookings, WhatsApp for everything else.'),
      s('Making WhatsApp and voice work together', [
        'Put your booking link in your WhatsApp Business profile and away message',
        'Reply to price questions with a short answer and your link',
        'Use the WhatsApp button on each booking to confirm and remind',
        'Use WhatsApp for photos, location pins and follow ups',
      ]),
    ],
  },
  'google-business-profile-booking-link': {
    sections: [
      s('Why Google profiles matter in Pakistan',
        'Searches for "near me" businesses have grown quickly in Pakistan as more people use smartphones and Google Maps for directions. For many local businesses, the Google profile now gets more views than their Facebook page or website. A profile with photos, reviews, correct hours and a booking link turns those views into customers.'),
      s('Profile mistakes that cost customers', [
        'Wrong or missing opening hours',
        'An old phone number nobody answers',
        'No photos, or only a logo',
        'Unanswered negative reviews',
        'No website or booking link',
        'The wrong pin location on the map',
      ]),
      s('Photos that help',
        'Add photos of your entrance from the street so customers recognise it, your interior, your team at work and examples of results. Customers decide quickly, and photos help them decide in your favour.'),
      s('Reviews and replies',
        'Reply to every review. Thank happy customers by name. Respond to unhappy ones calmly, apologise for their experience and offer to make it right. Future customers read your replies as much as the reviews themselves.'),
    ],
  },
  'instagram-bio-booking-link': {
    sections: [
      s('Writing a bio that converts',
        'Your bio has a few seconds to tell a visitor what you do, where you are and how to book. A clear bio might read: "Ladies salon in Gulberg. Bridal, colour and keratin. Book by voice in Urdu or English, tap the link." Every word answers a question the visitor has.'),
      s('Link in bio tools versus a direct link',
        'Some businesses use link in bio tools that list many links. If booking is your goal, a direct link to your booking page is better: one tap instead of two. If you need several links, put booking first and make it obvious.'),
      s('Stories and highlights that drive bookings', [
        'A story with a link sticker each time you post new work',
        'A "Book" highlight explaining how booking by voice works',
        'A "Prices" highlight with your current price list',
        'A "Location" highlight with directions and parking',
      ]),
      s('Responding to comments',
        'When followers comment asking about price or availability, reply publicly with a short answer and a reminder to tap the link in bio. Other followers see that booking is easy and act on it.'),
    ],
  },
  'facebook-page-booking-button': {
    sections: [
      s('Why Facebook still brings customers',
        'Instagram gets the attention, but Facebook remains where many Pakistani adults, especially parents and older customers, look for local businesses, ask for recommendations in community groups and read reviews. Clinics, academies, workshops and family businesses often get more enquiries from Facebook than from Instagram. A booking button there captures customers who might never see your Instagram.'),
      s('Setting up your page for bookings', [
        'Profile picture with your logo, cover photo showing your business',
        'About section with services, area and hours',
        'Website field with your Talkbalt booking link',
        'Action button pointing to your booking link',
        'A pinned post explaining how to book by voice in Urdu or English',
      ]),
      s('Using Messenger with your link',
        'Many customers send a Messenger message rather than calling. Set up an instant reply that thanks them and shares your booking link. Customers who want to book can do so immediately, and you can still reply personally to questions later.'),
      s('Community groups',
        'Local groups for areas, parents, students and expatriates are full of people asking for recommendations. Where group rules allow business posts, share helpful information with your link. When happy customers recommend you, they can share the link too.'),
      s('Facebook ads',
        'If you run Facebook ads, send them to your booking link rather than to your page. People who click an ad are ready to act, and a booking page converts that interest faster than a page full of posts.'),
    ],
  },
  'ai-receptionist-for-small-business': {
    sections: [
      s('Types of small businesses that benefit most', [
        'Appointment businesses: salons, clinics, physiotherapists, consultants',
        'Service businesses with visits: home repair, pest control, cleaning',
        'Class based businesses: academies, gyms, studios, driving schools',
        'Venues and events: banquet halls, photographers, caterers',
      ]),
      s('Businesses that benefit less',
        'Businesses that mostly sell products in a shop, take food delivery orders or handle complex negotiations by phone gain less from a booking receptionist. They may still use it to answer common questions, but the main value comes from turning calls into appointments.'),
      s('Cost and value',
        'An AI receptionist usually costs a monthly amount based on usage. The value comes from bookings you would otherwise miss and staff time saved. For most appointment businesses, recovering a few missed bookings a month covers the cost.'),
      s('Getting your team on board',
        'Some staff worry an AI receptionist will replace them. Explain that it handles the phone so they can focus on customers in front of them. Most teams welcome fewer interruptions once they see it working.'),
    ],
  },
  'choosing-an-ai-receptionist-checklist': {
    sections: [
      s('Questions to ask the vendor directly', [
        'What happens to my data if I stop using the service?',
        'Can I read every call?',
        'How quickly can I change prices or hours?',
        'What does it do when it does not know an answer?',
        'How does pricing work, and what happens if I exceed my usage?',
        'Is there a contract or can I cancel monthly?',
      ]),
      s('Red flags',
        'Be cautious of any receptionist that claims to be human, promises to "understand everything", cannot show you transcripts, or cannot explain how it avoids double bookings. Be cautious of custom builds that require you to pay a developer for every change to prices or hours. The best tools let you change your information yourself in minutes.'),
      s('Testing in your own conditions',
        'Test from your phone, inside Instagram and WhatsApp, in a noisy place and in your customers language. A receptionist that works only in a quiet demo is not ready for your customers.'),
      s('Making the decision',
        'Score each option on language, booking accuracy, honesty, ease of setup and cost. Then try your favourite with real customers for a month. Real results decide better than any checklist.'),
    ],
  },
  'qr-code-booking-at-your-counter': {
    sections: [
      s('Why counters are the best place to rebook',
        'Customers are most satisfied right after a good service. That is when they are most likely to commit to their next visit. A QR code at the payment counter lets them book while the good experience is fresh, without waiting for a staff member to check the diary.'),
      s('Designing the QR card',
        'Keep the card simple: your logo, the QR code large enough to scan from arm length, and one line explaining what happens. Use high contrast, such as a black code on a white background. Avoid placing it behind glass that reflects light, which can make scanning difficult.'),
      s('QR codes beyond the counter', [
        'On the back of receipts and visiting cards',
        'On posters in nearby offices and community boards',
        'On delivery bags and packaging',
        'On your shop window, for passers by after hours',
      ]),
      s('Testing and replacing',
        'Scan your printed codes every few months to make sure they still work and the card is not damaged. A faded or torn QR code sends customers nowhere.'),
    ],
  },
  'whatsapp-business-quick-replies-booking-link': {
    sections: [
      s('Example quick replies', [
        '/book: "You can ask any question and book by voice here, in Urdu or English, any time: [link]"',
        '/price: "Our prices are on this page, and you can book from there: [link]"',
        '/location: "We are at [address]. Parking is in front. Book here: [link]"',
      ]),
      s('Away messages that still convert',
        'An away message that only says "We are closed, we will reply tomorrow" loses customers who want to book now. Add your link: "We are closed right now, but you can ask any question and book by voice here: [link]." Customers who message at night can book immediately.'),
      s('Labels and follow ups',
        'Use WhatsApp Business labels to mark chats as new enquiry, booked or follow up. When you send someone your link, label them, and check later whether they booked. A gentle follow up the next day brings back customers who got distracted.'),
      s('Do not overdo broadcasts',
        'Broadcast messages to all customers can feel like spam if sent too often. Keep broadcasts for genuinely useful updates, such as new timings or Eid deadlines, and include your link.'),
    ],
  },
  'should-ai-receptionist-say-it-is-ai': {
    sections: [
      s('How customers react',
        'In practice, most callers do not ask at all; they want their answer and their booking. Of those who ask, most are curious rather than upset, and continue normally once they hear the honest answer. The few who prefer a human can contact the business directly, and they appreciate being told the truth.'),
      s('Honesty and the law',
        'Rules about AI disclosure are evolving in many countries. Being honest by default keeps your business on the right side of current and future expectations, and avoids the reputational damage of being caught pretending.'),
      s('Example answers', [
        'English: "I am the AI receptionist for Smile Dental, made with Talkbalt. How can I help?"',
        'Urdu: "Main Glow Salon ki AI receptionist hoon, Talkbalt se bani hoon. Main aap ki kya madad kar sakti hoon?"',
      ]),
      s('What Talkbalt is, in one line',
        'If a caller asks what Talkbalt is, the receptionist explains it is a service that lets businesses answer calls and book appointments with an AI receptionist through a link or their website, and then returns to helping them.'),
    ],
  },
  'voice-agent-best-practices': {
    sections: [
      s('Listening well',
        'A good voice agent knows when the caller has finished speaking, does not jump in during a pause, and stops talking when interrupted. It handles "hello?" and "sorry, what?" as signals, not answers. These listening skills matter as much as speaking well.'),
      s('Staying on task',
        'Callers wander: they chat, ask unrelated questions, test the agent. A good agent answers kindly in one sentence and brings the conversation back to the business, without lecturing or reciting a service list.'),
      s('Never pretending',
        'A good agent does not claim to have done things it cannot do, such as sending a confirmation text it never sent, or booking before the booking exists. It only confirms what is true.'),
      s('Practices for the business owner', [
        'Keep information short, factual and current',
        'Name services the way customers say them',
        'Test regularly the way customers really talk',
        'Read transcripts weekly and fix what confuses callers',
      ]),
    ],
  },
  'ramadan-business-hours-guide': {
    sections: [
      s('Typical Ramadan timing patterns', [
        'Salons and parlours: open late morning, close before iftar, reopen after taraweeh',
        'Clinics: shorter morning sessions and an evening session after iftar',
        'Workshops: earlier closing before iftar',
        'Gyms: sessions before sehri or after iftar',
        'Academies: shorter classes and adjusted timings',
      ]),
      s('Two sessions in one day',
        'Many businesses work two sessions in Ramadan, before iftar and after taraweeh. Each day in your dashboard has one opening window, so make your busiest session bookable, usually the one after taraweeh, and explain the other session and the break in your FAQs. Customers then book the session that fills fastest and walk in for the other.'),
      s('Communicating changes',
        'Post your Ramadan timings on your Google profile, Instagram and WhatsApp status on the first day, and add an FAQ. Customers who see the same timings everywhere trust them.'),
      s('Planning staff',
        'Staff fasting work best with predictable schedules. Booked appointments help you plan who is needed when, and avoid long unpredictable waits during the hardest hours before iftar.'),
      s('Eid preparation inside Ramadan',
        'The last ten days of Ramadan are the busiest booking period of the year for many service businesses. Add Eid packages early, set chaand raat hours in advance, and let customers book before the final rush.'),
    ],
  },
  'team-workflow-with-ai-receptionist': {
    sections: [
      s('Roles in a small team', [
        'Owner: keeps services, prices, hours and FAQs up to date, reviews numbers weekly',
        'Front desk or manager: checks bookings daily, confirms on WhatsApp, cancels and frees slots',
        'Service staff: focus on customers, check the list for their next booking',
      ]),
      s('Handling walk ins without conflicts',
        'The biggest risk in a mixed booking and walk in business is promising a walk in a time already booked. Keep the bookings list open at the counter, and check it before promising any time. If a walk in wants a slot later in the day, consider booking them through your own link so the receptionist knows the slot is taken.'),
      s('When something goes wrong',
        'If a customer arrives saying they booked a different time, open the booking and the linked call transcript. You will see exactly what was said, settle the issue fairly and fix any information that caused confusion.'),
    ],
  },
  'measure-calls-and-bookings': {
    sections: [
      s('What good looks like',
        'There is no universal target, because businesses differ. A clinic may see most calls become bookings, while a salon may get many price enquiries that book later. Your own trend matters more than any benchmark: are calls growing, and is the share that turns into bookings stable or rising?'),
      s('Looking at upcoming bookings',
        'The overview also shows how many confirmed bookings are still ahead. A healthy business has a steady pipeline of upcoming bookings. If it shrinks, act early: share your link more, post more, or message past customers.'),
      s('Reading the numbers with transcripts',
        'Numbers tell you what is happening; transcripts tell you why. When a number changes, read a handful of calls from that period. Together they show you what to do next.'),
    ],
  },
  'receptionist-salary-vs-ai-receptionist': {
    sections: [
      s('An honest example',
        'Consider a clinic with one receptionist working from 10 am to 6 pm, six days a week. The receptionist manages the waiting room, files and payments, and answers calls when free. Calls after 6 pm, during busy moments and on Sunday are missed. Adding an AI receptionist does not remove the human receptionist; it answers the calls they cannot, and lets them focus on patients in the clinic. The clinic pays for both and gains the bookings that were being lost.'),
      s('When an AI receptionist alone is enough',
        'Some businesses do not need a full time human receptionist: a single stylist, a home service technician, a solo trainer, a small studio. For them, an AI receptionist covers the phone entirely, and the owner handles everything in person.'),
      s('Hidden costs of staff turnover',
        'When a receptionist leaves, a new one has to learn your prices, services, regulars and systems. Mistakes happen during that period. An AI receptionist keeps the same information and quality regardless of staff changes, which makes transitions smoother.'),
    ],
  },
  'write-faqs-for-ai-receptionist': {
    sections: [
      s('FAQ templates by business', [
        'Salon: ladies section, female staff, brands used, walk ins, card payment',
        'Clinic: doctor timings, fees, reports to bring, emergencies, parking',
        'Workshop: brands of oil and parts, warranty, waiting area, pick and drop',
        'Academy: boards, batches, teachers, online classes, fee payment',
        'Home service: areas, visit charge, warranty, emergency availability',
      ]),
      s('Testing your FAQs',
        'After writing FAQs, ask the receptionist each question in a different way than you wrote it, for example "gaari kahan khari karoon?" instead of "Is there parking?". If it answers correctly, your FAQ is clear. If not, rewrite the answer more simply.'),
      s('Keeping FAQs short',
        'Ten good FAQs beat fifty mediocre ones. Remove FAQs nobody asks, combine overlapping ones and keep every answer to one or two sentences.'),
    ],
  },
};
