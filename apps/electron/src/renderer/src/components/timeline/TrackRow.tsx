import React, { useCallback, useRef } from 'react';
import type { Track, TrackType } from '@easymotion/shared';
import { useTimelineStore } from '../../stores/timelineStore';
import { ClipBlock } from './ClipBlock';

const TRACK_COLORS: Record<TrackType, string> = {
  text: '#4a90d9',
  image: '#5cb85c',
  video: '#d9534f',
  audio: '#f0ad4e',
  shape: '#9b59b6',
  chart: '#1abc9c',
  animation: '#e67e22',
  group: '#95a5a6',
  visual: '#d9534f',
  'audio-track': '#f0ad4e',
};

interface TrackRowProps {
  track: Track;
  durationInFrames: number;
  pixelsPerFrame: number;
  isSelected: boolean;
  selectedClipId: string | null;
  onDragStart?: (trackId: string, e: React.DragEvent) => void;
  onDragOver?: (trackId: string, e: React.DragEvent) => void;
  onDrop?: (trackId: string, e: React.DragEvent) => void;
}

const iconButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '2px 4px',
  fontSize: '13px',
  lineHeight: 1,
  color: '#ccc',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const TrackRow: React.FC<TrackRowProps> = React.memo(
  ({ track, pixelsPerFrame, isSelected, selectedClipId, onDragStart, onDragOver, onDrop }) => {
    const selectTrack = useTimelineStore((s) => s.selectTrack);
    const selectClip = useTimelineStore((s) => s.selectClip);
    const toggleTrackVisibility = useTimelineStore((s) => s.toggleTrackVisibility);
    const toggleTrackLock = useTimelineStore((s) => s.toggleTrackLock);
    const toggleTrackMute = useTimelineStore((s) => s.toggleTrackMute);
    const toggleTrackSolo = useTimelineStore((s) => s.toggleTrackSolo);
    const removeTrack = useTimelineStore((s) => s.removeTrack);

    const trackRef = useRef<HTMLDivElement>(null);
    const isAudioTrack = track.type === 'audio' || track.type === 'audio-track';
    const trackColor = TRACK_COLORS[track.type] ?? '#95a5a6';

    const handleTrackClick = useCallback(() => {
      selectTrack(track.id);
    }, [selectTrack, track.id]);

    const handleVisibilityClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTrackVisibility(track.id);
      },
      [toggleTrackVisibility, track.id]
    );

    const handleLockClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTrackLock(track.id);
      },
      [toggleTrackLock, track.id]
    );

    const handleMuteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTrackMute(track.id);
      },
      [toggleTrackMute, track.id]
    );

    const handleSoloClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleTrackSolo(track.id);
      },
      [toggleTrackSolo, track.id]
    );

    const handleDeleteClick = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        removeTrack(track.id);
      },
      [removeTrack, track.id]
    );

    const handleDragStart = useCallback(
      (e: React.DragEvent) => {
        onDragStart?.(track.id, e);
      },
      [onDragStart, track.id]
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        onDragOver?.(track.id, e);
      },
      [onDragOver, track.id]
    );

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        onDrop?.(track.id, e);
      },
      [onDrop, track.id]
    );

    return (
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '40px',
          borderBottom: '1px solid #2a2a4e',
          backgroundColor: isSelected ? '#2a2a5e' : '#1e1e3a',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {/* Color indicator bar */}
        <div
          style={{
            width: '4px',
            minWidth: '4px',
            height: '100%',
            backgroundColor: trackColor,
            flexShrink: 0,
          }}
        />
        {/* Track header */}
        <div
          style={{
            width: '180px',
            minWidth: '180px',
            paddingLeft: '4px',
            fontSize: '12px',
            color: track.visible ? '#fff' : '#666',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            flexShrink: 0,
          }}
        >
          {/* Drag handle */}
          <span
            draggable
            onDragStart={handleDragStart}
            style={{
              cursor: 'grab',
              fontSize: '12px',
              color: '#666',
              padding: '0 2px',
              userSelect: 'none',
            }}
            title="Drag to reorder"
          >
            ⠿
          </span>
          {/* Visibility toggle */}
          <button
            onClick={handleVisibilityClick}
            style={{
              ...iconButtonStyle,
              opacity: track.visible ? 1 : 0.5,
            }}
            title={track.visible ? 'Hide track' : 'Show track'}
          >
            {track.visible ? '👁' : '🚫'}
          </button>
          {/* Lock toggle */}
          <button
            onClick={handleLockClick}
            style={{
              ...iconButtonStyle,
              opacity: track.locked ? 1 : 0.4,
            }}
            title={track.locked ? 'Unlock track' : 'Lock track'}
          >
            {track.locked ? '🔒' : '🔓'}
          </button>
          {/* Mute toggle (audio only) */}
          {isAudioTrack && (
            <button
              onClick={handleMuteClick}
              style={{
                ...iconButtonStyle,
                opacity: track.muted ? 1 : 0.4,
              }}
              title={track.muted ? 'Unmute track' : 'Mute track'}
            >
              {track.muted ? '🔇' : '🔊'}
            </button>
          )}
          {/* Solo toggle (audio only) */}
          {isAudioTrack && (
            <button
              onClick={handleSoloClick}
              style={{
                ...iconButtonStyle,
                opacity: 0.4,
              }}
              title="Solo track"
            >
              🎧
            </button>
          )}
          {/* Track name */}
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              minWidth: 0,
            }}
          >
            {track.name}
          </span>
          {/* Delete button */}
          <button
            onClick={handleDeleteClick}
            style={{
              ...iconButtonStyle,
              color: '#888',
              fontSize: '14px',
              fontWeight: 'bold',
              padding: '2px 6px',
            }}
            title="Delete track"
          >
            ×
          </button>
        </div>
        {/* Clips area */}
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          {track.clips.map((clip) => (
            <ClipBlock
              key={clip.id}
              clip={clip}
              trackId={track.id}
              pixelsPerFrame={pixelsPerFrame}
              isSelected={clip.id === selectedClipId}
              onClick={() => selectClip(clip.id)}
            />
          ))}
        </div>
      </div>
    );
  }
);

TrackRow.displayName = 'TrackRow';