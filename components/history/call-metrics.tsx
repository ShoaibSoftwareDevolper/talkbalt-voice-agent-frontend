'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { type CallEventRow, type CallMetrics, formatNumber, formatUsd } from '@/lib/api';
import { END_RADIUS, SEGMENT, TOP_RADIUS } from '@/lib/chart-marks';
import { WaveLoader } from '@/components/motion/wave-loader';
import { useApiResource } from '@/lib/use-api-resource';

// Categorical slots in fixed order (see the palette tokens in globals.css).
const waterfallConfig = {
  stt: { label: 'STT transcript', color: 'var(--series-1)' },
  eou_wait: { label: 'End-of-turn wait', color: 'var(--series-2)' },
  llm: { label: 'LLM first token', color: 'var(--series-3)' },
  tts: { label: 'TTS first audio', color: 'var(--series-4)' },
} satisfies ChartConfig;

const tokensConfig = {
  cached: { label: 'Cached input', color: 'var(--series-1)' },
  uncached: { label: 'Uncached input', color: 'var(--series-2)' },
  output: { label: 'Output', color: 'var(--series-3)' },
  reasoning: { label: 'Reasoning', color: 'var(--series-4)' },
} satisfies ChartConfig;

// Events: status colors carry state, always next to a text label (never color alone).
const EVENT_STYLE: Record<string, { label: string; color: string }> = {
  llm_error: { label: 'LLM error', color: 'var(--status-critical)' },
  llm_fallback: { label: 'LLM fallback', color: 'var(--status-serious)' },
  rate_limited: { label: 'Rate limited', color: 'var(--status-serious)' },
  truncation_net: { label: 'Reply truncated', color: 'var(--status-warning)' },
  end_call_blocked: { label: 'Hang-up blocked', color: 'var(--status-warning)' },
  interruption: { label: 'Interrupted', color: 'var(--status-warning)' },
  end_call_allowed: { label: 'Hang-up allowed', color: 'var(--status-good)' },
  recording_status_change: { label: 'Recording', color: 'rgb(161 161 170)' },
};


export function Card({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">{label}</div>
      <div className="mt-0.5 font-mono text-sm text-foreground">{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function TableView({ columns, rows }: { columns: string[]; rows: (string | number | null)[][] }) {
  return (
    <details className="mt-2 text-xs text-muted-foreground">
      <summary className="cursor-pointer text-muted-foreground hover:text-foreground/80">View as table</summary>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full font-mono">
          <thead className="text-muted-foreground">
            <tr>{columns.map((c) => <th key={c} className="px-2 py-1 text-left font-normal">{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border/70">
                {r.map((v, j) => <td key={j} className="px-2 py-1">{v ?? '--'}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground/80">{title}</h2>
        {note && <span className="text-[11px] text-muted-foreground">{note}</span>}
      </div>
      {children}
    </section>
  );
}

function EventTimeline({ events, startedAt }: { events: CallEventRow[]; startedAt: string }) {
  if (events.length === 0) return <p className="text-sm text-muted-foreground">No events in this call.</p>;
  const start = new Date(startedAt).getTime();
  return (
    <ol className="flex flex-col gap-1.5">
      {events.map((e, i) => {
        const style = EVENT_STYLE[e.type] ?? { label: e.type, color: 'rgb(161 161 170)' };
        const offset = Math.max(0, (new Date(e.timestamp).getTime() - start) / 1000);
        return (
          <li key={i} className="flex items-baseline gap-3 text-sm">
            <span className="w-16 shrink-0 text-right font-mono text-xs text-muted-foreground">+{offset.toFixed(1)}s</span>
            <span aria-hidden className="size-2 shrink-0 translate-y-[-1px] rounded-full" style={{ background: style.color }} />
            <span className="text-foreground">{style.label}</span>
            {e.detail && <span className="truncate text-xs text-muted-foreground">{e.detail}</span>}
          </li>
        );
      })}
    </ol>
  );
}

export function CallMetricsSection({ callId, startedAt }: { callId: string; startedAt: string }) {
  const loaded = useApiResource<CallMetrics>(`/api/calls/${callId}/metrics`);
  if (!loaded) return <WaveLoader label="Loading metrics" />;
  if (loaded.error || !loaded.value) return <p className="text-sm text-destructive">{loaded.error}</p>;
  const m = loaded.value;
  if (!m.has_metrics) {
    return (
      <p className="rounded-lg border border-border bg-card px-3 py-3 text-sm text-muted-foreground">
        Detailed metrics are not available for this call. They are recorded for calls made after metrics capture was added.
      </p>
    );
  }

  const s = m.summary;
  const totalTokens = (s.total_prompt_tokens ?? 0) + (s.total_completion_tokens ?? 0);
  const missing = s.cost_breakdown?.missing_prices ?? [];

  // One waterfall row per agent turn, using the user turn right before it.
  const waterfall: Record<string, number | string | null>[] = [];
  m.turns.forEach((t, i) => {
    if (t.role !== 'agent') return;
    const prev = m.turns[i - 1]?.role === 'user' ? m.turns[i - 1] : undefined;
    const stt = prev?.transcription_delay_ms ?? 0;
    // end_of_turn_delay already includes the transcription delay.
    const eouWait = Math.max(0, (prev?.eou_delay_ms ?? 0) - stt);
    waterfall.push({
      turn: `Turn ${t.turn_index}`,
      stt: prev ? stt : 0,
      eou_wait: prev ? eouWait : 0,
      llm: t.llm_ttft_ms ?? 0,
      tts: t.tts_ttfb_ms ?? 0,
      e2e: t.e2e_ms,
    });
  });

  const tokenRows = m.turns
    .filter((t) => t.role === 'agent')
    .map((t) => {
      const prompt = t.prompt_tokens ?? 0;
      const cached = t.prompt_cached_tokens ?? 0;
      const reasoning = t.reasoning_tokens ?? 0;
      return {
        turn: `Turn ${t.turn_index}`,
        cached,
        uncached: Math.max(0, prompt - cached),
        // Groq counts reasoning inside completion tokens; split it out so the stack doesn't double count.
        output: Math.max(0, (t.completion_tokens ?? 0) - reasoning),
        reasoning,
        requests: t.llm_requests,
        noUsage: t.prompt_tokens == null,
      };
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Card label="Total tokens" value={formatNumber(totalTokens)} hint={`${formatNumber(s.llm_requests)} LLM requests`} />
        <Card label="Cache hit" value={s.cache_hit_ratio == null ? '--' : `${(s.cache_hit_ratio * 100).toFixed(1)}%`} hint="cached / prompt tokens" />
        <Card label="STT audio" value={s.total_stt_audio_seconds == null ? '--' : `${s.total_stt_audio_seconds.toFixed(0)} s`} />
        <Card label="TTS characters" value={formatNumber(s.total_tts_characters)} />
        <Card
          label="Estimated cost"
          value={formatUsd(s.estimated_cost_usd)}
          hint={missing.length ? `price not set: ${missing.join(', ')}` : 'estimate'}
        />
      </div>

      <Section title="Turn waterfall" note="time from the caller stopping to the agent's first audio">
        {waterfall.length === 0 ? (
          <p className="text-sm text-muted-foreground">No agent turns.</p>
        ) : (
          <>
            <ChartContainer config={waterfallConfig} className="w-full" style={{ height: 40 + waterfall.length * 30 }}>
              <BarChart data={waterfall} layout="vertical" margin={{ left: 8, right: 16 }} barCategoryGap={6}>
                <CartesianGrid horizontal={false} strokeOpacity={0.08} />
                <XAxis type="number" unit=" ms" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis type="category" dataKey="turn" width={56} tickLine={false} axisLine={false} fontSize={11} />
                <ChartTooltip cursor={{ fillOpacity: 0.06 }} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="stt" stackId="t" fill="var(--color-stt)" {...SEGMENT} />
                <Bar dataKey="eou_wait" stackId="t" fill="var(--color-eou_wait)" {...SEGMENT} />
                <Bar dataKey="llm" stackId="t" fill="var(--color-llm)" {...SEGMENT} />
                <Bar dataKey="tts" stackId="t" fill="var(--color-tts)" radius={END_RADIUS} {...SEGMENT} />
              </BarChart>
            </ChartContainer>
            <TableView
              columns={['turn', 'STT ms', 'end-of-turn wait ms', 'LLM first token ms', 'TTS first audio ms', 'response ms']}
              rows={waterfall.map((r) => [r.turn, r.stt, r.eou_wait, r.llm, r.tts, r.e2e])}
            />
          </>
        )}
      </Section>

      <Section title="Tokens per turn" note="reasoning is part of Groq's output tokens; shown separately">
        {tokenRows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No LLM requests.</p>
        ) : (
          <>
            <ChartContainer config={tokensConfig} className="h-56 w-full">
              <BarChart data={tokenRows} margin={{ left: 8, right: 8 }} barCategoryGap="30%">
                <CartesianGrid vertical={false} strokeOpacity={0.08} />
                <XAxis dataKey="turn" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickLine={false} axisLine={false} width={48} fontSize={11} />
                <ChartTooltip cursor={{ fillOpacity: 0.06 }} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="cached" stackId="k" fill="var(--color-cached)" {...SEGMENT} />
                <Bar dataKey="uncached" stackId="k" fill="var(--color-uncached)" {...SEGMENT} />
                <Bar dataKey="output" stackId="k" fill="var(--color-output)" {...SEGMENT} />
                <Bar dataKey="reasoning" stackId="k" fill="var(--color-reasoning)" radius={TOP_RADIUS} {...SEGMENT} />
              </BarChart>
            </ChartContainer>
            {tokenRows.some((r) => r.noUsage) && (
              <p className="text-[11px] text-muted-foreground">
                Some requests have no token counts: they were cut short (truncation or interruption) before the provider reported usage.
              </p>
            )}
            <TableView
              columns={['turn', 'cached', 'uncached', 'output', 'reasoning', 'requests']}
              rows={tokenRows.map((r) => [r.turn, r.cached, r.uncached, r.output, r.reasoning, r.requests])}
            />
          </>
        )}
      </Section>

      <Section title="Events">
        <EventTimeline events={m.events} startedAt={startedAt} />
      </Section>
    </div>
  );
}
