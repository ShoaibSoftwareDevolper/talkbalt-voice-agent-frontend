import { TokenSource } from 'livekit-client';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8001';

type TokenResponse = {
  serverUrl: string;
  participantToken: string;
  roomName: string;
  participantName: string;
};

/**
 * Fetches a fresh token from the Talkbalt API on every call.
 *
 * `TokenSource.literal` with a function has no cache, unlike `TokenSource.custom`, which reuses
 * its last token while the fetch options are unchanged. Each call needs a new token because the
 * API puts every call in a new room, and the agent dispatch in the token only applies when the
 * room is created.
 */
export const tokenSource = TokenSource.literal(async () => {
  const res = await fetch(`${API_URL}/api/token`, { method: 'POST' });
  if (!res.ok) {
    throw new Error(`Token request failed with status ${res.status}`);
  }
  const { serverUrl, participantToken } = (await res.json()) as TokenResponse;
  return { serverUrl, participantToken };
});
