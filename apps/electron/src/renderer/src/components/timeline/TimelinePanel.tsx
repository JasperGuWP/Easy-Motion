import React, { useState, useCallback, useRef } from 'react';
import type { TrackType } from '@easymotion/shared';
import { useTimelineStore } from '../../stores/timelineStore';
import { TimelineControls } from './TimelineControls';
import { TrackRow } from './TrackRow';
import { Playhead } from './Playhead';
import { SnapGuides } from './SnapGuides';

const ADDABLE_TRACK_TYPES: { type: TrackType; label: string }[] = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'video', label: 'Video' },
  { type: 'audio', label: 'Audio' },
  { type: 'shape', label: 'Shape' },
];

export const TimelinePanel: React.FC = () => {
  const timeline = useTimelineStore((s) => s.timeline);
  const currentFrame = useTimelineStore((s) => s.currentFrame);
  const isPlaying = useTimelineStore((s) => s.isPlaying);
  const selectedTrackId = useTimelineStore((s) => s.selectedTrackId);
  const selectedClipId = useTimelineStore((s) => s.selectedClipId);
  const addTrack = useTimelineStore((s) => s.addTrack);
  const reorderTracks = useTimelineStore((s) => s.reorderTracks);

  const [showAddMenu, setShowAddMenu] = useState(false);
  const [, setDragOverTrackId] = useState<string | null>(null);
  const dragTrackIdRef = useRef<string | null>(null);

  const handleAddTrack = useCallback(
    (type: TrackType) => {
      addTrack(type);
      setShowAddMenu(false);
    },
    [addTrack]
  );

  const handleDragStart = useCallback((trackId: string) => {
    dragTrackIdRef.current = trackId;
  }, []);

  const handleDragOver = useCallback((trackId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverTrackId(trackId);
  }, []);

  const handleDrop = useCallback(
    (targetTrackId: string) => {
      const sourceTrackId = dragTrackIdRef.current;
      if (!sourceTrackId || sourceTrackId === targetTrackId || !timeline) {
        setDragOverTrackId(null);
        dragTrackIdRef.current = null;
        return;
      }

      const sortedTracks = [...timeline.tracks].sort((a, b) => a.order - b.order);
      const sourceIndex = sortedTracks.findIndex((t) => t.id === sourceTrackId);
      const targetIndex = sortedTracks.findIndex((t) => t.id === targetTrackId);

      if (sourceIndex === -1 || targetIndex === -1) {
        setDragOverTrackId(null);
        dragTrackIdRef.current = null;
        return;
      }

      const reordered = [...sortedTracks];
      const [moved] = reordered.splice(sourceIndex, 1);
      reordered.splice(targetIndex, 0, moved);

      reorderTracks(reordered.map((t) => t.id));
      setDragOverTrackId(null);
      dragTrackIdRef.current = null;
    },
    [timeline, reorderTracks]
  );

  if (!timeline) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          color: '#888',
          fontSize: '14px',
        }}
      >
        No timeline loaded
      </div>
    );
  }

  const sortedTracks = [...timeline.tracks].sort((a, b) => a.order - b.order);
  const durationInFrames = timeline.durationInFrames;
  const pixelsPerFrame = useTimelineStore((s) => s.pixelsPerFrame);
  const activeSnapLines = useTimelineStore((s) => s.activeSnapLines);
  const zoomIn = useTimelineStore((s) => s.zoomIn);
  const zoomOut = useTimelineStore((s) => s.zoomOut);
  const timelineWidth = durationInFrames * pixelsPerFrame;

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.shiftKey) {
        e.preventDefault();
        if (e.deltaY < 0) {
          zoomIn();
        } else {
          zoomOut();
        }
      }
    },
    [zoomIn, zoomOut]
  );

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1a1a2e',
        color: '#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <TimelineControls
        currentFrame={currentFrame}
        durationInFrames={durationInFrames}
        isPlaying={isPlaying}
      />
      <div
        data-timeline-content
        onWheel={handleWheel}
        style={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'hidden',
          position: 'relative',
        }}
      >
        <div style={{ position: 'relative', width: timelineWidth, minWidth: '100%', height: '100%' }}>
          <SnapGuides snapFrames={activeSnapLines} pixelsPerFrame={pixelsPerFrame} />
          <Playhead currentFrame={currentFrame} pixelsPerFrame={pixelsPerFrame} durationInFrames={durationInFrames} />
          {sortedTracks.map((track) => (
            <TrackRow
              key={track.id}
              track={track}
              durationInFrames={durationInFrames}
              pixelsPerFrame={pixelsPerFrame}
              isSelected={track.id === selectedTrackId}
              selectedClipId={selectedClipId}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>
      {/* Add Track button */}
      <div style={{ position: 'relative', borderTop: '1px solid #2a2a4e' }}>
        <button
          onClick={() => setShowAddMenu((prev) => !prev)}
          style={{
            width: '100%',
            padding: '6px 12px',
            backgroundColor: '#252545',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '12px',
            textAlign: 'left',
          }}
          title="Add track"
        >
          + Add Track
        </button>
        {showAddMenu && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              backgroundColor: '#2a2a4e',
              border: '1px solid #3a3a5e',
              borderRadius: '4px',
              zIndex: 100,
              minWidth: '120px',
            }}
          >
            {ADDABLE_TRACK_TYPES.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleAddTrack(type)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '6px 12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#ccc',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#3a3a5e';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};