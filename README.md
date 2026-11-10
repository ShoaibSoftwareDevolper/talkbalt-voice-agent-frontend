# Talkbalt web

Browser frontend for Talkbalt: start a voice call with the agent and watch the voice pipeline live.

Built with Next.js, `livekit-client`, `@livekit/components-react` and [Agents UI](https://docs.livekit.io/frontends/agents-ui/) components (installed into `components/agents-ui` with the shadcn CLI).

## Setup

```bash
npm install
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | URL of the Talkbalt FastAPI server, default `http://localhost:8001`. Inlined into the browser bundle at build time. |

## Run

The backend API and the agent (dev mode) must be running too; see `backend-web/README.md`.

```bash
npm run dev
```

Open http://localhost:3000. The API only allows the origins in its `CORS_ORIGINS`. If Next.js starts on another port because 3000 is taken, add that origin there.

## How it works

- `lib/token-source.ts`: fetches a fresh token from `POST /api/token` for every call (`TokenSource.literal`, no caching). The API puts each call in a new room with the agent dispatch built into the token.
- `components/talkbalt/talkbalt-app.tsx`: `useSession` plus `AgentSessionProvider`. Handles the call lifecycle: mic permission check before connecting, a 15 second agent join timeout (`agentConnectTimeoutMilliseconds`), and "Call ended" when the agent hangs up (its `end_call` tool deletes the room).
- `components/talkbalt/call-screen.tsx`: audio visualizer, pipeline flow, live transcript (`useSessionMessages`), and the control bar (mic toggle, end call).
- `components/talkbalt/pipeline-flow.tsx`: Mic, VAD, STT, LLM, TTS and Speaker stages, driven by real signals:

| Stage | Lit when | Source |
| --- | --- | --- |
| Mic | you are speaking | LiveKit speaking detection on your mic track |
| VAD | Silero VAD hears speech | agent's `user_state` event on the `talkbalt.pipeline` text stream |
| STT | a user transcript update arrives (flashes) | transcription messages from the agent |
| LLM | agent state is `thinking` | `lk.agent.state` |
| TTS, Speaker | agent state is `speaking` | `lk.agent.state` |

The numbers under VAD, STT, LLM and TTS are the last turn's end-of-turn delay, transcript delay, LLM first token and TTS first audio, sent by the agent on the same text stream. "Response time" is the end-to-end time from when you stop speaking to when the agent starts.
