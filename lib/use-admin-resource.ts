import { useEffect, useState } from 'react';
import { UnauthorizedError, adminFetch, setAdminToken } from '@/lib/admin-api';

type Loaded<T> = { key: string; value?: T; error?: string };

/** GETs an admin API path; returns null while loading. A rejected token sends the user back to the prompt. */
export function useAdminResource<T>(path: string | null, token: string, reloadKey = 0) {
  const [loaded, setLoaded] = useState<Loaded<T> | null>(null);
  const key = `${path}#${reloadKey}`;

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    adminFetch<T>(path, token)
      .then((value) => !cancelled && setLoaded({ key, value }))
      .catch((error: Error) => {
        if (cancelled) return;
        if (error instanceof UnauthorizedError) setAdminToken(null);
        else setLoaded({ key, error: error.message });
      });
    return () => {
      cancelled = true;
    };
  }, [path, token, key]);

  return loaded?.key === key ? loaded : null;
}
