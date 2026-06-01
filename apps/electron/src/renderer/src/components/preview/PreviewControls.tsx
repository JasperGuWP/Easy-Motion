import React from 'react';
import type { PreviewCommand } from '@easymotion/shared';
import { usePreviewStore } from '../../stores/previewStore';

interface PreviewControlsProps {
  sendCommand: (command: PreviewCommand) => void;
}

export const PreviewControls: React.FC<PreviewControlsProps> = ({ sendCommand }) => {
  const isPlaying = usePreviewStore((s) => s.isPlaying);
  const currentFrame = usePreviewStore((s) => s.currentFrame);
  const durationInFrames = usePreviewStore((s) => s.durationInFrames);
  const fps = usePreviewStore((s) => s.fps);
  const zoom = usePreviewStore((s) => s.zoom);
  const zoomIn = usePreviewStore((s) => s.zoomIn);
  const zoomOut = usePreviewStore((s) => s.zoomOut);
  const resetZoom = usePreviewStore((s) => s.resetZoom);

  const formatTime = (frame: number, frameFps: number): string => {
    const totalSeconds = frame / frameFps;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const frames = Math.floor(frame % frameFps);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    sendCommand(isPlaying ? { type: 'preview:pause' } : { type: 'preview:play' });
  };

  const handleSeek = (frame: number) => {
    sendCommand({ type: 'preview:seek', frame });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        backgroundColor: '#151530',
        borderTop: '1px solid #2a2a4e',
        height: '44px',
        boxSizing: 'border-box',
      }}
    >
      <button
        onClick={handlePlayPause}
        style={{
          backgroundColor: '#4a90d9',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 16px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
      <button
        onClick={() => handleSeek(Math.max(0, currentFrame - 1))}
        style={{
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        ⏮
      </button>
      <button
        onClick={() => handleSeek(Math.min(durationInFrames - 1, currentFrame + 1))}
        style={{
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 12px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        ⏭
      </button>
      <div
        style={{
          fontSize: '13px',
          color: '#ccc',
          fontFamily: 'monospace',
          minWidth: '120px',
        }}
      >
        {formatTime(currentFrame, fps)} / {formatTime(durationInFrames, fps)}
      </div>
      <input
        type="range"
        min={0}
        max={Math.max(0, durationInFrames - 1)}
        value={Math.min(currentFrame, durationInFrames - 1)}
        onChange={(e) => handleSeek(Number(e.target.value))}
        style={{ flex: 1, cursor: 'pointer' }}
      />
      <button
        onClick={zoomOut}
        style={{
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        −
      </button>
      <span style={{ fontSize: '13px', color: '#ccc', minWidth: '40px', textAlign: 'center' }}>
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={zoomIn}
        style={{
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        +
      </button>
      <button
        onClick={resetZoom}
        style={{
          backgroundColor: '#333',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '6px 10px',
          cursor: 'pointer',
          fontSize: '13px',
        }}
      >
        ↺
      </button>
    </div>
  );
};
