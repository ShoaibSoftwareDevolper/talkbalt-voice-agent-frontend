'use client';

import { useState } from 'react';
import {
  type CallDetail,
  type TranscriptEntry,
  formatDuration,
  formatEndReason,
  formatMs,
} from '@/lib/admin-api';
import { CallMetricsSection, Card } from '@/components/history/call-metrics';
import { useAdminResource } from '@/lib/use-admin-resource';
import { cn } from '@/lib/utils';

const MEDIA_ERRORS: Record<number, string> = {
  1: 'playback was aborted',
  2: 'a network error stopped the download',
  3: 'the browser could not decode the audio',
  4: 'the browser does not support this audio format or URL',
};

function Recording({ call, token }: { call: CallDetail; token: string }) {
  const [attempt, setAttempt] = useState(0);
  const [playError, setPlayError] = useState<string | null>(null);
  const recording = useAdminResource<{ url: string }>(
    call.has_recording ? `/api/calls/${call.id}/recording` : null,
    token,
    attempt,
  );

  if (!call.has_recording) {
    const reason =
      call.recording_status === 'disabled' ? 'Recording was off for this call.' : `Recording ${call.recording_status}.`;
    return <p className="text-sm text-zinc-500">{reason}</p>;
  }
  if (!recording) return <p className="text-sm text-zinc-500">Loading recording</p>;
  if (recording.error) {
    return (
      <p className="text-sm text-zinc-400">
        {recording.error}{' '}
        <button type="button" onClick={() => setAttempt(attempt + 1)} className="text-sky-300 hover:text-sky-200">
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
        className="h-10 w-full scheme-dark"
        onError={(e) => {
          const code = e.currentTarget.error?.code ?? 0;
          const reason = MEDIA_ERRORS[code] ?? 'unknown error';
          console.error(`Recording playback failed (code ${code}): ${reason}`);
          setPlayError(reason);
        }}
      />
      <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
        {playError && <span className="text-red-400">Could not play here: {playError}.</span>}
        <a href={url} target="_blank" rel="noreferrer" className="text-sky-300 hover:text-sky-200">
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
  return <div className="font-mono text-[11px] text-zinc-500">{parts.join(' · ')}</div>;
}

function Transcript({ entries }: { entries: TranscriptEntry[] }) {
  if (entries.length === 0) return <p className="text-sm text-zinc-500">No transcript for this call.</p>;
  return (
    <ol className="flex flex-col gap-4">
      {entries.map((entry, i) => {
        const isUser = entry.role === 'user';
        return (
          <li key={i} className={cn('flex flex-col gap-1', isUser ? 'items-end' : 'items-start')}>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span>{isUser ? 'Caller' : 'Talkbalt'}</span>
              <span>{new Date(entry.timestamp).toLocaleTimeString()}</span>
              {entry.interrupted && <span className="text-amber-400/80">interrupted</span>}
            </div>
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2 text-sm',
                isUser ? 'bg-sky-400/15 text-sky-50' : 'border border-white/10 bg-white/[0.03] text-zinc-100',
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

export function CallDetailView({ id, token }: { id: string; token: string }) {
  const call = useAdminResource<CallDetail>(`/api/calls/${id}`, token);

  if (!call) return <p className="text-sm text-zinc-500">Loading</p>;
  if (call.error || !call.value) return <p className="text-sm text-red-400">{call.error ?? 'Call not found'}</p>;
  const c = call.value;

  return (
    <article className="flex flex-col gap-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-xl font-semibold text-zinc-100">{new Date(c.started_at).toLocaleString()}</h1>
        <span className="font-mono text-xs text-zinc-500">{c.room_name}</span>
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
      <p className="font-mono text-xs text-zinc-500">model {c.llm_model ?? '--'}</p>

      <section className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-zinc-300">Recording</h2>
        <Recording call={c} token={token} />
      </section>

      <CallMetricsSection callId={c.id} startedAt={c.started_at} token={token} />

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-zinc-300">Transcript</h2>
        <Transcript entries={c.transcript} />
      </section>
    </article>
  );
}
