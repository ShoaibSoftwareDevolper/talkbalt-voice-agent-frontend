'use client';

import { type FormEvent, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Field, Notice, PageHeader, Panel, inputClass } from '@/components/dashboard/ui';
import { WaveLoader } from '@/components/motion/wave-loader';
import { Button } from '@/components/ui/button';
import { type ServiceRow, api, formatPrice } from '@/lib/api';
import { useApiResource } from '@/lib/use-api-resource';

type Draft = { kind: 'service' | 'product'; name: string; description: string; duration_min: string; price: string; currency: string; active: boolean };

const EMPTY: Draft = { kind: 'service', name: '', description: '', duration_min: '30', price: '', currency: 'PKR', active: true };

function toDraft(s: ServiceRow): Draft {
  return {
    kind: s.kind,
    name: s.name,
    description: s.description ?? '',
    duration_min: String(s.duration_min),
    price: s.price_cents == null ? '' : String(s.price_cents / 100),
    currency: s.currency,
    active: s.active,
  };
}

/** Services callers can book, and products they can ask about, with prices. */
export function ServicesEditor() {
  const [reload, setReload] = useState(0);
  const services = useApiResource<ServiceRow[]>('/api/org/services', reload);
  const [editing, setEditing] = useState<string | null>(null); // service id, 'new', or null
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const startEdit = (id: string, value: Draft) => {
    setEditing(id);
    setDraft(value);
    setError(null);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const body = {
      kind: draft.kind,
      name: draft.name.trim(),
      description: draft.description.trim() || null,
      duration_min: Number(draft.duration_min),
      price_cents: draft.price.trim() === '' ? null : Math.round(Number(draft.price) * 100),
      currency: draft.currency.trim().toUpperCase(),
      active: draft.active,
    };
    try {
      if (editing === 'new') await api('/api/org/services', { method: 'POST', body });
      else await api(`/api/org/services/${editing}`, { method: 'PUT', body });
      setEditing(null);
      setReload((n) => n + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save the service.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    await api(`/api/org/services/${id}`, { method: 'DELETE' }).catch(() => {});
    setReload((n) => n + 1);
  };

  const set = (key: keyof Draft) => (e: { target: { value: string } }) => setDraft({ ...draft, [key]: e.target.value });

  return (
    <>
      <PageHeader
        title="Services & products"
        description="Services can be booked for a time slot. Products are things you sell: the receptionist tells callers about them and their prices."
        action={
          editing === null && (
            <Button onClick={() => startEdit('new', EMPTY)} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
              Add item
            </Button>
          )
        }
      />

      {editing !== null && (
        <Panel>
          <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
            <div role="radiogroup" aria-label="Type" className="flex gap-2 sm:col-span-2">
              {(['service', 'product'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={draft.kind === k}
                  onClick={() => setDraft({ ...draft, kind: k })}
                  className={draft.kind === k ? 'rounded-full border border-brand bg-brand-soft px-4 py-1.5 text-sm font-medium text-brand' : 'rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted/50'}
                >
                  {k === 'service' ? 'Service (bookable)' : 'Product'}
                </button>
              ))}
            </div>
            <Field label="Name" htmlFor="svc-name">
              <input id="svc-name" required maxLength={120} value={draft.name} onChange={set('name')} className={inputClass} placeholder="Haircut" />
            </Field>
            {draft.kind === 'service' && (
              <Field label="Length (minutes)" htmlFor="svc-duration">
                <input id="svc-duration" type="number" min={5} max={480} step={5} required value={draft.duration_min} onChange={set('duration_min')} className={inputClass} />
              </Field>
            )}
            <Field label="Price" htmlFor="svc-price" hint="Leave empty to not mention a price.">
              <input id="svc-price" type="number" min={0} step="any" value={draft.price} onChange={set('price')} className={inputClass} placeholder="1500" />
            </Field>
            <Field label="Currency" htmlFor="svc-currency">
              <input id="svc-currency" required maxLength={3} value={draft.currency} onChange={set('currency')} className={inputClass} />
            </Field>
            <Field label="Description" htmlFor="svc-description" className="sm:col-span-2" hint="Optional. The receptionist may use it to answer questions.">
              <input id="svc-description" maxLength={500} value={draft.description} onChange={set('description')} className={inputClass} />
            </Field>
            <label className="flex items-center gap-2 text-sm text-foreground sm:col-span-2">
              <input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} className="size-4 accent-brand" />
              Visible to callers (untick to hide it without deleting)
            </label>
            {error && <div className="sm:col-span-2"><Notice tone="error">{error}</Notice></div>}
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={busy} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
                {busy ? 'Saving' : 'Save'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => setEditing(null)} className="rounded-full">
                Cancel
              </Button>
            </div>
          </form>
        </Panel>
      )}

      {!services && <WaveLoader label="Loading services" />}
      {services?.error && <Notice tone="error">{services.error}</Notice>}
      {services?.value && services.value.length === 0 && editing === null && (
        <Panel className="text-sm text-muted-foreground">Nothing yet. Add a service so your receptionist can book it, or a product so it can tell callers about it.</Panel>
      )}
      {services?.value && services.value.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border text-xs text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Length</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {services.value.map((s) => (
                <tr key={s.id} className="border-b border-border/70 last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{s.name}</div>
                    {s.description && <div className="text-xs text-muted-foreground">{s.description}</div>}
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{s.kind === 'service' ? 'Service' : 'Product'}</td>
                  <td className="px-4 py-3 text-foreground/80 tabular-nums">{s.kind === 'service' ? `${s.duration_min} min` : '--'}</td>
                  <td className="px-4 py-3 text-foreground/80 tabular-nums">{formatPrice(s.price_cents, s.currency)}</td>
                  <td className="px-4 py-3">
                    <span className={s.active ? 'rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700' : 'rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground'}>
                      {s.active ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button type="button" aria-label={`Edit ${s.name}`} onClick={() => startEdit(s.id, toDraft(s))} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                        <Pencil className="size-4" />
                      </button>
                      <button type="button" aria-label={`Delete ${s.name}`} onClick={() => remove(s.id)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
