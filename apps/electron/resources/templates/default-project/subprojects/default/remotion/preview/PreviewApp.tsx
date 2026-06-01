import React, { useEffect, useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { MainSequence } from '../src/components/MainSequence';

interface CompositionMeta {
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
}

const DEFAULT_META: CompositionMeta = {
  durationInFrames: 300,
  fps: 30,
  width: 1920,
  height: 1080,
};

export const PreviewApp: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [meta, setMeta] = useState<CompositionMeta>(DEFAULT_META);
  // Listen for commands from parent
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data;
      if (!data?.type?.startsWith('preview:')) return;

      switch (data.type) {
        case 'preview:play':
          playerRef.current?.play();
          break;
        case 'preview:pause':
          playerRef.current?.pause();
          break;
        case 'preview:seek':
          playerRef.current?.seekTo(data.frame);
          break;
        case 'preview:setPlaybackRate':
          playerRef.current?.setPlaybackRate(data.rate);
          break;
        case 'preview:setComposition':
          setMeta(data.meta);
          break;
        case 'preview:reload':
          window.location.reload();
          break;
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Forward Player events to parent
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const postToParent = (type: string, detail?: Record<string, unknown>) => {
      window.parent.postMessage({ type, ...detail }, '*');
    };

    const onPlay = () => { postToParent('preview:play'); };
    const onPause = () => { postToParent('preview:pause'); };
    const onEnded = () => { postToParent('preview:ended'); };
    const onFrameUpdate = (e: { detail: { frame: number } }) => {
      postToParent('preview:frameUpdate', { frame: e.detail.frame });
    };
    const onError = (e: { detail: { error: Error } }) => {
      postToParent('preview:error', { error: e.detail.error.message });
    };

    player.addEventListener('play', onPlay);
    player.addEventListener('pause', onPause);
    player.addEventListener('ended', onEnded);
    player.addEventListener('frameupdate', onFrameUpdate);
    player.addEventListener('error', onError);

    // Signal ready
    postToParent('preview:ready');

    return () => {
      player.removeEventListener('play', onPlay);
      player.removeEventListener('pause', onPause);
      player.removeEventListener('ended', onEnded);
      player.removeEventListener('frameupdate', onFrameUpdate);
      player.removeEventListener('error', onError);
    };
  }, []);

  return (
    <div style={{ width: meta.width, height: meta.height, overflow: 'hidden' }}>
      <Player
        ref={playerRef}
        component={MainSequence}
        durationInFrames={meta.durationInFrames}
        compositionWidth={meta.width}
        compositionHeight={meta.height}
        fps={meta.fps}
        controls={false}
        autoPlay={false}
        loop={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
