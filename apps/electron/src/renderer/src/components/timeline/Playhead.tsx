import React, { useCallback } from 'react';
import { useTimelineStore } from '../../stores/timelineStore';

interface PlayheadProps {
  currentFrame: number;
  pixelsPerFrame: number;
  durationInFrames: number;
}

export const Playhead: React.FC<PlayheadProps> = React.memo(
  ({ currentFrame, pixelsPerFrame, durationInFrames }) => {
    const seekTo = useTimelineStore((s) => s.seekTo);
    const left = currentFrame * pixelsPerFrame;

    const handlePointerDown = useCallback(
      (e: React.PointerEvent) => {
        e.preventDefault();
        const container = (e.target as HTMLElement).closest(
          '[data-timeline-content]'
        ) as HTMLElement | null;
        if (!container) return;

        const updateFrame = (clientX: number) => {
          const rect = container.getBoundingClientRect();
          const scrollLeft = container.scrollLeft;
          const x = clientX - rect.left + scrollLeft;
          const frame = Math.round(x / pixelsPerFrame);
          seekTo(Math.max(0, Math.min(frame, durationInFrames - 1)));
        };

        updateFrame(e.clientX);

        const handlePointerMove = (ev: PointerEvent) => {
          ev.preventDefault();
          updateFrame(ev.clientX);
        };

        const handlePointerUp = () => {
          document.removeEventListener('pointermove', handlePointerMove);
          document.removeEventListener('pointerup', handlePointerUp);
        };

        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
      },
      [pixelsPerFrame, durationInFrames, seekTo]
    );

    return (
      <div
        onPointerDown={handlePointerDown}
        style={{
          position: 'absolute',
          left,
          top: 0,
          width: '12px',
          height: '100%',
          marginLeft: '-6px',
          cursor: 'ew-resize',
          zIndex: 30,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '2px',
            height: '100%',
            backgroundColor: '#ff4444',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-6px',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '8px solid #ff4444',
          }}
        />
      </div>
    );
  }
);

Playhead.displayName = 'Playhead';
