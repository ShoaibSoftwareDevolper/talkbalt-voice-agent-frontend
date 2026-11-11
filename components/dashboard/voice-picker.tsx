'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { AgentLanguage, VoiceKey } from '@/lib/api';
import { cn } from '@/lib/utils';

/**
 * The receptionist's language and voice. The voices are Cartesia voices (backend-web/agent/voices.py,
 * same keys); each sample in public/voices/ was made with the model, voice and language a call uses,
 * so it is what callers will hear.
 */
export const LANGUAGES: { value: AgentLanguage; label: string; native: string }[] = [
  { value: 'en', label: 'English', native: 'English' },
  { value: 'ur', label: 'Urdu', native: 'اردو' },
  { value: 'hi', label: 'Hindi', native: 'हिन्दी' },
];

/** The language a text is written in, judged from its script (the agent decides the same way). */
export function scriptLanguage(text: string): AgentLanguage | null {
  if (/[\u0600-\u06FF]/.test(text)) return 'ur';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/[A-Za-z]/.test(text)) return 'en';
  return null;
}

export const VOICES: { key: VoiceKey; name: string; gender: 'Female' | 'Male'; note: string }[] = [
  { key: 'kiara', name: 'Kiara', gender: 'Female', note: 'Bright and cheerful, South Asian accent' },
  { key: 'janvi', name: 'Janvi', gender: 'Female', note: 'Steady and calm, like a front desk' },
  { key: 'nora', name: 'Nora', gender: 'Female', note: 'Soft and neutral' },
  { key: 'devansh', name: 'Devansh', gender: 'Male', note: 'Warm and helpful, South Asian accent' },
  { key: 'krishna', name: 'Krishna', gender: 'Male', note: 'Friendly and easygoing' },
  { key: 'daniel', name: 'Daniel', gender: 'Male', note: 'Clear and crisp' },
];

export function VoicePicker({
  language,
  voice,
  onLanguage,
  onVoice,
}: {
  language: AgentLanguage;
  voice: VoiceKey;
  onLanguage: (value: AgentLanguage) => void;
  onVoice: (value: VoiceKey) => void;
}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState<VoiceKey | null>(null);

  // One sample at a time; stop it when the page goes away.
  useEffect(() => () => audio.current?.pause(), []);

  const play = (key: VoiceKey, lang: AgentLanguage = language) => {
    audio.current?.pause();
    if (playing === key && lang === language) {
      setPlaying(null);
      return;
    }
    const el = new Audio(`/voices/${key}-${lang}.mp3`);
    el.onended = () => setPlaying(null);
    audio.current = el;
    setPlaying(key);
    el.play().catch(() => setPlaying(null));
  };

  const chooseLanguage = (value: AgentLanguage) => {
    onLanguage(value);
    if (playing) play(playing, value); // hear the same voice in the new language straight away
  };

  return (
    <>
      <div role="radiogroup" aria-label="Language the receptionist speaks" className="grid gap-2 sm:col-span-2 sm:grid-cols-3">
        {LANGUAGES.map((l) => (
          <button
            key={l.value}
            type="button"
            role="radio"
            aria-checked={language === l.value}
            onClick={() => chooseLanguage(l.value)}
            className={cn(
              'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm',
              language === l.value ? 'border-brand bg-brand-soft text-brand' : 'border-border text-foreground hover:bg-muted/50',
            )}
          >
            <span className="font-medium">{l.label}</span>
            <span className={language === l.value ? 'text-brand' : 'text-muted-foreground'}>{l.native}</span>
          </button>
        ))}
      </div>

      <div role="radiogroup" aria-label="Receptionist voice" className="grid gap-2 sm:col-span-2 sm:grid-cols-2 xl:grid-cols-3">
        {VOICES.map((v) => {
          const selected = voice === v.key;
          return (
            <div
              key={v.key}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3',
                selected ? 'border-brand bg-brand-soft' : 'border-border hover:bg-muted/50',
              )}
            >
              <button
                type="button"
                onClick={() => play(v.key)}
                aria-label={`${playing === v.key ? 'Stop' : 'Play'} ${v.name} speaking ${LANGUAGES.find((l) => l.value === language)?.label}`}
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-full',
                  playing === v.key ? 'bg-brand text-white' : 'bg-foreground text-background hover:bg-foreground/85',
                )}
              >
                {playing === v.key ? <Pause className="size-4" aria-hidden /> : <Play className="size-4 translate-x-px" aria-hidden />}
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onVoice(v.key)}
                className="min-w-0 flex-1 text-left"
              >
                <span className={cn('block text-sm font-medium', selected ? 'text-brand' : 'text-foreground')}>
                  {v.name} <span className="font-normal text-muted-foreground">· {v.gender}</span>
                </span>
                <span className="block truncate text-xs text-muted-foreground">{v.note}</span>
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground sm:col-span-2">
        Press play to hear a real sample in the language you chose. Callers can still speak English, Urdu or Hindi; the
        receptionist understands all three and answers in the language you set.
      </p>
    </>
  );
}
