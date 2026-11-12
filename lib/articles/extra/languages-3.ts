import { type Extra, s } from '../types';

export const LANGUAGES_EXTRA_3: Record<string, Extra> = {
  'choose-receptionist-language': {
    sections: [
      s('Three example businesses',
        'A family salon in Gulshan-e-Iqbal, Karachi, hears almost every caller start with "Assalam o alaikum" and continue in Urdu with English service names. Urdu is the obvious choice. A dermatology clinic in F-7, Islamabad, gets many calls from professionals and expatriates who start in English and stay there, so English fits better, even though the clinic staff speak Urdu among themselves. A tuition academy in Lahore talks mostly to parents, many of whom are more comfortable in Urdu than in English, even though the classes themselves are taught in English. Urdu wins again.',
        'In each case the right answer came from looking at who calls, not from the language on the signboard or the language of the service itself.'),
      s('Mistakes to avoid when choosing', [
        'Choosing English because it sounds more professional, when most callers speak Urdu',
        'Choosing based on what you prefer rather than what your customers use',
        'Forgetting to rewrite the greeting after switching language',
        'Switching language every week, which confuses regular callers',
        'Judging the choice on one test call instead of a month of real calls',
      ]),
    ],
  },
  'business-info-in-any-language': {
    sections: [
      s('A worked example',
        'A physiotherapy clinic owner writes these FAQs quickly on her phone: "Ghar par session bhi hota hai, DHA aur Gulberg mein." "First visit 45 minute ka hota hai." "Female physio available hai." Her receptionist speaks English. When a caller asks "do you come home?", the receptionist answers in English that home sessions are available in DHA and Gulberg. When another asks how long the first visit takes, it says about 45 minutes. The owner never wrote a word of formal English, and every caller got a clear answer.'),
      s('When to write in the receptionist language anyway',
        'For a few sensitive facts, such as cancellation policies or anything involving money, some owners prefer to write the answer in the receptionist language themselves so the exact meaning is under their control. That is a reasonable choice. For everything else, write whatever is fastest and let the receptionist phrase it.'),
    ],
  },
  'pakistani-phone-numbers-read-back': {
    sections: [
      s('An example conversation',
        [
          'Receptionist: Aap ka phone number kya hai?',
          'Caller: Zero three double zero.',
          'Receptionist: Ji, aage bataiye.',
          'Caller: One two three, four five six seven.',
          'Receptionist: Main number dohra deti hoon: zero three zero zero, one two three, four five six seven. Kya ye sahi hai?',
          'Caller: Ji bilkul.',
        ]),
      s('What the caller gains',
        'A read back takes a few seconds and gives the caller confidence that the business will actually be able to reach them. Many callers have had the experience of booking somewhere and never hearing back because a number was written down wrong. Hearing it read back carefully is a small signal that your business pays attention to details.'),
    ],
  },
  'urdu-english-mixed-callers': {
    sections: [
      s('Why one reply language helps mixed callers',
        'It might seem that a caller who mixes languages would prefer a receptionist that mixes too. In practice, a receptionist that keeps to one language is easier to follow, because the caller does not have to keep adjusting to the reply. Mixed callers understand both languages; what they need is to be understood, and a clear, consistent answer. The receptionist still keeps English service names and English numbers where customers expect them, so its Urdu replies sound like normal Pakistani Urdu rather than textbook Urdu.'),
      s('When speech recognition struggles',
        'Very noisy places, such as a busy road or a wedding hall, and very fast speech can still cause mishearings. When that happens, the receptionist asks the caller to repeat in simpler words, and booking details are never saved from an unclear answer. A caller in a noisy place can also simply move somewhere quieter and continue the same call.'),
    ],
  },
  'ai-voice-agent-hindi': {
    sections: [
      s('Polite closings in Hindi',
        'A Hindi receptionist closes calls with natural phrases such as "धन्यवाद" and a short goodbye, and it recognises closings from callers in Hindi, Urdu or English. It does not hang up when a caller only says thanks in the middle of a booking; it ends the call only when the caller clearly says they are done, or says no after being asked if they need anything else.'),
      s('Questions Hindi speaking callers often ask', [
        'Kitne baje tak khule hain?',
        'Is service ka kitna charge hai?',
        'Kal ka slot milega?',
        'Address kya hai?',
      ]),
    ],
  },
  'receptionist-greeting-examples': {
    sections: [
      s('A greeting checklist', [
        'Starts with a greeting such as Assalam o alaikum, Hello or Namaste',
        'Says your business name clearly',
        'Offers help or asks how it can help',
        'Is written in the same language and script as your receptionist',
        'Uses the right gender form for your voice in Urdu or Hindi',
        'Is short enough to say in about three seconds',
      ]),
      s('If you are not sure what to write',
        'Leave the greeting empty. The receptionist then greets in its own words in your chosen language, saying your business name and offering help. That default works well, and you can write your own greeting later.'),
    ],
  },
  'dates-and-times-in-urdu': {
    sections: [
      s('An example with a correction',
        [
          'Caller: Kal shaam chhe baje ka slot hai?',
          'Receptionist: Kal Itwaar hai aur hum Itwaar ko band hote hain. Peer ko shaam chhe baje ka waqt khali hai. Kya woh theek rahega?',
          'Caller: Haan, Peer theek hai.',
        ]),
      s('The point of the example', 'The caller did not need to know you are closed on Sundays. The receptionist worked out which day "kal" was, checked your hours, and offered the nearest working alternative in one sentence.'),
    ],
  },
  'ai-voice-chat-urdu-for-business': {
    sections: [
      s('Voice versus typing in Urdu',
        'Typing Urdu on a phone is slow for most people. Some type Roman Urdu, some switch to an Urdu keyboard, many simply send voice notes. Voice notes are natural, but someone at your business still has to listen and reply. A voice assistant gives callers the ease of speaking with an immediate answer, which is why Urdu speaking customers often prefer it to chat.'),
    ],
  },
  'reading-urdu-transcripts': {
    sections: [
      s('Sharing what you learn with staff', 'When transcripts reveal a common question, tell your staff too. If callers keep asking about parking, your counter staff are probably being asked as well, and a clear sign or answer helps everyone.'),
    ],
  },
  'multilingual-receptionist-pakistan': {
    sections: [
      s('Test with real callers', 'The simplest test of a multilingual receptionist is to ask three regular customers who speak differently to call it. Their experience tells you more than any feature list.'),
    ],
  },
  'natural-urdu-receptionist-tips': {
    sections: [
      s('A final check', 'Ask a staff member who speaks with customers every day to listen to a test call. If they say it sounds like something they would say, you are done.'),
    ],
  },
};
