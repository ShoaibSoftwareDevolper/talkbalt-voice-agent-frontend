import { type Extra, s } from '../types';

export const TOPUP_1: Record<string, Extra> = {
  // ---- Services --------------------------------------------------------------------------------
  'personal-trainer-bookings': {
    sections: [
      s('What clients look for in a trainer',
        'People choosing a personal trainer want three things: someone who understands their goal, someone who will keep them consistent and someone they feel comfortable with. The first call is where they judge all three. A receptionist cannot replace your expertise, but it can make the first contact smooth: answering clearly, explaining what the assessment involves and booking it quickly. The assessment is then where you show them why you are the right trainer.'),
      s('Questions to answer in your FAQs', ['Do you create diet plans?', 'Do you train beginners and older clients?', 'Can I train with a friend?', 'What happens if I miss a session?', 'Do you offer online coaching?']),
      s('Keeping your diary realistic', 'Leave buffer time between home sessions in different areas, and set your hours to the times you actually want to train. The receptionist will never book you outside them, which protects your rest days.'),
    ],
  },
  'laundry-pickup-booking': {
    sections: [
      s('An example route day',
        'A laundry in Lahore serves Gulberg on Mondays and Thursdays and DHA on Tuesdays and Fridays. Customers who call are told which days their area is covered, and their pickup is booked into the right window. Riders follow one area per day instead of crossing the city, saving hours of driving. Customers know exactly when to have their clothes ready, which means fewer wasted trips.'),
      s('Why customers switch laundries', 'Customers usually switch after a missed pickup, a late delivery or a damaged item handled badly. Clear pickup windows, honest turnaround times and fair, written policies prevent the first three. Prompt WhatsApp updates handle the rest.'),
      s('Measuring your service', 'Watch calls and confirmed pickups on your overview each week. If calls rise but pickups do not, read transcripts to see whether customers are outside your areas or put off by turnaround times.'),
    ],
  },
  'driving-school-booking': {
    sections: [
      s('An example of a confident answer',
        'A mother calls asking whether her daughter can learn safely. The receptionist explains, from the FAQs, that a female instructor is available, cars have dual controls and lessons can start with pickup from home in the covered areas. Then it offers to book a first lesson. A clear, calm answer to a worried parent is often what decides the booking.'),
      s('Seasons for driving schools', 'Demand rises in summer holidays, after university exams and before people start new jobs. Update your hours and promote your link in student groups before those periods so first lessons are booked in an orderly way.'),
    ],
  },
  'lawyer-and-tax-consultant-appointments': {
    sections: [
      s('Building trust before the meeting',
        'Clients choosing a lawyer or consultant want to feel they will be heard and treated fairly. Publish your areas of practice, your consultation fee and the documents to bring. The receptionist shares these clearly, and clients arrive prepared, which makes the first meeting more productive for both sides.'),
      s('After the consultation', 'Use the WhatsApp button on the booking to send a short summary of next steps and required documents. Clients who receive clear follow up are more likely to engage you for the full matter.'),
    ],
  },
  'tailor-and-boutique-appointments': {
    sections: [
      s('An example boutique call', [
        'Customer: Instagram par jo maroon jora dekha tha, woh available hai?',
        'Receptionist: Main stock ke baare mein confirm nahi kar sakti, lekin aap trial ke liye waqt book kar sakti hain aur team aap ko dikha degi. Kya kal shaam theek rahega?',
      ]),
      s('Stock questions', 'Stock changes daily, so keep it out of your FAQs unless you update them every day. Let the receptionist book a visit and let your team confirm availability on WhatsApp.'),
    ],
  },
  'tuition-academy-enquiries': {
    sections: [
      s('Following up with parents',
        'After a demo class, send the parent a short WhatsApp message from the booking: how the class went, the batch timing and how to enrol. Parents who receive a personal follow up are far more likely to enrol than those left to decide on their own.'),
      s('Measuring admissions', 'Track calls, demo bookings and enrolments each season. If many parents book demos but few enrol, the issue is in the demo or the fees; if few book demos, share your link more widely.'),
    ],
  },
  'car-service-workshop-booking': {
    sections: [
      s('Building a reputation',
        'Workshops grow by reputation more than advertising. Customers who are quoted honestly, served on time and told clearly when their car will be ready recommend you to friends and family. Bookings help with the "on time" part, and your FAQs help with the "honest" part. Ask happy customers for Google reviews; car owners searching for a workshop read them carefully.'),
      s('Getting started', 'Add your common services with starting prices and durations, write FAQs about brands, warranty and waiting, and put your link on Google Maps and WhatsApp.'),
    ],
  },
  'photography-studio-booking': {
    sections: [
      s('Pricing clearly',
        'Photography pricing confuses clients when packages hide what is included. Name each package by what it delivers, such as "Portrait session: 30 minutes, 10 edited photos", and list extras separately. The receptionist quotes them exactly, and clients compare you fairly with others.'),
      s('Handling enquiries during shoots', 'While you are shooting, the receptionist answers enquiries and books sessions and consultations. After the shoot, you find new bookings waiting instead of a pile of unread messages.'),
    ],
  },
  'vet-and-pet-grooming-booking': {
    sections: [
      s('Building loyalty with pet owners',
        'Pet owners are loyal to vets and groomers who treat their animals kindly and remember them. Use your bookings list to keep track of regular pets and owners, send reminders for vaccinations and grooming, and greet them by name. These small touches build relationships that last the pet whole life.'),
    ],
  },
  'real-estate-ai-voice-agent': {
    sections: [
      s('Getting started', 'Add meeting and visit services, write FAQs about the areas and property types you handle, choose English or Urdu depending on your clients, and put your link on your portal listings, Facebook page and Google profile.'),
      s('Keeping leads warm', 'Call or message every booked lead before the meeting to confirm. Leads who hear from a real agent soon after booking are much more likely to attend.'),
    ],
  },
  'gym-trial-and-membership-enquiries': {
    sections: [
      s('Turning trials into members',
        'A trial is a chance to show the caller what your gym offers. Greet them by name, give a short tour, introduce a trainer and explain membership options at the end. Then follow up on WhatsApp the next day. Trials that feel personal convert far better than those where the caller is left to wander.'),
    ],
  },
  'car-wash-and-detailing-booking': {
    sections: [
      s('Getting started', 'Add your packages by car size with durations and prices, write FAQs about time required, pick and drop and aftercare, and share your link on Instagram with before and after photos.'),
      s('Reviews', 'Ask happy customers for Google reviews with photos of their car. Detailing results are visual, and photos in reviews persuade new customers.'),
    ],
  },
  'yoga-and-fitness-classes-booking': {
    sections: [
      s('Workshops and events', 'If you run occasional workshops or retreats, add them as services for their dates, or as products with prices, and mention them in your FAQs. The receptionist tells interested callers about them and books places.'),
      s('Measuring growth', 'Track trial bookings and how many become members. A steady flow of trials is the best sign your link is reaching new people.'),
    ],
  },
  'home-repair-services-booking': {
    sections: [
      s('Measuring your business', 'Watch calls and confirmed visits on your overview, and note which months are busiest. Plan staff and parts stock around those peaks, and promote your link before them.'),
    ],
  },
  // ---- Health ----------------------------------------------------------------------------------
  'dentist-appointment-karachi': {
    sections: [
      s('Building patient loyalty', 'Patients who have a good first visit come back for check ups and bring family. Send a thank you message after the visit and a reminder for the next check up in six months. Over time, these returning patients become the backbone of the clinic.'),
      s('Children dentistry', 'Parents often search for a dentist for children. If you treat children, say so clearly in your FAQs and mention how you make visits comfortable for them.'),
    ],
  },
  'eye-clinic-and-optician-booking': {
    sections: [
      s('Building loyalty', 'Customers return to opticians who are honest about prices and quick with repairs. Remind customers when their eye test is due, usually every year or two, and offer them a booking link. Families often follow when one member has a good experience.'),
    ],
  },
  'ai-voice-agent-healthcare': {
    sections: [
      s('An example of a good boundary in English', 'A caller asks whether a rash needs urgent attention. The receptionist says it cannot give medical advice, suggests contacting emergency services if it feels urgent, and offers the earliest available appointment with the doctor. The caller gets a responsible answer and a path to care.'),
    ],
  },
  'physiotherapy-clinic-booking': {
    sections: [
      s('Reviews and referrals', 'Patients who recover well are your best advertisement. Ask them for a Google review and give them your link to share with friends and family who need physiotherapy.'),
    ],
  },
  'homeopathy-clinic-appointments': {
    sections: [
      s('Keeping timings accurate', 'If the doctor occasionally cannot sit on a usual day, remove that day hours as soon as you know and message booked patients. Patients who travel appreciate being told before they set off.'),
    ],
  },
  'reduce-no-shows-clinic': {
    sections: [
      s('No shows and online bookings', 'Some clinics worry online booking will increase no shows. In practice, confirmed phone numbers and simple WhatsApp reminders keep them manageable, and the extra bookings from patients who could not get through before far outweigh the occasional no show.'),
    ],
  },
  'patient-privacy-ai-receptionist': {
    sections: [
      s('Questions to ask any provider', ['Where is data stored?', 'Who can access transcripts?', 'Is each clinic data separated?', 'What information is collected on calls?', 'How can data be removed if needed?']),
    ],
  },
  'dental-clinic-software-pakistan': {
    sections: [
      s('Getting started', 'Add your treatments with durations and prices, set clinic hours, write FAQs about emergencies, payment and parking, and put your booking link on Google Maps. Keep your existing records system for patient files.'),
    ],
  },
  'ai-receptionist-for-clinics': {
    sections: [
      s('Measuring the effect', 'Compare a month before and after: missed calls, crowding in the waiting room and how many patients booked specific times. Most clinics feel the difference in the waiting room first.'),
    ],
  },
  'skin-and-aesthetic-clinic-booking': {
    sections: [
      s('Getting started', 'Add a consultation service, your most common treatments with durations and prices, packages as products and clear FAQs about who performs treatments and downtime. Put your link in your Instagram bio, where most aesthetic enquiries begin.'),
    ],
  },
  'clinic-management-software-pakistan': {
    sections: [
      s('A final thought', 'Software and a receptionist both serve the same goal: patients seen on time, with less stress for staff. Choose the one that removes your biggest daily frustration first.'),
    ],
  },
  'ai-receptionist-for-dentists': {
    sections: [
      s('Getting started', 'Add your treatments, set clinic hours including any evening sessions, write FAQs for emergencies, payment and parking, choose a calm voice and put your link on Google Maps.'),
    ],
  },
  // ---- Cities ----------------------------------------------------------------------------------
  'ai-receptionist-rawalpindi': {
    sections: [
      s('Getting started in Rawalpindi', 'Add your services with prices, set hours around Friday prayers if needed, write your address with a road or chowk people know, choose a polite Urdu voice and share your link on WhatsApp and Google Maps. Most businesses are ready in an afternoon.'),
      s('Academies near colleges', 'Academies near colleges and universities get heavy enquiries in admission season. Listing fees and demo classes lets parents and students book at night, when they make most decisions.'),
    ],
  },
  'ai-receptionist-faisalabad': {
    sections: [
      s('Getting started in Faisalabad', 'List your services with prices, set your hours including any shift friendly timings, describe your location with a landmark, choose Urdu and share your link on WhatsApp, where most Faisalabad customers already contact businesses.'),
      s('Gyms and fitness', 'Gyms in Faisalabad see demand rise before summer and weddings. Trial sessions booked by voice turn enquiries into members.'),
    ],
  },
  'ai-receptionist-peshawar': {
    sections: [
      s('Getting started in Peshawar', 'Add your services and prices, explain privacy and female staff arrangements clearly, describe your location with phase or road and landmark, choose a voice your customers trust and share your link on WhatsApp and Facebook.'),
      s('Winter and summer timings', 'Peshawar businesses often change hours with the seasons. Update them the day they change so customers are never booked when you are closed.'),
    ],
  },
  'ai-receptionist-quetta': {
    sections: [
      s('Getting started in Quetta', 'Add your services, set your hours with winter changes in mind, write FAQs for travelling customers, choose Urdu and share your link on WhatsApp and Facebook. Patients and customers from other districts will be able to book before they travel.'),
    ],
  },
  'ai-receptionist-multan': {
    sections: [
      s('Getting started in Multan', 'Add services and prices, set summer and winter hours, write FAQs for travelling patients and customers, choose Urdu and put your link on Google Maps and WhatsApp.'),
      s('Wedding season in Multan', 'Parlours, tailors and photographers see heavy demand in wedding season. Add packages early and let the receptionist take bookings while you work.'),
    ],
  },
  'ai-receptionist-islamabad': {
    sections: [
      s('Getting started in Islamabad', 'List services with prices, set hours that include early morning or evening slots if you offer them, write your sector and markaz address, choose English or Urdu, and add your link to Google Maps, which many Islamabad customers use for every errand.'),
      s('Clinics in Islamabad', 'Clinics in Blue Area and the F sectors see patients from across the twin cities. Clear doctor timings and a confirmed slot help patients plan around traffic.'),
    ],
  },
  'ai-receptionist-hyderabad': {
    sections: [
      s('Getting started in Hyderabad', 'Add services and prices, set your hours, write your address with unit and landmark, choose Urdu and share your link on WhatsApp and Facebook, where most Hyderabad customers already reach businesses.'),
    ],
  },
  'ai-receptionist-sialkot-gujranwala': {
    sections: [
      s('Getting started', 'List services and prices, set your hours, describe your location with a road or chowk, choose Urdu or English based on who calls, and share your link with local customers and relatives abroad.'),
    ],
  },
  'ai-receptionist-lahore': {
    sections: [
      s('Getting started in Lahore', 'Add services and prices, set hours that reflect evenings and weekends, describe your location with a main road or market, choose Urdu for most businesses and put your link in your Instagram bio and on Google Maps.'),
    ],
  },
  'ai-receptionist-karachi': {
    sections: [
      s('Getting started in Karachi', 'Add services and prices, set evening hours if you have them, describe your location by block and landmark, mention parking, and add your link to Google Maps and WhatsApp.'),
    ],
  },
  // ---- Food ------------------------------------------------------------------------------------
  'banquet-hall-viewings': {
    sections: [
      s('Measuring enquiries', 'Watch calls and viewing bookings on your overview through the season. If calls are high but viewings low, read transcripts to see whether prices, capacity or dates are putting families off, and adjust what you can.'),
      s('Respecting families time', 'Families visit venues on weekends between other wedding errands. Being ready at the booked time, with the right hall prepared and the manager available, makes a strong impression.'),
    ],
  },
  'catering-enquiries': {
    sections: [
      s('Measuring enquiries', 'Track how many calls become tastings or consultations, and how many of those become orders. The first number shows whether your prices and menus attract interest; the second shows how well your team closes.'),
    ],
  },
  'restaurant-faqs-for-receptionist': {
    sections: [
      s('Reviewing FAQs with your team', 'Ask your waiters and managers which questions they hear most on the phone and at the door. Their answers are the best starting point for your FAQs.'),
    ],
  },
};
