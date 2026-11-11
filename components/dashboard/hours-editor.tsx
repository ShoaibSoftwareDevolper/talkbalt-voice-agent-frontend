'use client';

import { useState } from 'react';
import { Notice, PageHeader, Panel, inputClass } from '@/components/dashboard/ui';
import { WaveLoader } from '@/components/motion/wave-loader';
import { Button } from '@/components/ui/button';
import { type HoursWindow, WEEKDAYS, api } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';
import { cn } from '@/lib/utils';

type Day = { open: boolean; opens: string; closes: string };

function toWeek(rows: HoursWindow[]): Day[] {
  return WEEKDAYS.map((_, i) => {
    const w = rows.find((r) => r.weekday === i);
    return w ? { open: true, opens: w.opens.slice(0, 5), closes: w.closes.slice(0, 5) } : { open: false, opens: '10:00', closes: '20:00' };
  });
}

/** One opening window per weekday. The receptionist only books inside these hours. */
export function HoursEditor() {
  const hours = useApiResource<HoursWindow[]>('/api/org/hours');
  const [week, setWeek] = useState<Day[] | null>(null);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'error'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const days = week ?? (hours?.value ? toWeek(hours.value) : null);
  const update = (i: number, patch: Partial<Day>) => {
    if (!days) return;
    setWeek(days.map((d, j) => (j === i ? { ...d, ...patch } : d)));
    setNotice(null);
  };

  const save = async () => {
    if (!days) return;
    setBusy(true);
    try {
      const body = days.flatMap((d, i) => (d.open ? [{ weekday: i, opens: d.opens, closes: d.closes }] : []));
      await api('/api/org/hours', { method: 'PUT', body });
      setNotice({ tone: 'ok', text: 'Opening hours saved. New calls use them right away.' });
    } catch (err) {
      setNotice({ tone: 'error', text: err instanceof Error ? err.message : 'Could not save the hours.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHeader title="Opening hours" description="Your receptionist only offers and books times inside these hours, in your business's time zone." />
      {!days && !hours?.error && <WaveLoader label="Loading hours" />}
      {hours?.error && <Notice tone="error">{hours.error}</Notice>}
      {days && (
        <Panel className="space-y-1 p-2 sm:p-3">
          {days.map((d, i) => (
            <div key={WEEKDAYS[i]} className="flex flex-wrap items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/50">
              <label className="flex w-36 items-center gap-2 text-sm font-medium text-foreground">
                <input type="checkbox" checked={d.open} onChange={(e) => update(i, { open: e.target.checked })} className="size-4 accent-brand" />
                {WEEKDAYS[i]}
              </label>
              {d.open ? (
                <div className="flex items-center gap-2">
                  <input aria-label={`${WEEKDAYS[i]} opens`} type="time" value={d.opens} onChange={(e) => update(i, { opens: e.target.value })} className={cn(inputClass, 'w-32')} />
                  <span className="text-sm text-muted-foreground">to</span>
                  <input aria-label={`${WEEKDAYS[i]} closes`} type="time" value={d.closes} onChange={(e) => update(i, { closes: e.target.value })} className={cn(inputClass, 'w-32')} />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Closed</span>
              )}
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3 px-3 pt-3 pb-1">
            <Button onClick={save} disabled={busy} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
              {busy ? 'Saving' : 'Save hours'}
            </Button>
            {notice && <Notice tone={notice.tone}>{notice.text}</Notice>}
          </div>
        </Panel>
      )}
    </>
  );
}
