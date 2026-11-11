'use client';

import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Phone } from 'lucide-react';
import { MediaDeviceFailure, RoomEvent, type TokenSourceFixed } from 'livekit-client';
import { type AgentState, AgentEvent, useAgent, useSession } from '@livekit/components-react';
import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import { CallScreen } from '@/components/talkbalt/call-screen';
import { Button } from '@/components/ui/button';
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

type TalkbaltAppProps = {
  /** Where the call's token comes from: the dashboard test call or a business's public link. */
  tokenSource: TokenSourceFixed;
  title: ReactNode;
  description: ReactNode;
  startLabel?: string;
};

/** A browser call with a business's receptionist: start card, then the live call screen. */
export function TalkbaltApp({ tokenSource, title, description, startLabel = 'Start call' }: TalkbaltAppProps) {
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
      // A network failure reaching Talkbalt vs. a reason the server gave (rate limit, calls off).
      setNotice({
        tone: 'error',
        text:
          error instanceof TypeError
            ? 'Could not reach Talkbalt. Check your connection and try again.'
            : error instanceof Error
              ? error.message
              : 'Could not connect the call. Try again.',
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
        <div className="flex flex-1 items-center justify-center py-6">
          <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-border bg-card px-8 py-10 text-center">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-brand-soft">
              <span aria-hidden className="flex h-7 items-end gap-1">
                {[12, 22, 28, 18, 10].map((h, i) => (
                  <span key={i} className="w-1 rounded-full bg-brand" style={{ height: h }} />
                ))}
              </span>
            </span>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
              <p className="text-muted-foreground">{description}</p>
            </div>

            <Button
              size="lg"
              onClick={startCall}
              disabled={starting}
              className="h-12 w-full rounded-full bg-brand text-base text-brand-foreground hover:bg-brand/90"
            >
              <Phone aria-hidden className="size-4" />
              {starting ? 'Starting' : startLabel}
            </Button>

            <p
              role="status"
              className={cn('min-h-5 text-sm', notice?.tone === 'error' ? 'text-destructive' : 'text-muted-foreground')}
            >
              {notice?.text}
            </p>
          </div>
        </div>
      )}
    </AgentSessionProvider>
  );
}
