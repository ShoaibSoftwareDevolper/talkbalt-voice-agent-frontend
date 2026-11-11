'use client';

import { Fragment, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  type AgentState,
  type ReceivedMessage,
  type UseSessionReturn,
  useIsSpeaking,
  useLocalParticipant,
  useTextStream,
} from '@livekit/components-react';
import { cn } from '@/lib/utils';

/** Text stream topic the agent publishes VAD state and per-turn latency on (see agent.py). */
const PIPELINE_TOPIC = 'talkbalt.pipeline';

type UserLatency = { stt_ms: number | null; eou_ms: number | null };
type AgentLatency = { llm_ttft_ms: number | null; tts_ttfb_ms: number | null; e2e_ms: number | null };
type LlmUsage = { prompt_tokens: number; cached_tokens: number; completion_tokens: number; reasoning_tokens: number };

type PipelineEvent =
  | { type: 'user_state'; state: 'speaking' | 'listening' | 'away' }
  | ({ type: 'latency'; role: 'user' } & UserLatency)
  | ({ type: 'latency'; role: 'agent' } & AgentLatency)
  | ({ type: 'llm_usage' } & LlmUsage);

/** Reduces the agent's pipeline events to the latest VAD state and latest latency per role. */
function usePipelineEvents(session: UseSessionReturn) {
  const { textStreams } = useTextStream(PIPELINE_TOPIC, { room: session.room });

  return useMemo(() => {
    let vadState: string | null = null;
    let user: UserLatency | null = null;
    let agent: AgentLatency | null = null;
    let usage: LlmUsage | null = null;
    for (const stream of textStreams) {
      let event: PipelineEvent;
      try {
        event = JSON.parse(stream.text);
      } catch {
        continue; // still streaming in, or not ours
      }
      if (event.type === 'user_state') vadState = event.state;
      else if (event.type === 'latency' && event.role === 'user') user = event;
      else if (event.type === 'latency' && event.role === 'agent') agent = event;
      else if (event.type === 'llm_usage') usage = event;
    }
    return { vadState, user, agent, usage };
  }, [textStreams]);
}

function formatMs(value: number | null | undefined) {
  return value == null ? null : `${value} ms`;
}

type StageProps = {
  label: string;
  detail: string;
  active: boolean;
  metric?: { label: string; value: string | null };
  /** An extra line under the metric (the latest LLM request's tokens). */
  extra?: string;
  /** Changes on every event that should flash the stage (used for STT transcript updates). */
  pulseKey?: string;
};

function Stage({ label, detail, active, metric, extra, pulseKey }: StageProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-lg border px-2 py-3 text-center transition-colors duration-150',
          active
            ? 'border-brand bg-brand-soft text-brand'
            : 'border-border bg-card text-muted-foreground',
        )}
      >
        {pulseKey && (
          // Re-mounts on every transcript update, replaying a one-shot highlight.
          <span key={pulseKey} aria-hidden className="animate-stt-pulse absolute inset-0 bg-brand/20" />
        )}
        <div className="relative text-sm font-semibold tracking-wide">{label}</div>
        <div className="relative mt-0.5 truncate text-[11px] text-muted-foreground">{detail}</div>
      </div>
      <div className="h-12 text-center font-mono text-[11px] leading-4 text-muted-foreground">
        {metric && (
          <>
            <div>{metric.label}</div>
            <div className={cn(metric.value ? 'text-foreground' : 'text-muted-foreground/60')}>
              {metric.value ?? '--'}
            </div>
          </>
        )}
        {extra && <div className="text-muted-foreground">{extra}</div>}
      </div>
    </div>
  );
}

type PipelineFlowProps = {
  session: UseSessionReturn;
  agentState: AgentState;
  messages: ReceivedMessage[];
};

/**
 * Live view of the voice pipeline, driven only by real signals:
 * - Mic: LiveKit's speaking detection on the local microphone track
 * - VAD: the agent's Silero VAD user state, sent by the agent over a text stream
 * - STT: user transcription updates arriving from the agent
 * - LLM / TTS / Speaker: the agent state (`thinking` / `speaking`)
 */
export function PipelineFlow({ session, agentState, messages }: PipelineFlowProps) {
  const { localParticipant } = useLocalParticipant({ room: session.room });
  const micActive = useIsSpeaking(localParticipant);
  const { vadState, user, agent, usage } = usePipelineEvents(session);

  const lastUserTranscript = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.type === 'userTranscript') return `${m.id}:${m.message.length}`;
    }
    return undefined;
  }, [messages]);

  const stages: StageProps[] = [
    { label: 'Mic', detail: 'your audio', active: micActive },
    {
      label: 'VAD',
      detail: 'Silero',
      active: vadState === 'speaking',
      metric: { label: 'turn end', value: formatMs(user?.eou_ms) },
    },
    {
      label: 'STT',
      detail: 'Deepgram',
      active: false,
      pulseKey: lastUserTranscript,
      metric: { label: 'transcript', value: formatMs(user?.stt_ms) },
    },
    {
      label: 'LLM',
      detail: 'Groq',
      active: agentState === 'thinking',
      metric: { label: 'first token', value: formatMs(agent?.llm_ttft_ms) },
      // A request cut short (truncation, interruption) reports no usage, so zeros are hidden.
      extra: usage && usage.prompt_tokens ? `${usage.prompt_tokens} in / ${usage.completion_tokens} out` : undefined,
    },
    {
      label: 'TTS',
      detail: 'Deepgram Aura',
      active: agentState === 'speaking',
      metric: { label: 'first audio', value: formatMs(agent?.tts_ttfb_ms) },
    },
    { label: 'Speaker', detail: 'agent audio', active: agentState === 'speaking' },
  ];

  const waiting = agentState === 'listening' && !micActive && vadState !== 'speaking';

  return (
    <section aria-label="Voice pipeline" className="w-full">
      <div className="flex items-start gap-1">
        {stages.map((stage, i) => (
          <Fragment key={stage.label}>
            {i > 0 && <ChevronRight aria-hidden className="mt-4 size-4 shrink-0 text-muted-foreground/60" />}
            <Stage {...stage} />
          </Fragment>
        ))}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[11px] text-muted-foreground">
        <span>{waiting ? 'Waiting for you to speak' : ' '}</span>
        <span>
          response time{' '}
          <span className={agent?.e2e_ms != null ? 'text-foreground' : 'text-muted-foreground/60'}>
            {formatMs(agent?.e2e_ms) ?? '--'}
          </span>
        </span>
      </div>
    </section>
  );
}
