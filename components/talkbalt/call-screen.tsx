'use client';

import { type UseAgentReturn, type UseSessionReturn, useSessionMessages } from '@livekit/components-react';
import { AgentAudioVisualizerBar } from '@/components/agents-ui/agent-audio-visualizer-bar';
import { AgentChatTranscript } from '@/components/agents-ui/agent-chat-transcript';
import { AgentControlBar } from '@/components/agents-ui/agent-control-bar';
import { StartAudioButton } from '@/components/agents-ui/start-audio-button';
import { PipelineFlow } from '@/components/talkbalt/pipeline-flow';

const STATUS_TEXT: Record<string, string> = {
  connecting: 'Connecting',
  'pre-connect-buffering': 'Waiting for Talkbalt to join',
  initializing: 'Waiting for Talkbalt to join',
  idle: 'Waiting for Talkbalt to join',
  listening: 'Listening',
  thinking: 'Thinking',
  speaking: 'Speaking',
};

type CallScreenProps = {
  session: UseSessionReturn;
  agent: UseAgentReturn;
  onUserEnd: () => void;
};

export function CallScreen({ session, agent, onUserEnd }: CallScreenProps) {
  const { messages } = useSessionMessages(session);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-zinc-200">Talkbalt</span>
        <span className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <span
            className={
              agent.isConnected ? 'size-1.5 rounded-full bg-emerald-400' : 'size-1.5 animate-pulse rounded-full bg-zinc-500'
            }
          />
          {STATUS_TEXT[agent.state] ?? agent.state}
        </span>
      </header>

      <div className="flex h-32 items-center justify-center">
        <AgentAudioVisualizerBar
          size="lg"
          barCount={5}
          state={agent.state}
          audioTrack={agent.microphoneTrack}
        />
      </div>

      <PipelineFlow session={session} agentState={agent.state} messages={messages} />

      <div className="relative h-72 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {messages.length === 0 ? (
          <p className="flex h-full items-center justify-center text-sm text-zinc-500">
            The live transcript will appear here.
          </p>
        ) : (
          <AgentChatTranscript agentState={agent.state} messages={messages} className="h-full" />
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        <StartAudioButton label="Click to enable audio" />
        <AgentControlBar
          variant="livekit"
          className="w-full max-w-sm"
          isConnected={session.isConnected}
          controls={{ microphone: true, leave: true, camera: false, screenShare: false, chat: false }}
          onDisconnect={onUserEnd}
        />
      </div>
    </div>
  );
}
