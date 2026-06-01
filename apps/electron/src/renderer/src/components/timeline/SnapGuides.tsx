import React from 'react';

interface SnapGuidesProps {
  snapFrames: number[];
  pixelsPerFrame: number;
}

export const SnapGuides: React.FC<SnapGuidesProps> = React.memo(
  ({ snapFrames, pixelsPerFrame }) => {
    return (
      <>
        {snapFrames.map((frame) => (
          <div
            key={frame}
            style={{
              position: 'absolute',
              left: frame * pixelsPerFrame,
              top: 0,
              height: '100%',
              borderLeft: '1px dashed #4ade80',
              zIndex: 30,
              pointerEvents: 'none',
            }}
          />
        ))}
      </>
    );
  }
);

SnapGuides.displayName = 'SnapGuides';
