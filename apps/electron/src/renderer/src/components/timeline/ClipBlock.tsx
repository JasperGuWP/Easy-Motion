import React from 'react';
import type { Clip } from '@easymotion/shared';
import { useTimelineDrag } from '../../hooks/useTimelineDrag';

interface ClipBlockProps {
  clip: Clip;
  trackId: string;
  pixelsPerFrame: number;
  isSelected: boolean;
  onClick: () => void;
}

const typeColors: Record<string, string> = {
  text: '#4a90d9',
  image: '#5cb85c',
  video: '#d9534f',
  audio: '#f0ad4e',
  shape: '#9b59b6',
  chart: '#1abc9c',
  animation: '#e67e22',
  group: '#95a5a6',
};

const RESIZE_HANDLE_WIDTH = 6;

export const ClipBlock: React.FC<ClipBlockProps> = React.memo(
  ({ clip, trackId, pixelsPerFrame, isSelected, onClick }) => {
    const left = clip.startInFrames * pixelsPerFrame;
    const width = Math.max(clip.durationInFrames * pixelsPerFrame, RESIZE_HANDLE_WIDTH * 2 + 4);
    const color = typeColors[clip.type] ?? '#777';

    const { onMovePointerDown, onResizeLeftPointerDown, onResizeRightPointerDown } =
      useTimelineDrag(clip.id, trackId, clip.startInFrames, clip.durationInFrames, pixelsPerFrame);

    return (
      <div
        style={{
          position: 'absolute',
          left,
          top: '4px',
          height: '32px',
          width,
          borderRadius: '4px',
          border: isSelected ? '2px solid #fff' : '2px solid transparent',
          opacity: 0.9,
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Background */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onPointerDown={onMovePointerDown}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: color,
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: `${RESIZE_HANDLE_WIDTH + 4}px`,
            paddingRight: `${RESIZE_HANDLE_WIDTH + 4}px`,
          }}
        >
          <span
            style={{
              fontSize: '10px',
              color: '#fff',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              pointerEvents: 'none',
            }}
          >
            {clip.name}
          </span>
        </div>

        {/* Left resize handle */}
        <div
          onPointerDown={onResizeLeftPointerDown}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: `${RESIZE_HANDLE_WIDTH}px`,
            height: '100%',
            cursor: 'ew-resize',
            zIndex: 2,
          }}
        />

        {/* Right resize handle */}
        <div
          onPointerDown={onResizeRightPointerDown}
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: `${RESIZE_HANDLE_WIDTH}px`,
            height: '100%',
            cursor: 'ew-resize',
            zIndex: 2,
          }}
        />
      </div>
    );
  }
);

ClipBlock.displayName = 'ClipBlock';
