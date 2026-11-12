import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

type Loaded<T> = { key: string; value?: T; error?: string; status?: number };

/**
 * GETs an API path; returns null while loading. Change `reloadKey` to fetch again.
 * With `keepPrevious`, switching to a new path keeps returning the last result (marked `stale`)
 * until the new one arrives, so numbers do not blink away when a filter changes.
 */
export function useApiResource<T>(path: string | null, reloadKey = 0, { keepPrevious = false } = {}) {
  const [loaded, setLoaded] = useState<Loaded<T> | null>(null);
  const key = `${path}#${reloadKey}`;

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    api<T>(path)
      .then((value) => !cancelled && setLoaded({ key, value }))
      .catch((error: Error & { status?: number }) => !cancelled && setLoaded({ key, error: error.message, status: error.status }));
    return () => {
      cancelled = true;
    };
  }, [path, key]);

  if (loaded?.key === key) return { ...loaded, stale: false };
  return keepPrevious && loaded ? { ...loaded, stale: true } : null;
}
