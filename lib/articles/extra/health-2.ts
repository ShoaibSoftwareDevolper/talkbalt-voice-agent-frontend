import { type Extra, s } from '../types';

export const HEALTH_EXTRA_2: Record<string, Extra> = {
  'eye-clinic-and-optician-booking': {
    sections: [
      s('Setting up an optical shop on Talkbalt',
        'Start by adding the eye test as a service, with a realistic duration such as 20 or 30 minutes, and a separate consultation with the eye specialist if your clinic has one. Then add your products: frame ranges with starting prices, lens types such as single vision, progressive and anti glare, contact lenses and accessories. Products are quoted on calls but never booked, so customers can ask about lenses without the receptionist trying to schedule them.',
        'Finally, write FAQs for the questions your staff answer every day: how long glasses take, whether you accept prescriptions from other doctors, whether you repair frames, and what payment methods you accept.'),
      s('Seasonal demand',
        'School term starts bring a wave of children eye tests. Summer brings demand for prescription sunglasses. Before each season, add a short FAQ or a seasonal product, and share your booking link with parents and customers through WhatsApp status. Customers who can book a test in a minute are far more likely to act than those who plan to "come by sometime".'),
      s('Repairs and adjustments',
        'Many calls to opticians are about loose frames, broken arms or lenses that need adjusting. If you do these quickly without an appointment, say so in your FAQs, and the receptionist will tell callers they can walk in. If repairs need a booking, add a short repair service. Either way, customers get a clear answer instead of a ringing phone.'),
    ],
  },
  'homeopathy-clinic-appointments': {
    sections: [
      s('Why answering every call matters for a small clinic',
        'A small clinic often depends on a single doctor and a single helper. When the doctor is with a patient and the helper is managing the waiting room, the phone is left ringing. Patients who cannot get through often assume the clinic is closed or too busy, and some do not try again. For a practice that grows mainly by word of mouth, each unanswered call is a lost chance to start a long relationship with a new patient and their family.'),
      s('Making the clinic easy to find',
        'Add your exact address with a landmark, the floor if the clinic is upstairs, and parking information to your business info. Add your Talkbalt link to your Google profile so patients searching for a homeopathic doctor in your area can see your timings and book from the same screen. Patients who know exactly where to go and when arrive calmer and on time.'),
      s('Explaining your consultation style',
        'First consultations in homeopathy often take longer than a general doctor visit because of the detailed history taken. Explain this in your FAQs so patients plan their time, and set the duration of the first consultation service accordingly. The receptionist then books the right length and can tell patients to expect a longer first visit.'),
    ],
  },
  'patient-privacy-ai-receptionist': {
    sections: [
      s('Recordings and transcripts',
        'Calls are transcribed, and where recording is enabled, the audio is stored so you can review it. Treat both like patient files. Listen to recordings only when there is a reason, such as resolving a dispute or improving your information, and never share them on messaging groups. If your clinic has its own privacy policy, mention that calls may be transcribed or recorded.'),
      s('Questions patients may ask the receptionist',
        'Some patients will ask the receptionist directly whether their information is safe or who will see it. Add an FAQ with a short, honest answer, such as "Your name and number are only used to book your appointment and are only visible to our clinic." The receptionist will give that answer when asked, in its own words.'),
      s('What happens if a patient shares too much',
        'Occasionally a patient will describe symptoms in detail during a booking call. The receptionist does not discuss them; it focuses on booking and tells the patient the doctor will help with that during the visit. The details remain only in your private transcript. If a patient asks you to remove something they said, contact Talkbalt support.'),
      s('Building a privacy habit in your team',
        'Privacy is mostly about everyday habits. Lock screens when leaving the counter, log out of shared computers, avoid reading patient details aloud in the waiting room and never forward screenshots of bookings. These small habits protect patients far more than any single tool.'),
    ],
  },
  'physiotherapy-clinic-booking': {
    sections: [
      s('Setting up a physiotherapy clinic',
        'Add an initial assessment service with a longer duration, a standard follow up session, and any specialised sessions you offer, such as sports rehabilitation or post surgery rehab, each with its own duration and fee. If you offer packages, such as ten sessions at a discount, add them as products so the receptionist can quote them. Write FAQs about what to wear, whether a referral is needed, female therapists and home visits.'),
      s('Home visit logistics',
        'Home physiotherapy is common for elderly and post surgery patients. Make home sessions a separate service with a longer duration that includes travel, and list the areas you cover. Collect the exact address and a location pin on WhatsApp after the booking. Families appreciate being able to book home sessions for parents at any hour, often from another city or country.'),
      s('An honest note on capacity',
        'Talkbalt books one appointment per time slot for the whole clinic today. A clinic with several physiotherapists working at the same time can make one therapist bookable through Talkbalt for now, or use it for the busiest hours. Support for several bookings at once is planned.'),
    ],
  },
  'reduce-no-shows-clinic': {
    sections: [
      s('Reminders that work in Pakistan',
        'SMS reminders are often ignored, buried among promotional messages. WhatsApp messages from a clinic number are usually read, especially when they mention the patient name and appointment time. Keep reminders short and polite, in the language the patient used, and invite a reply. A message that feels personal is answered far more often than one that feels automated.'),
      s('What to say when a patient cancels',
        'When a patient replies that they cannot come, thank them for letting you know, offer to rebook, and cancel the booking in your dashboard right away. A friendly response encourages them to tell you next time too, instead of simply not showing up.'),
      s('A policy for repeat no shows',
        'If a few patients repeatedly miss appointments, consider a simple policy: confirm their bookings by phone the day before, or ask them to arrive early for walk in slots instead. Explain any policy in your FAQs so it is applied fairly.'),
    ],
  },
  'clinic-management-software-pakistan': {
    sections: [
      s('Avoiding double work',
        'A common worry is that adding a receptionist creates double entry: bookings in one place, records in another. In practice, the booking list is a short daily schedule, and patient records are created only when patients arrive. Many clinics simply keep the Talkbalt bookings list open at the front desk and create the record in their clinic software at check in. It takes seconds and avoids mistakes from copying details off a paper register.'),
      s('When you have neither',
        'Many small clinics have no software at all. If that is you, a receptionist is often the easiest first step, because it needs no installation or training and starts helping on the first day. Records software can follow when your patient volume justifies it.'),
    ],
  },
  'ai-voice-agent-healthcare': {
    sections: [
      s('An example of a safe answer',
        [
          'Patient: Mujhe bukhar hai, kaun si dawai loon?',
          'Receptionist: Main dawai ke baare mein mashwara nahi de sakti; doctor sahab is mein aap ki madad karenge. Kya main aap ke liye aaj ka waqt book kar doon?',
        ]),
      s('Why this boundary builds trust',
        'Patients trust a clinic more when its receptionist knows its limits. A front desk that guesses about medicine is dangerous; one that says "the doctor will help with that" and books the patient quickly is reassuring. The same principle applies to AI: a voice agent that stays administrative is both safer and more trusted.'),
      s('Regulation and responsibility',
        'Healthcare in Pakistan is regulated, and clinics remain responsible for what is said in their name. Keeping the voice agent strictly to administration, reviewing transcripts and making it clear that patients are speaking with an AI are sensible steps for any clinic using one.'),
    ],
  },
  'skin-and-aesthetic-clinic-booking': {
    sections: [
      s('Consultation first, treatment second',
        'For most aesthetic treatments, a consultation protects both the patient and the clinic. The doctor checks suitability, sets expectations and agrees a plan. Make the consultation easy to book and clearly priced. Many clinics adjust the consultation fee against treatment if the patient goes ahead; if you do, say so in your FAQs, because it is a strong reason to book.'),
    ],
  },
  'dentist-appointment-karachi': {
    sections: [
      s('Patients calling from outside Karachi',
        'Some patients travel to Karachi for specialised dental work from interior Sindh or Balochistan. They need to plan travel and accommodation, so they want confirmed appointments and clear prices in advance. A receptionist that answers at any hour and books a confirmed slot makes your clinic the easy choice for these patients.'),
      s('Making the most of your Google profile',
        'Respond to every review, add photos of your clinic and equipment, list your treatments and keep your hours current. Then add your booking link. A complete profile with an easy way to book often wins over a clinic with a higher rating but no clear way to get an appointment.'),
    ],
  },
  'ai-receptionist-for-clinics': {
    sections: [
      s('Getting started for a clinic',
        'Add each doctor consultation as a service with its fee and duration, write each doctor timings in your FAQs, set the clinic opening hours, choose a calm voice and a short greeting, and make a test call asking about timings and booking for a family member. Then add your booking link to your Google profile and WhatsApp.'),
    ],
  },
  'dental-clinic-software-pakistan': {
    sections: [
      s('A note on reviews', 'Whatever software you use, patients choose dentists largely on reviews and how easy it is to get an appointment. Ask happy patients for Google reviews, and make sure the booking link is on your profile.'),
    ],
  },
};
