import { TokenSource } from 'livekit-client';

type CallToken = { serverUrl: string; participantToken: string };

/**
 * Token sources for browser calls with a business's agent: a fresh token for every call.
 *
 * `TokenSource.literal` with a function has no cache, unlike `TokenSource.custom`, which reuses
 * its last token while the fetch options are unchanged. Each call needs a new token because every
 * call gets a new room, and the agent dispatch in the token only applies when the room is created.
 */
function postTokenSource(path: string) {
  return TokenSource.literal(async () => {
    const res = await fetch(path, { method: 'POST' });
    if (!res.ok) {
      const detail = await res.json().then((b: { detail?: string }) => b.detail).catch(() => undefined);
      throw new Error(detail ?? `Token request failed with status ${res.status}`);
    }
    return (await res.json()) as CallToken;
  });
}

/** The signed-in business's own test call from the dashboard. */
export const testCallTokenSource = postTokenSource('/api/backend/org/test-call');

/** A visitor's call to a business through its public link or website widget. */
export function publicCallTokenSource(slug: string) {
  return postTokenSource(`/api/backend/public/${encodeURIComponent(slug)}/call`);
}
