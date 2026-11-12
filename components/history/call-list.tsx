'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type CallPage, formatDuration, formatEndReason, formatMs } from '@/lib/api';
import { WaveLoader } from '@/components/motion/wave-loader';
import { useApiResource } from '@/lib/use-api-resource';
import { useMe } from '@/lib/use-me';

const PAGE_SIZE = 20;

export function CallList() {
  const [offset, setOffset] = useState(0);
  const current = useApiResource<CallPage>(`/api/calls?limit=${PAGE_SIZE}&offset=${offset}`);
  const page = current?.value;
  // Model and latency are Talkbalt's internals; business owners see when, how long and how it ended.
  const isAdmin = Boolean(useMe()?.value?.is_admin);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold text-foreground">Call history</h1>
        {page && <span className="font-mono text-xs text-muted-foreground">{page.total} calls</span>}
      </div>

      {current?.error && <p className="text-sm text-destructive">{current.error}</p>}
      {!current && <WaveLoader label="Loading calls" />}
      {page && page.items.length === 0 && (
        <p className="text-sm text-muted-foreground">No calls yet. Make a test call or share your link.</p>
      )}

      {page && page.items.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-4 py-3 font-normal">Date</th>
                <th className="px-4 py-3 font-normal">Type</th>
                <th className="px-4 py-3 font-normal">Duration</th>
                <th className="px-4 py-3 font-normal">End reason</th>
                {isAdmin && <th className="px-4 py-3 font-normal">Model</th>}
                {isAdmin && <th className="px-4 py-3 font-normal">Avg response</th>}
                <th className="px-4 py-3 font-normal">Recording</th>
              </tr>
            </thead>
            <tbody>
              {page.items.map((call) => (
                <tr key={call.id} className="border-b border-border/70 last:border-0 hover:bg-muted/60">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link href={`/app/calls/${call.id}`} className="text-foreground hover:text-brand">
                      {new Date(call.started_at).toLocaleString()}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">
                    {call.call_type}
                    {call.caller_number_masked && (
                      <span className="ml-2 font-mono text-xs text-muted-foreground">{call.caller_number_masked}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-foreground/80">{formatDuration(call.duration_seconds)}</td>
                  <td className="px-4 py-3 text-foreground/80">{formatEndReason(call.end_reason)}</td>
                  {isAdmin && <td className="max-w-40 truncate px-4 py-3 font-mono text-xs text-muted-foreground">{call.llm_model ?? '--'}</td>}
                  {isAdmin && <td className="px-4 py-3 font-mono text-foreground/80">{formatMs(call.avg_e2e_ms)}</td>}
                  <td className="px-4 py-3 text-foreground/80">{call.has_recording ? 'yes' : 'no'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {page && page.total > PAGE_SIZE && (
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <button
            type="button"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            className="hover:text-foreground disabled:opacity-30"
          >
            Newer
          </button>
          <span>
            {offset + 1}-{Math.min(offset + PAGE_SIZE, page.total)} of {page.total}
          </span>
          <button
            type="button"
            disabled={offset + PAGE_SIZE >= page.total}
            onClick={() => setOffset(offset + PAGE_SIZE)}
            className="hover:text-foreground disabled:opacity-30"
          >
            Older
          </button>
        </div>
      )}
    </section>
  );
}
