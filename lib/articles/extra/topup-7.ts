import { type Extra, s } from '../types';

const tip = (text: string): Extra => ({ sections: [s('One more tip', text)] });

export const TOPUP_7: Record<string, Extra> = {
  'choosing-a-receptionist-voice': tip('Ask two or three regular customers to listen to your shortlisted voices on your phone. Their reaction, especially from older customers, is often the clearest sign of which voice your callers will find easiest to understand.'),
  'why-missed-calls-cost-bookings': tip('Put your booking link in the auto reply you send after a missed call, if your phone supports it. Even a caller you could not answer then has a way to book within seconds.'),
  'reduce-no-shows-clinic': tip('Patients booked weeks ahead are more likely to forget. For bookings made far in advance, send a gentle reminder a week before as well as the day before.'),
  'multilingual-receptionist-pakistan': tip('If your signboard and menu are only in English, consider adding Urdu service names in your FAQs. Callers who hear familiar words are more confident to book.'),
  'homeopathy-clinic-appointments': tip('Mention in your FAQs whether patients should bring previous prescriptions and reports. It saves time at the first consultation and helps the doctor.'),
  'ai-receptionist-for-small-business': tip('Tell your regular customers personally that they can now book by voice at any time. Regulars who try it once usually keep using it.'),
  'test-call-before-launch': tip('Make one test call on mobile data rather than Wi-Fi, since many customers will call that way, and check that the conversation still flows smoothly.'),
  'bookings-dashboard-whatsapp': tip('Save frequently used WhatsApp messages as quick replies, such as directions and parking, so confirmations take seconds after you open a booking.'),
  'opening-hours-setup': tip('Each day has one opening window, so the receptionist does not know about a break in the middle of the day. If you close for lunch or prayers, mention it in your FAQs, and if a booking ever lands in your break, message the customer to move it.'),
  'public-booking-link': tip('Add your link to your email signature and your printed menu or rate card. Every place a customer sees your name is a place they could book.'),
  'how-talkbalt-avoids-double-bookings': tip('Review your service durations every few months. As your team gets faster or slower at a service, updating its duration keeps the calendar accurate.'),
  'eye-clinic-and-optician-booking': tip('Keep a small sign at the counter with your booking link for customers who come to collect glasses. Many book their next eye test while they wait.'),
  'how-talkbalt-handles-rude-callers': tip('If you notice repeated prank calls at a certain time of night, you can switch public calls off temporarily from your dashboard and turn them back on in the morning.'),
  'ai-receptionist-hyderabad': tip('Ask your regular customers to share your link with family in nearby towns. Recommendations with a link turn into bookings faster than a phone number passed by word of mouth.'),
  'whatsapp-vs-voice-booking': tip('Watch which customers choose voice and which keep messaging. Over time you will learn which groups prefer each, and can point each to the channel they like.'),
  'ai-receptionist-vs-virtual-receptionist': tip('Whatever you choose, read a sample of calls in the first month. It is the fastest way to see whether callers are getting what they need.'),
};
