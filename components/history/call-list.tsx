'use client';

import { useState } from 'react';
import Link from 'next/link';
import { type CallPage, formatDuration, formatEndReason, formatMs } from '@/lib/admin-api';
import { useAdminResource } from '@/lib/use-admin-resource';

const PAGE_SIZE = 20;

export function CallList({ token }: { token: string }) {
  const [offset, setOffset] = useState(0);
  const current = useAdminResource<CallPage>(`/api/calls?limit=${PAGE_SIZE}&offset=${offset}`, token);
  const page = current?.value;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h1 className="text-xl font-semibold text-zinc-100">Call history</h1>
        {page && <span className="font-mono text-xs text-zinc-500">{page.total} calls</span>}
      </div>

      {current?.error && <p className="text-sm text-red-400">{current.error}</p>}
      {!current && <p className="text-sm text-zinc-500">Loading</p>}
      {page && page.items.length === 0 && (
        <p className="text-sm text-zinc-500">No calls yet. Start a web call or dial the phone number.</p>
      )}

      {page && page.items.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-white/10 font-mono text-[11px] tracking-wide text-zinc-500 uppercase">
              <tr>
                <th className="px-4 py-3 font-normal">Date</th>
                <th className="px-4 py-3 font-normal">Type</th>
                <th className="px-4 py-3 font-normal">Duration</th>
                <th className="px-4 py-3 font-normal">End reason</th>
                <th className="px-4 py-3 font-normal">Model</th>
                <th className="px-4 py-3 font-normal">Avg response</th>
                <th className="px-4 py-3 font-normal">Recording</th>
              </tr>
            </thead>
            <tbody>
              {page.items.map((call) => (
                <tr key={call.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Link href={`/history/${call.id}`} className="text-zinc-100 hover:text-sky-300">
                      {new Date(call.started_at).toLocaleString()}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-300">
                    {call.call_type}
                    {call.caller_number_masked && (
                      <span className="ml-2 font-mono text-xs text-zinc-500">{call.caller_number_masked}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-zinc-300">{formatDuration(call.duration_seconds)}</td>
                  <td className="px-4 py-3 text-zinc-300">{formatEndReason(call.end_reason)}</td>
                  <td className="max-w-40 truncate px-4 py-3 font-mono text-xs text-zinc-400">{call.llm_model ?? '--'}</td>
                  <td className="px-4 py-3 font-mono text-zinc-300">{formatMs(call.avg_e2e_ms)}</td>
                  <td className="px-4 py-3 text-zinc-300">{call.has_recording ? 'yes' : 'no'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {page && page.total > PAGE_SIZE && (
        <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
          <button
            type="button"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
            className="hover:text-zinc-200 disabled:opacity-30"
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
            className="hover:text-zinc-200 disabled:opacity-30"
          >
            Older
          </button>
        </div>
      )}
    </section>
  );
}
