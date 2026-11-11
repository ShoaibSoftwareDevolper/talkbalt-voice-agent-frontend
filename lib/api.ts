export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

/**
 * Calls the Talkbalt API (`/api/...`) through the Next.js proxy in app/api/backend, which carries
 * the session cookie. Errors carry the HTTP status; a 401 (session ended) is handled by the
 * dashboard shell, which sends the browser back to the login page.
 */
export async function api<T>(path: string, init?: { method?: string; body?: unknown }): Promise<T> {
  const res = await fetch(path.replace(/^\/api\//, '/api/backend/'), {
    method: init?.method ?? 'GET',
    headers: init?.body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });
  if (!res.ok) {
    const detail = await res
      .json()
      .then((body: { detail?: unknown }) =>
        typeof body.detail === 'string'
          ? body.detail
          : Array.isArray(body.detail)
            ? body.detail.map((d: { msg?: string }) => d.msg?.replace(/^Value error, /, '')).join('. ')
            : undefined,
      )
      .catch(() => undefined);
    throw new ApiError(detail ?? `Request failed with status ${res.status}`, res.status);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

export type TurnMetrics = {
  stt_ms?: number | null;
  eou_ms?: number | null;
  llm_ttft_ms?: number | null;
  tts_ttfb_ms?: number | null;
  e2e_ms?: number | null;
};

export type TranscriptEntry = {
  role: 'user' | 'agent';
  text: string;
  timestamp: string;
  metrics: TurnMetrics;
  /** The caller talked over the agent; `text` is only the part that was spoken. */
  interrupted?: boolean;
};

export type CallSummary = {
  id: string;
  room_name: string;
  call_type: 'web' | 'phone';
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  end_reason: string | null;
  llm_model: string | null;
  recording_status: string;
  has_recording: boolean;
  turn_count: number;
  avg_e2e_ms: number | null;
  caller_number_masked: string | null;
};

export type CallDetail = CallSummary & {
  avg_stt_ms: number | null;
  avg_llm_ttft_ms: number | null;
  avg_tts_ttfb_ms: number | null;
  transcript: TranscriptEntry[];
};

export type CallPage = { items: CallSummary[]; total: number; limit: number; offset: number };

export function formatDuration(seconds: number | null) {
  if (seconds == null) return '--';
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function formatMs(value: number | null | undefined) {
  return value == null ? '--' : `${value} ms`;
}

export function formatEndReason(reason: string | null) {
  return reason ? reason.replaceAll('_', ' ') : 'in progress';
}

export type TurnMetricRow = {
  turn_index: number;
  role: 'user' | 'agent';
  started_at: string | null;
  ended_at: string | null;
  stt_audio_seconds: number | null;
  eou_delay_ms: number | null;
  transcription_delay_ms: number | null;
  llm_requests: number | null;
  llm_ttft_ms: number | null;
  llm_duration_ms: number | null;
  prompt_tokens: number | null;
  prompt_cached_tokens: number | null;
  completion_tokens: number | null;
  reasoning_tokens: number | null;
  tokens_per_second: number | null;
  tts_ttfb_ms: number | null;
  tts_characters: number | null;
  tts_audio_seconds: number | null;
  e2e_ms: number | null;
  interrupted: boolean;
  cancelled: boolean;
};

export type CallEventRow = { timestamp: string; type: string; detail: string | null };

export type CostBreakdown = { components: Record<string, number>; missing_prices: string[]; estimated: boolean };

export type CallMetrics = {
  has_metrics: boolean;
  summary: {
    total_prompt_tokens: number | null;
    total_cached_tokens: number | null;
    total_completion_tokens: number | null;
    total_reasoning_tokens: number | null;
    llm_requests: number | null;
    total_stt_audio_seconds: number | null;
    total_tts_characters: number | null;
    total_tts_audio_seconds: number | null;
    cache_hit_ratio: number | null;
    estimated_cost_usd: number | null;
    cost_breakdown: CostBreakdown | null;
  };
  turns: TurnMetricRow[];
  events: CallEventRow[];
};

export type StageKey = 'stt' | 'end_of_turn' | 'llm_ttft' | 'tts_ttfb' | 'e2e';

export type AnalyticsDay = {
  date: string;
  calls: number;
  phone_calls: number;
  tokens: { uncached_input: number; cached_input: number; output: number; reasoning: number };
  cache_hit_ratio: number | null;
  estimated_cost_usd: number | null;
  latency_ms: Record<StageKey, { avg: number | null; p95: number | null }>;
};

export type Breakdown = { key: string; calls: number }[];

export type Analytics = {
  from: string;
  to: string;
  timezone: string;
  days: AnalyticsDay[];
  outcomes: Breakdown;
  call_types: Breakdown;
  models: Breakdown;
  costs_are_estimates: boolean;
};

export type UsageMeter = {
  key: string;
  label: string;
  used: number | null;
  limit: number | null;
  unit: string;
  period: 'month' | 'day';
  note: string;
};

export type Usage = { source: string; month: string; meters: UsageMeter[] };

export function formatUsd(value: number | null | undefined) {
  if (value == null) return '--';
  return value < 0.01 ? `$${value.toFixed(4)}` : `$${value.toFixed(2)}`;
}

export function formatNumber(value: number | null | undefined) {
  return value == null ? '--' : value.toLocaleString();
}

export type ServiceRow = {
  id: string;
  kind: 'service' | 'product';
  name: string;
  description: string | null;
  duration_min: number;
  price_cents: number | null;
  currency: string;
  active: boolean;
};

export type HoursWindow = { weekday: number; opens: string; closes: string };

export type BookingRow = {
  id: string;
  service_name: string;
  starts_at: string;
  ends_at: string;
  status: 'confirmed' | 'cancelled';
  source: string;
  customer_name: string;
  customer_phone: string;
  call_id: string | null;
};

export type Faq = { q: string; a: string };

export type LocationType = 'in_person' | 'remote' | 'both';

export type Profile = {
  business_name: string;
  greeting: string | null;
  about: string | null;
  timezone: string;
  location_type: LocationType;
  address: string | null;
  city: string | null;
  country: string | null;
  contact_email: string | null;
  website: string | null;
  faqs: Faq[];
  public_calls_enabled: boolean;
  slug?: string | null;
};

export type PublicItem = { name: string; description: string | null; duration_min: number | null; price_cents: number | null; currency: string };

export type PublicBusiness = {
  slug: string;
  name: string;
  about: string | null;
  location_type: LocationType;
  address: string | null;
  city: string | null;
  country: string | null;
  website: string | null;
  contact_email: string | null;
  timezone: string;
  services: PublicItem[];
  products: PublicItem[];
  hours: HoursWindow[];
  faqs: Faq[];
  calls_enabled: boolean;
};

export const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function formatPrice(cents: number | null, currency: string) {
  return cents == null ? '--' : `${(cents / 100).toLocaleString()} ${currency}`;
}
