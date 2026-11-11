'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  type Analytics,
  type Breakdown,
  type StageKey,
  type Usage,
  type UsageMeter,
  formatEndReason,
  formatNumber,
  formatUsd,
} from '@/lib/api';
import { SEGMENT, TOP_RADIUS } from '@/lib/chart-marks';
import { WaveLoader } from '@/components/motion/wave-loader';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

const RANGES = [7, 30] as const;

// Categorical slots in fixed order; each stage keeps its color on every chart.
const STAGES: { key: StageKey; label: string; color: string }[] = [
  { key: 'stt', label: 'STT transcript', color: 'var(--series-1)' },
  { key: 'end_of_turn', label: 'End of turn', color: 'var(--series-2)' },
  { key: 'llm_ttft', label: 'LLM first token', color: 'var(--series-3)' },
  { key: 'tts_ttfb', label: 'TTS first audio', color: 'var(--series-4)' },
  { key: 'e2e', label: 'Response (end to end)', color: 'var(--series-5)' },
];

const tokensConfig = {
  cached_input: { label: 'Cached input', color: 'var(--series-1)' },
  uncached_input: { label: 'Uncached input', color: 'var(--series-2)' },
  output: { label: 'Output', color: 'var(--series-3)' },
  reasoning: { label: 'Reasoning', color: 'var(--series-4)' },
} satisfies ChartConfig;

const OUTCOME_COLORS = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)', 'var(--series-5)'];

function shortDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
}

function Panel({ title, note, children, className }: { title: string; note?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn('flex flex-col gap-2 rounded-xl border border-border bg-card p-4', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold text-foreground/80">{title}</h2>
        {note && <span className="text-right text-[11px] text-muted-foreground">{note}</span>}
      </div>
      {children}
    </section>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="flex h-40 items-center justify-center text-center text-sm text-muted-foreground">{children}</p>;
}

function StageChart({ days, stage }: { days: Analytics['days']; stage: (typeof STAGES)[number] }) {
  const data = days.map((d) => ({ date: shortDate(d.date), avg: d.latency_ms[stage.key].avg, p95: d.latency_ms[stage.key].p95 }));
  const hasData = data.some((d) => d.avg != null);
  const config = {
    avg: { label: 'avg', color: stage.color },
    p95: { label: 'p95', color: stage.color },
  } satisfies ChartConfig;
  return (
    <Panel title={stage.label} note="avg solid, p95 dashed (ms)">
      {hasData ? (
        <ChartContainer config={config} className="h-36 w-full">
          <LineChart data={data} margin={{ left: 4, right: 8, top: 4 }}>
            <CartesianGrid vertical={false} strokeOpacity={0.08} />
            <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} minTickGap={24} />
            <YAxis tickLine={false} axisLine={false} width={40} fontSize={10} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} dot={false} connectNulls activeDot={{ r: 4 }} />
            <Line dataKey="p95" stroke="var(--color-p95)" strokeWidth={2} strokeDasharray="4 3" dot={false} connectNulls activeDot={{ r: 4 }} />
          </LineChart>
        </ChartContainer>
      ) : (
        <Empty>No turn metrics in this range</Empty>
      )}
    </Panel>
  );
}

function BreakdownBars({ rows, format = (k) => k }: { rows: Breakdown; format?: (key: string) => string }) {
  if (rows.length === 0) return <p className="text-sm text-muted-foreground">No calls</p>;
  const max = Math.max(...rows.map((r) => r.calls));
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((r) => (
        <li key={r.key} className="flex flex-col gap-1">
          <div className="flex justify-between text-xs">
            <span className="truncate text-foreground/80">{format(r.key)}</span>
            <span className="font-mono text-muted-foreground">{r.calls}</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted">
            <div className="h-1.5 rounded-full" style={{ width: `${(r.calls / max) * 100}%`, background: 'var(--series-1)' }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Meter({ m }: { m: UsageMeter }) {
  const pct = m.used != null && m.limit ? Math.min(100, (m.used / m.limit) * 100) : null;
  // Status colors for state, always paired with the numbers in text.
  const color = pct == null ? 'var(--series-1)' : pct >= 90 ? 'var(--status-critical)' : pct >= 70 ? 'var(--status-warning)' : 'var(--status-good)';
  const fmt = (v: number | null) => (v == null ? '--' : m.unit === 'USD' ? formatUsd(v) : `${formatNumber(Math.round(v))} ${m.unit}`);
  return (
    <li className="flex flex-col gap-1">
      <div className="flex justify-between gap-3 text-xs">
        <span className="text-foreground/80">{m.label}</span>
        <span className="font-mono text-muted-foreground">
          {fmt(m.used)} / {m.limit == null ? 'limit not set' : fmt(m.limit)}
          {pct != null && ` (${pct.toFixed(0)}%)`}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-muted">
        {pct != null && <div className="h-1.5 rounded-full" style={{ width: `${Math.max(pct, 1)}%`, background: color }} />}
      </div>
      <span className="text-[11px] text-muted-foreground">{m.note}</span>
    </li>
  );
}

export function AnalyticsView() {
  const [range, setRange] = useState<(typeof RANGES)[number]>(7);
  const to = new Date();
  const from = new Date(to.getTime() - (range - 1) * 86_400_000);
  const iso = (d: Date) => d.toLocaleDateString('en-CA'); // YYYY-MM-DD in local time
  const analytics = useApiResource<Analytics>(`/api/analytics?from=${iso(from)}&to=${iso(to)}`);
  const usage = useApiResource<Usage>('/api/usage');

  const a = analytics?.value;
  const days = a?.days ?? [];
  const totalCalls = days.reduce((n, d) => n + d.calls, 0);
  const costDays = days.map((d) => ({ date: shortDate(d.date), cost: d.estimated_cost_usd }));
  const hasCost = costDays.some((d) => d.cost != null);
  const tokenDays = days.map((d) => ({ date: shortDate(d.date), ...d.tokens }));
  const hasTokens = tokenDays.some((d) => d.cached_input + d.uncached_input + d.output + d.reasoning > 0);
  const outcomes = (a?.outcomes ?? []).map((o, i) => ({ ...o, label: formatEndReason(o.key), fill: OUTCOME_COLORS[i % OUTCOME_COLORS.length] }));
  const outcomeConfig = Object.fromEntries(outcomes.map((o) => [o.key, { label: o.label, color: o.fill }])) satisfies ChartConfig;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-foreground">Analytics</h1>
        <div className="flex items-center gap-1 rounded-full border border-border p-0.5" role="group" aria-label="Date range">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={cn(
                'rounded-full px-3 py-1 font-mono text-xs',
                range === r ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {r} days
            </button>
          ))}
        </div>
      </div>

      {!analytics && <WaveLoader label="Loading analytics" />}
      {analytics?.error && <p className="text-sm text-destructive">{analytics.error}</p>}

      {a && (
        <>
          <p className="text-xs text-muted-foreground">
            {totalCalls} calls from {shortDate(a.from)} to {shortDate(a.to)} ({a.timezone}). Costs are estimates from config/pricing.toml.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Calls per day">
              {totalCalls ? (
                <ChartContainer config={{ calls: { label: 'Calls', color: 'var(--series-1)' } }} className="h-48 w-full">
                  <BarChart data={days.map((d) => ({ date: shortDate(d.date), calls: d.calls }))} margin={{ left: 4, right: 8 }}>
                    <CartesianGrid vertical={false} strokeOpacity={0.08} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} minTickGap={16} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={28} fontSize={10} />
                    <ChartTooltip cursor={{ fillOpacity: 0.06 }} content={<ChartTooltipContent />} />
                    <Bar dataKey="calls" fill="var(--color-calls)" radius={TOP_RADIUS} maxBarSize={28} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <Empty>No calls in this range</Empty>
              )}
            </Panel>

            <Panel title="Call outcomes">
              {outcomes.length ? (
                <ChartContainer config={outcomeConfig} className="h-48 w-full">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="key" hideLabel />} />
                    <Pie data={outcomes} dataKey="calls" nameKey="key" innerRadius={44} outerRadius={70} paddingAngle={2} stroke="var(--background)" strokeWidth={2}>
                      {outcomes.map((o) => <Cell key={o.key} fill={o.fill} />)}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="key" />} />
                  </PieChart>
                </ChartContainer>
              ) : (
                <Empty>No calls in this range</Empty>
              )}
            </Panel>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAGES.map((s) => <StageChart key={s.key} days={days} stage={s} />)}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel title="Tokens per day" note="reasoning is part of Groq's output; shown separately">
              {hasTokens ? (
                <ChartContainer config={tokensConfig} className="h-56 w-full">
                  <BarChart data={tokenDays} margin={{ left: 4, right: 8 }}>
                    <CartesianGrid vertical={false} strokeOpacity={0.08} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} minTickGap={16} />
                    <YAxis tickLine={false} axisLine={false} width={48} fontSize={10} />
                    <ChartTooltip cursor={{ fillOpacity: 0.06 }} content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar dataKey="cached_input" stackId="t" fill="var(--color-cached_input)" maxBarSize={28} {...SEGMENT} />
                    <Bar dataKey="uncached_input" stackId="t" fill="var(--color-uncached_input)" maxBarSize={28} {...SEGMENT} />
                    <Bar dataKey="output" stackId="t" fill="var(--color-output)" maxBarSize={28} {...SEGMENT} />
                    <Bar dataKey="reasoning" stackId="t" fill="var(--color-reasoning)" radius={TOP_RADIUS} maxBarSize={28} {...SEGMENT} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <Empty>No token data in this range (calls before metrics capture have none)</Empty>
              )}
            </Panel>

            <Panel title="Estimated cost per day">
              {hasCost ? (
                <ChartContainer config={{ cost: { label: 'Estimated cost (USD)', color: 'var(--series-1)' } }} className="h-56 w-full">
                  <BarChart data={costDays} margin={{ left: 4, right: 8 }}>
                    <CartesianGrid vertical={false} strokeOpacity={0.08} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} fontSize={10} minTickGap={16} />
                    <YAxis tickLine={false} axisLine={false} width={48} fontSize={10} />
                    <ChartTooltip cursor={{ fillOpacity: 0.06 }} content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill="var(--color-cost)" radius={TOP_RADIUS} maxBarSize={28} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <Empty>No cost estimates yet. Fill in the TODO prices in backend-web/config/pricing.toml.</Empty>
              )}
            </Panel>
          </div>

          <div className={cn('grid gap-4', usage?.value ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
            <Panel title="Web vs phone">
              <BreakdownBars rows={a.call_types} />
            </Panel>
            <Panel title="Models">
              <BreakdownBars rows={a.models} />
            </Panel>
            {/* Platform-wide free tiers: only Talkbalt's own admins get this (403 for businesses). */}
            {usage?.value && (
              <Panel title="Free tier usage" note={usage.value.month}>
                <ul className="flex flex-col gap-3">{usage.value.meters.map((m) => <Meter key={m.key} m={m} />)}</ul>
                <p className="text-[11px] text-muted-foreground">{usage.value.source}</p>
              </Panel>
            )}
          </div>
        </>
      )}
    </section>
  );
}
