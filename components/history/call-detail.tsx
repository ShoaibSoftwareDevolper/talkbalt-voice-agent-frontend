'use client';

import { useState } from 'react';
import {
  type CallDetail,
  type TranscriptEntry,
  formatDuration,
  formatEndReason,
  formatMs,
} from '@/lib/api';
import { CallMetricsSection, Card } from '@/components/history/call-metrics';
import { WaveLoader } from '@/components/motion/wave-loader';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

const MEDIA_ERRORS: Record<number, string> = {
  1: 'playback was aborted',
  2: 'a network error stopped the download',
  3: 'the browser could not decode the audio',
  4: 'the browser does not support this audio format or URL',
};

function Recording({ call }: { call: CallDetail }) {
  const [attempt, setAttempt] = useState(0);
  const [playError, setPlayError] = useState<string | null>(null);
  const recording = useApiResource<{ url: string }>(
    call.has_recording ? `/api/calls/${call.id}/recording` : null,
    attempt,
  );

  if (!call.has_recording) {
    const reason =
      call.recording_status === 'disabled' ? 'Recording was off for this call.' : `Recording ${call.recording_status}.`;
    return <p className="text-sm text-muted-foreground">{reason}</p>;
  }
  if (!recording) return <WaveLoader label="Loading recording" className="py-2" />;
  if (recording.error) {
    return (
      <p className="text-sm text-muted-foreground">
        {recording.error}{' '}
        <button type="button" onClick={() => setAttempt(attempt + 1)} className="text-brand hover:text-brand/80">
          Try again
        </button>
      </p>
    );
  }
  // The presigned URL expires after a few minutes, which only matters for starting playback.
  const url = recording.value?.url;
  return (
    <div className="flex flex-col gap-2">
      <audio
        controls
        preload="metadata"
        src={url}
        className="h-10 w-full"
        onError={(e) => {
          const code = e.currentTarget.error?.code ?? 0;
          const reason = MEDIA_ERRORS[code] ?? 'unknown error';
          console.error(`Recording playback failed (code ${code}): ${reason}`);
          setPlayError(reason);
        }}
      />
      <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
        {playError && <span className="text-destructive">Could not play here: {playError}.</span>}
        <a href={url} target="_blank" rel="noreferrer" className="text-brand hover:text-brand/80">
          Open recording
        </a>
      </div>
    </div>
  );
}

function TurnMetricsLine({ entry }: { entry: TranscriptEntry }) {
  const m = entry.metrics ?? {};
  const parts =
    entry.role === 'user'
      ? [`STT ${formatMs(m.stt_ms)}`, `turn end ${formatMs(m.eou_ms)}`]
      : [`LLM ${formatMs(m.llm_ttft_ms)}`, `TTS ${formatMs(m.tts_ttfb_ms)}`, `response ${formatMs(m.e2e_ms)}`];
  return <div className="font-mono text-[11px] text-muted-foreground">{parts.join(' · ')}</div>;
}

function Transcript({ entries }: { entries: TranscriptEntry[] }) {
  if (entries.length === 0) return <p className="text-sm text-muted-foreground">No transcript for this call.</p>;
  return (
    <ol className="flex flex-col gap-4">
      {entries.map((entry, i) => {
        const isUser = entry.role === 'user';
        return (
          <li key={i} className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted-foreground">
              <span>{isUser ? 'Caller' : 'Talkbalt'}</span>
              <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
              {entry.interrupted && <span className="text-amber-600">interrupted</span>}
            </div>
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                isUser ? 'bg-brand text-brand-foreground' : 'border border-border bg-card text-foreground',
              )}
            >
              {entry.text}
            </div>
            <TurnMetricsLine entry={entry} />
          </li>
        );
      })}
    </ol>
  );
}

export function CallDetailView({ id }: { id: string }) {
  const call = useApiResource<CallDetail>(`/api/calls/${id}`);

  if (!call) return <WaveLoader label="Loading call" />;
  if (call.error || !call.value) return <p className="text-sm text-destructive">{call.error ?? 'Call not found'}</p>;
  const c = call.value;

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-semibold text-foreground">{new Date(c.started_at).toLocaleString()}</h1>
        <span className="font-mono text-xs text-muted-foreground">{c.room_name}</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Card label="Type" value={c.caller_number_masked ? `${c.call_type} ${c.caller_number_masked}` : c.call_type} />
        <Card label="Duration" value={formatDuration(c.duration_seconds)} />
        <Card label="End reason" value={formatEndReason(c.end_reason)} />
        <Card label="Turns" value={String(c.turn_count)} />
        <Card label="Avg STT" value={formatMs(c.avg_stt_ms)} />
        <Card label="Avg LLM first token" value={formatMs(c.avg_llm_ttft_ms)} />
        <Card label="Avg TTS first audio" value={formatMs(c.avg_tts_ttfb_ms)} />
        <Card label="Avg response" value={formatMs(c.avg_e2e_ms)} />
      </div>
      <p className="font-mono text-xs text-muted-foreground">model {c.llm_model ?? '--'}</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-foreground/80">Recording</h2>
        <Recording call={c} />
      </section>

      <CallMetricsSection callId={c.id} startedAt={c.started_at} />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground/80">Transcript</h2>
        <Transcript entries={c.transcript} />
      </section>
    </article>
  );
}
