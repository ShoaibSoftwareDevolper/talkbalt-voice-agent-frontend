# Talkbalt web

Talkbalt's web app: the public landing page, signup and login, and each business's dashboard (bookings, calls, analytics, services, opening hours, profile, and a test call with its own receptionist).

Built with Next.js, `livekit-client`, `@livekit/components-react` and [Agents UI](https://docs.livekit.io/frontends/agents-ui/) components (installed into `components/agents-ui` with the shadcn CLI).

## Setup

```bash
npm install
cp .env.example .env.local
```

| Variable | Description |
| --- | --- |
| `TALKBALT_API_URL` | Server only. URL of the Talkbalt FastAPI server, default `http://localhost:8001`. |

## Run

The platform API (`../platform-api`, port 8001) and the voice agent (`../backend-web`) must be running too; see their READMEs.

```bash
npm run dev -- -p 3001
```

Open http://localhost:3001. The API only allows the origins in its `CORS_ORIGINS`. Add the origin there if you use another port.

## How it works

- **Accounts:** `/signup` and `/login` (`components/auth/auth-form.tsx`). The API sets an httpOnly session cookie. Every API request goes through `app/api/backend/[...path]`, a same-origin proxy that forwards cookies both ways, so the cookie stays first-party and the API URL never reaches the browser. `proxy.ts` sends signed-out visitors of `/app` to the login page.
- **Dashboard:** `/app` (`components/app-shell.tsx` sidebar, pages in `components/dashboard`): overview with a setup checklist, bookings agenda, calls, analytics, services, opening hours, business profile, test call.
- **Public link and widget:** `/b/<slug>` shows the business's info and a "Start your call" button (`components/public/business-page.tsx`); the call goes only to that business's receptionist. `public/widget.js` is a 4 KB script a business pastes on its website: a corner button in a Shadow DOM that opens `/embed/<slug>` in an iframe allowed to use the microphone; closing the panel removes the iframe and ends the call. The dashboard's Share & embed page gives the link and the snippet.
- `lib/token-source.ts`: fetches a fresh token for every call: `POST /api/org/test-call` for the dashboard test call, `POST /api/public/<slug>/call` for the link and widget (`TokenSource.literal`, no caching). The agent dispatch metadata names the business, so the agent answers with its name, services and hours, and books into its calendar.
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
