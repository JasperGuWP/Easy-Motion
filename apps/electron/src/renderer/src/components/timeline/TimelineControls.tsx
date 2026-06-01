import React from 'react';
import { useTimelineStore } from '../../stores/timelineStore';

interface TimelineControlsProps {
  currentFrame: number;
  durationInFrames: number;
  isPlaying: boolean;
}

export const TimelineControls: React.FC<TimelineControlsProps> = React.memo(
  ({ currentFrame, durationInFrames, isPlaying }) => {
    const play = useTimelineStore((s) => s.play);
    const pause = useTimelineStore((s) => s.pause);
    const seekTo = useTimelineStore((s) => s.seekTo);
    const stepForward = useTimelineStore((s) => s.stepForward);
    const stepBackward = useTimelineStore((s) => s.stepBackward);
    const zoomIn = useTimelineStore((s) => s.zoomIn);
    const zoomOut = useTimelineStore((s) => s.zoomOut);
    const toggleSnap = useTimelineStore((s) => s.toggleSnap);
    const snapEnabled = useTimelineStore((s) => s.snapEnabled);
    const pixelsPerFrame = useTimelineStore((s) => s.pixelsPerFrame);

    const formatTime = (frame: number, fps: number): string => {
      const totalSeconds = frame / fps;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.floor(totalSeconds % 60);
      const frames = Math.floor(frame % fps);
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
    };

    const fps = 30;

    const buttonStyle: React.CSSProperties = {
      backgroundColor: '#333',
      border: 'none',
      borderRadius: '4px',
      color: '#fff',
      padding: '6px 12px',
      cursor: 'pointer',
      fontSize: '13px',
      minWidth: '32px',
    };

    const activeButtonStyle: React.CSSProperties = {
      ...buttonStyle,
      backgroundColor: '#4a90d9',
    };

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '8px 16px',
          backgroundColor: '#151530',
          borderBottom: '1px solid #2a2a4e',
          height: '44px',
          boxSizing: 'border-box',
        }}
      >
        <button
          onClick={() => (isPlaying ? pause() : play())}
          style={activeButtonStyle}
        >
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => stepBackward()} style={buttonStyle}>
          ⏮
        </button>
        <button onClick={() => stepForward()} style={buttonStyle}>
          ⏭
        </button>
        <div
          style={{
            fontSize: '13px',
            color: '#ccc',
            fontFamily: 'monospace',
            minWidth: '100px',
          }}
        >
          {formatTime(currentFrame, fps)} / {formatTime(durationInFrames, fps)}
        </div>
        <input
          type="range"
          min={0}
          max={durationInFrames - 1}
          value={currentFrame}
          onChange={(e) => seekTo(Number(e.target.value))}
          style={{ flex: 1, cursor: 'pointer' }}
        />
        <button
          onClick={toggleSnap}
          title={snapEnabled ? 'Snap enabled' : 'Snap disabled'}
          style={snapEnabled ? activeButtonStyle : { ...buttonStyle, color: '#888' }}
        >
          🧲
        </button>
        <button onClick={zoomOut} style={buttonStyle} title="Zoom out">
          −
        </button>
        <span style={{ fontSize: '12px', color: '#888', minWidth: '40px', textAlign: 'center' }}>
          {Math.round(pixelsPerFrame * 10) / 10}×
        </span>
        <button onClick={zoomIn} style={buttonStyle} title="Zoom in">
          +
        </button>
      </div>
    );
  }
);

TimelineControls.displayName = 'TimelineControls';
