'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MediaDeviceFailure, RoomEvent } from 'livekit-client';
import { type AgentState, AgentEvent, useAgent, useSession } from '@livekit/components-react';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { CallScreen } from '@/components/talkbalt/call-screen';
import { Button } from '@/components/ui/button';
import { API_URL, tokenSource } from '@/lib/token-source';
import { cn } from '@/lib/utils';

const AGENT_CONNECT_TIMEOUT_MS = 15_000;

type Notice = { tone: 'info' | 'error'; text: string };

const MIC_BLOCKED =
  'Microphone access is blocked. Allow microphone access for this site in your browser, then try again.';

function micErrorText(error: unknown): string {
  switch (MediaDeviceFailure.getFailure(error)) {
    case MediaDeviceFailure.PermissionDenied:
      return MIC_BLOCKED;
    case MediaDeviceFailure.NotFound:
      return 'No microphone was found. Connect one and try again.';
    case MediaDeviceFailure.DeviceInUse:
      return 'Your microphone is being used by another app. Close it and try again.';
    default:
      return 'Could not start your microphone. Check your browser settings and try again.';
  }
}

/** Asks for mic permission before connecting, so a denial never creates a room or dispatches the agent. */
async function checkMicrophone(): Promise<string | null> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((t) => t.stop());
    return null;
  } catch (error) {
    return micErrorText(error);
  }
}

export function TalkbaltApp() {
  const session = useSession(tokenSource, { agentConnectTimeoutMilliseconds: AGENT_CONNECT_TIMEOUT_MS });
  const agent = useAgent(session);

  const [inCall, setInCall] = useState(false);
  const [starting, setStarting] = useState(false);
  const [notice, setNotice] = useState<Notice | null>(null);

  // Read from SDK event callbacks, which outlive individual renders.
  const inCallRef = useRef(false);
  const agentJoinedRef = useRef(false);
  // `session` gets a new identity on every state change (e.g. disconnected -> connecting), so
  // effects and callbacks read it through a ref instead of depending on it. Depending on it made
  // the unmount cleanup below run mid-connect and abort the call.
  const sessionRef = useRef(session);
  useEffect(() => {
    sessionRef.current = session;
  });

  const finishCall = useCallback((next: Notice) => {
    if (!inCallRef.current) return;
    inCallRef.current = false;
    setInCall(false);
    setNotice(next);
    sessionRef.current.end().catch(() => {});
  }, []);

  // Agent lifecycle: never joined (timeout) vs joined and then went away.
  useEffect(() => {
    const emitter = agent.internal.emitter;
    const onState = (state: AgentState) => {
      if (!inCallRef.current) return;
      if (state === 'listening' || state === 'thinking' || state === 'speaking') {
        agentJoinedRef.current = true;
      } else if (state === 'failed') {
        finishCall(
          agentJoinedRef.current
            ? { tone: 'info', text: 'Call ended' }
            : {
                tone: 'error',
                text: "Talkbalt didn't join within 15 seconds. Make sure the agent is running in dev mode, then try again.",
              },
        );
      }
    };
    emitter.on(AgentEvent.StateChanged, onState);
    return () => {
      emitter.off(AgentEvent.StateChanged, onState);
    };
  }, [agent.internal.emitter, finishCall]);

  // Room lifecycle: the agent's end_call deletes the room, which disconnects us; mic can fail mid-call.
  useEffect(() => {
    const room = session.room;
    const onDisconnected = () => finishCall({ tone: 'info', text: 'Call ended' });
    const onMediaError = (error: Error) => finishCall({ tone: 'error', text: micErrorText(error) });
    room.on(RoomEvent.Disconnected, onDisconnected);
    room.on(RoomEvent.MediaDevicesError, onMediaError);
    return () => {
      room.off(RoomEvent.Disconnected, onDisconnected);
      room.off(RoomEvent.MediaDevicesError, onMediaError);
    };
  }, [session.room, finishCall]);

  // Leave the room if the page unmounts mid-call (runs on unmount only).
  useEffect(() => {
    return () => {
      if (inCallRef.current) sessionRef.current.end().catch(() => {});
    };
  }, []);

  const startCall = async () => {
    setNotice(null);
    setStarting(true);
    try {
      const micError = await checkMicrophone();
      if (micError) {
        setNotice({ tone: 'error', text: micError });
        return;
      }
      agentJoinedRef.current = false;
      inCallRef.current = true;
      setInCall(true);
      await session.start({ tracks: { microphone: { enabled: true } } });
    } catch (error) {
      console.error('Call failed to start:', error);
      inCallRef.current = false;
      setInCall(false);
      // A token fetch failure (API down, CORS) vs. a failure connecting to LiveKit itself.
      const tokenFailed =
        error instanceof TypeError || (error instanceof Error && error.message.startsWith('Token request failed'));
      setNotice({
        tone: 'error',
        text: tokenFailed
          ? `Could not reach the Talkbalt server at ${API_URL}. Make sure the API is running, then try again.`
          : `Could not connect the call: ${error instanceof Error ? error.message : String(error)}`,
      });
      session.end().catch(() => {});
    } finally {
      setStarting(false);
    }
  };

  return (
    <AgentSessionProvider session={session}>
      {inCall ? (
        <CallScreen
          session={session}
          agent={agent}
          onUserEnd={() => finishCall({ tone: 'info', text: 'Call ended' })}
        />
      ) : (
        <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">Talkbalt</h1>
            <p className="mx-auto max-w-sm text-zinc-400">
              A friendly voice receptionist. Start a call and talk to it right from your browser.
            </p>
          </div>

          <Button size="lg" onClick={startCall} disabled={starting} className="h-11 rounded-full px-8">
            {starting ? 'Starting' : 'Start call'}
          </Button>

          <p
            role="status"
            className={cn(
              'min-h-5 max-w-md text-sm',
              notice?.tone === 'error' ? 'text-red-400' : 'text-zinc-400',
            )}
          >
            {notice?.text}
          </p>

          <Link href="/history" className="text-sm text-zinc-500 hover:text-zinc-300">
            History
          </Link>
        </main>
      )}
    </AgentSessionProvider>
  );
}
