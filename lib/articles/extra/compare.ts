import { type Extra, s } from '../types';

export const COMPARE_EXTRA: Record<string, Extra> = {
  'what-is-an-ai-voice-agent': {
    sections: [
      s('A short history',
        'Voice interfaces are not new. Phone menus that said "press 1" have existed for decades, and voice assistants on phones and speakers have been around for years. What changed recently is that AI language models became good enough to hold natural conversations, and speech recognition and speech generation became fast and accurate enough to make those conversations feel normal. Put together, they allow a voice agent to understand free speech, decide what to say and reply naturally in about the time a person would.'),
      s('What happens in a single turn',
        'When a caller says "kal shaam paanch baje haircut ho sakta hai?", the speech recognition model turns the audio into text. The system works out that the caller has finished speaking. The language model, given your business information and the conversation so far, decides on a reply. Checks in code confirm whether tomorrow at 5 pm is within your hours. The speech model turns the reply into audio. All of this happens in a second or two.'),
      s('Where voice agents are used', [
        'Receptionists for salons, clinics and service businesses',
        'Customer support lines for banks and telecom companies',
        'Order status and delivery updates',
        'Lead qualification for sales teams',
        'Information lines for government and public services',
      ]),
      s('Limitations to be aware of',
        'Voice agents can mishear in noisy places, struggle with very strong accents or uncommon languages, and give wrong answers if their information is wrong. Good ones reduce these risks by asking again when unsure, confirming important details and admitting what they do not know. They are not a replacement for human judgment in complex or sensitive situations.'),
      s('Voice agents in Pakistan',
        'In Pakistan, the most important requirement is language: understanding Urdu mixed with English, and speaking natural Urdu. A voice agent built only for English will struggle with most Pakistani callers, however advanced it is otherwise.'),
    ],
  },
  'ai-receptionist-vs-human-receptionist': {
    sections: [
      s('A day in the life of each',
        'A human receptionist arrives at 10, opens the diary, greets customers, answers calls between walk ins, takes payments, handles a complaint, takes a lunch break and a prayer break, and leaves at 6. During busy moments, some calls go unanswered. After 6, the phone rings into silence. An AI receptionist answers every call from midnight to midnight, several at once, books appointments into the same calendar, never takes a break and never greets anyone at the door. Each is excellent at what the other cannot do.'),
      s('Customer experience',
        'Customers judge a receptionist on three things: being answered quickly, being understood and getting what they need. An AI receptionist answers instantly and books accurately. A human receptionist brings warmth, recognition of regulars and flexibility. The best customer experience combines both: an instant answer on the phone and a warm welcome at the door.'),
      s('Mistakes each one makes',
        'Humans forget to write down a number, mishear a time, double book under pressure or have a bad day. AI receptionists can mishear in noise or give an outdated answer if the information is not updated. Talkbalt reduces its own mistakes by confirming numbers, checking hours and refusing overlaps in code; the owner reduces them further by keeping information current.'),
      s('Making the decision for your business', [
        'If you have no receptionist and miss calls: start with an AI receptionist',
        'If you have a receptionist who is overloaded: add an AI receptionist for calls',
        'If your business depends on in person welcome and payments: keep a human receptionist',
        'If you want after hours bookings: an AI receptionist is the only practical option',
      ]),
    ],
  },
  'ai-receptionist-vs-virtual-receptionist': {
    sections: [
      s('Cost structure compared',
        'Virtual receptionist services charge for human time, usually per call or per minute, and often have minimum monthly fees. Because a person is paid for every minute, costs rise steadily with call volume. AI receptionists also charge by usage, but the cost per minute is usually lower, and there is no minimum staffing. For high volumes of short, routine calls, AI is typically more economical; for low volumes of complex calls, a human service may make sense.'),
      s('Speed and availability',
        'A virtual receptionist service may have hold times during busy periods, and coverage may depend on their staff shifts. An AI receptionist answers immediately at any hour and can handle several callers at once.'),
      s('Knowledge of your business',
        'A virtual receptionist reads your notes, which may be outdated or skimmed under pressure. An AI receptionist uses exactly the information in your dashboard, updated the moment you change it. On the other hand, a person can use judgment when a situation is not covered by your notes.'),
      s('Privacy',
        'With a virtual receptionist service, people outside your business hear and handle your customer information. With an AI receptionist, information stays in your dashboard. Either way, ask how data is stored and who can access it.'),
    ],
  },
  'ai-receptionist-vs-chatbot': {
    sections: [
      s('Different strengths',
        'Chatbots work well for browsing: customers can read menus, click buttons and scroll back through answers. Voice receptionists work well for conversations: customers can explain what they want in their own words and settle a booking quickly. A chatbot that asks a customer to type their phone number, date and time works; a voice receptionist that collects the same in a short conversation is usually faster for the customer.'),
      s('Language and literacy',
        'Typing in Urdu is slow for many people, and some customers are more comfortable speaking than writing. A voice receptionist removes that barrier entirely. For businesses that serve a broad range of customers, including older people and those less comfortable with typing, voice is often more inclusive.'),
      s('Where each fits in your business', [
        'Website visitors who want to browse prices: a clear services page',
        'Visitors ready to book: a voice call button',
        'Customers who want to send photos or documents: WhatsApp',
        'Customers who want to talk to a person: your phone or counter',
      ]),
      s('Measuring the difference',
        'If you currently use a chatbot or contact form, try a voice link alongside it for a month. Compare how many enquiries become bookings through each. Many businesses find voice converts better for bookings, while chat remains useful for questions.'),
    ],
  },
  'ai-receptionist-vs-call-center': {
    sections: [
      s('How call centers work',
        'A call center has agents working shifts, supervisors, quality checks, scripts, call routing systems and reporting. Calls are distributed to available agents, who follow scripts and log outcomes. This structure is built for volume, consistency across many agents and compliance in industries like banking and telecom. Many call centers in Pakistan now use AI to handle routine calls and assist human agents.'),
      s('Why the model does not fit small businesses',
        'A salon or clinic does not need routing, shifts or supervisors. It needs every caller answered, questions about one business answered correctly and appointments booked. Outsourcing to a call center adds cost and distance: agents who handle many businesses rarely know yours well. An AI receptionist dedicated to your business knows your services, prices and hours exactly.'),
      s('When small businesses use call centers anyway',
        'Some businesses outsource calls during peak seasons or use answering services for after hours. These can work, but they are often more expensive per booking and less accurate than a receptionist that knows your business directly.'),
      s('The middle ground',
        'Businesses that grow into multiple branches sometimes centralise calls. Even then, a receptionist per branch, each with its own hours and services, often works better than a central team that has to look everything up.'),
    ],
  },
  'ai-receptionist-cost': {
    sections: [
      s('Where the money goes, in plain terms',
        'Each minute of a call uses speech recognition to hear the caller, an AI model to decide the reply, a voice to speak it, and the internet infrastructure that connects the call. Each has a cost per minute or per word. Short, efficient conversations cost less than long ones, which is one reason a good receptionist keeps answers brief.'),
      s('How to estimate your own usage',
        'Count how many calls your business receives in a month, including those you miss. Multiply by an average call length of two to three minutes for a booking conversation. That gives you a rough monthly minute count, which you can compare with any plan.'),
      s('Hidden costs to look for', [
        'Setup fees and charges for changes',
        'Per minute rates after included minutes run out',
        'Separate fees for phone numbers',
        'Extra charges for other languages',
        'Long contracts with cancellation fees',
      ]),
      s('Comparing with what you lose',
        'The true comparison is with the bookings you miss today. If a missed booking is worth Rs 2,000 to Rs 5,000 and you miss several a week, the monthly cost of a receptionist is often recovered in the first week of each month.'),
    ],
  },
};
