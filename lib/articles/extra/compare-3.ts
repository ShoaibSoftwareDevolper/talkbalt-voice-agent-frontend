import { type Extra, s } from '../types';

export const COMPARE_EXTRA_3: Record<string, Extra> = {
  'ai-receptionist-vs-virtual-receptionist': {
    sections: [
      s('An example comparison',
        'A small clinic in Islamabad compares a virtual receptionist service with an AI receptionist. The virtual service offers English speaking agents during working hours, with calls after 6 pm going to voicemail, and charges per call. The AI receptionist answers in Urdu or English at any hour, books directly into the clinic calendar and charges by usage. The clinic patients mostly speak Urdu and often call in the evening. For this clinic, the AI receptionist fits better. A law firm with complex, sensitive calls in English might reasonably decide the other way.'),
      s('Questions to ask a virtual receptionist service', [
        'Who will answer, and how are they trained on my business?',
        'Do agents speak Urdu?',
        'What happens outside your working hours?',
        'How do you book appointments into my calendar?',
        'How is my customer information protected?',
      ]),
    ],
  },
  'ai-receptionist-vs-chatbot': {
    sections: [
      s('What customers expect in Pakistan',
        'Pakistani customers are used to calling a shop or sending a voice note. Many are less used to filling in chatbot forms. A voice receptionist matches the habit of calling while removing the frustration of no answer. That familiarity is one reason voice tends to work well for local service businesses here.'),
      s('When to choose a chatbot', 'If your customers are mostly young, tech comfortable and prefer silent interactions, or your bookings need detailed choices from long menus, a chatbot or booking form may suit them. Many businesses offer both.'),
    ],
  },
  'ai-receptionist-vs-call-center': {
    sections: [
      s('Quality and accountability',
        'With a call center, quality depends on which agent answers and how well they were briefed. With an AI receptionist, every call follows the same rules and every call is transcribed for you to read. If something goes wrong, you can see exactly what was said and fix the information behind it the same day.'),
    ],
  },
  'ai-receptionist-vs-human-receptionist': {
    sections: [
      s('What customers say', 'Customers rarely care who answers; they care about being answered, understood and booked. Whichever option gives them that most reliably, at the times they call, is the right one for your business.'),
      s('Trying it without risk', 'You do not have to choose overnight. Add an AI receptionist for after hours first, keep your current setup during the day, and compare results after a month.'),
    ],
  },
  'ai-receptionist-cost': {
    sections: [
      s('Free tiers and trials', 'Some services offer free trials or limited free usage. Use them to test with real customers, not just your own calls, so you see real usage and real results before paying.'),
      s('Pricing for Pakistani businesses', 'Prices quoted in dollars can change with the exchange rate. Ask whether pricing is fixed in rupees or dollars, and plan for changes if it is in dollars.'),
    ],
  },
  'what-is-an-ai-voice-agent': {
    sections: [
      s('Where things are heading', 'Voice agents are getting faster, more natural and better at more languages each year. For businesses, the practical question is not whether the technology is impressive but whether it reliably answers your customers and books them. Test that, and the rest follows.'),
    ],
  },
};
