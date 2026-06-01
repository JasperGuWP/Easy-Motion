import { useCallback, useRef, useEffect } from 'react';
import { useTimelineStore } from '../stores/timelineStore';
import { collectSnapPoints, findSnapPosition } from '../utils/snap';
import type { Timeline } from '@easymotion/shared';

type DragMode = 'move' | 'resize-left' | 'resize-right' | null;

interface DragState {
  mode: DragMode;
  clipId: string;
  originalTrackId: string;
  originalStartFrame: number;
  originalDuration: number;
  dragStartX: number;
  dragStartFrame: number;
  isAltPressed: boolean;
}

export function useTimelineDrag(
  clipId: string,
  trackId: string,
  startInFrames: number,
  durationInFrames: number,
  pixelsPerFrame: number
) {
  const timeline = useTimelineStore((s) => s.timeline);
  const snapEnabled = useTimelineStore((s) => s.snapEnabled);
  const moveClipImmediate = useTimelineStore((s) => s.moveClipImmediate);
  const resizeClipImmediate = useTimelineStore((s) => s.resizeClipImmediate);
  const moveClip = useTimelineStore((s) => s.moveClip);
  const resizeClip = useTimelineStore((s) => s.resizeClip);
  const setActiveSnapLines = useTimelineStore((s) => s.setActiveSnapLines);

  const dragState = useRef<DragState | null>(null);

  const getContainer = useCallback((): HTMLElement | null => {
    return document.querySelector('[data-timeline-content]');
  }, []);

  const frameFromX = useCallback(
    (clientX: number, container: HTMLElement): number => {
      const rect = container.getBoundingClientRect();
      const scrollLeft = container.scrollLeft;
      const x = clientX - rect.left + scrollLeft;
      return Math.round(x / pixelsPerFrame);
    },
    [pixelsPerFrame]
  );

  const applySnap = useCallback(
    (
      targetFrame: number,
      timelineData: Timeline | null,
      isAlt: boolean
    ): { frame: number; snapped: boolean; snapLines: number[] } => {
      if (!timelineData || !snapEnabled || isAlt) {
        return { frame: targetFrame, snapped: false, snapLines: [] };
      }
      const snapPoints = collectSnapPoints(timelineData, clipId);
      const result = findSnapPosition(targetFrame, snapPoints, pixelsPerFrame);
      if (result.snapped) {
        return { frame: result.frame, snapped: true, snapLines: [result.frame] };
      }
      return { frame: targetFrame, snapped: false, snapLines: [] };
    },
    [clipId, pixelsPerFrame, snapEnabled]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent, mode: DragMode) => {
      if (!mode) return;
      e.preventDefault();
      e.stopPropagation();

      const container = getContainer();
      if (!container) return;

      dragState.current = {
        mode,
        clipId,
        originalTrackId: trackId,
        originalStartFrame: startInFrames,
        originalDuration: durationInFrames,
        dragStartX: e.clientX,
        dragStartFrame: startInFrames,
        isAltPressed: e.altKey,
      };

      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [clipId, trackId, startInFrames, durationInFrames, getContainer]
  );

  useEffect(() => {
    const container = getContainer();
    if (!container) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!dragState.current) return;
      const ds = dragState.current;

      const currentFrame = frameFromX(e.clientX, container);
      const deltaFrames = currentFrame - Math.round(ds.dragStartX / pixelsPerFrame);

      ds.isAltPressed = e.altKey;

      if (ds.mode === 'move') {
        let newStart = ds.originalStartFrame + deltaFrames;
        newStart = Math.max(0, newStart);

        const { frame: snappedFrame, snapLines } = applySnap(newStart, timeline, ds.isAltPressed);
        setActiveSnapLines(snapLines);

        const targetTrackId = trackId; // For now, same track only
        moveClipImmediate(clipId, targetTrackId, snappedFrame);
      } else if (ds.mode === 'resize-left') {
        let newStart = ds.originalStartFrame + deltaFrames;
        newStart = Math.max(0, newStart);
        const endFrame = ds.originalStartFrame + ds.originalDuration;

        if (newStart >= endFrame - 1) {
          newStart = endFrame - 1;
        }

        const { frame: snappedFrame, snapLines } = applySnap(newStart, timeline, ds.isAltPressed);
        const adjustedDuration = Math.max(1, endFrame - snappedFrame);
        setActiveSnapLines(snapLines);

        resizeClipImmediate(clipId, snappedFrame, adjustedDuration);
      } else if (ds.mode === 'resize-right') {
        const endFrame = ds.originalStartFrame + ds.originalDuration + deltaFrames;
        let newDuration = Math.max(1, endFrame - ds.originalStartFrame);

        const { frame: snappedEnd, snapLines } = applySnap(
          ds.originalStartFrame + newDuration,
          timeline,
          ds.isAltPressed
        );
        newDuration = Math.max(1, snappedEnd - ds.originalStartFrame);
        setActiveSnapLines(snapLines);

        resizeClipImmediate(clipId, ds.originalStartFrame, newDuration);
      }
    };

    const handlePointerUp = () => {
      if (!dragState.current) return;
      const ds = dragState.current;

      setActiveSnapLines([]);

      // Get current state from store to determine final position
      const currentTimeline = useTimelineStore.getState().timeline;
      if (!currentTimeline) {
        dragState.current = null;
        return;
      }

      const result = findClipAndTrack(currentTimeline, clipId);
      if (!result) {
        dragState.current = null;
        return;
      }

      const { clip } = result;
      const finalStart = clip.startInFrames;
      const finalDuration = clip.durationInFrames;
      const finalTrackId = result.track.id;

      if (ds.mode === 'move') {
        if (finalStart !== ds.originalStartFrame || finalTrackId !== ds.originalTrackId) {
          // Restore to original first, then moveClip will move AND record history
          moveClipImmediate(clipId, ds.originalTrackId, ds.originalStartFrame);
          moveClip(clipId, finalTrackId, finalStart);
        }
      } else if (ds.mode === 'resize-left' || ds.mode === 'resize-right') {
        if (finalStart !== ds.originalStartFrame || finalDuration !== ds.originalDuration) {
          // Restore to original first, then resizeClip will resize AND record history
          resizeClipImmediate(clipId, ds.originalStartFrame, ds.originalDuration);
          resizeClip(clipId, finalStart, finalDuration);
        }
      }

      dragState.current = null;
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [
    clipId,
    trackId,
    pixelsPerFrame,
    timeline,
    moveClipImmediate,
    resizeClipImmediate,
    moveClip,
    resizeClip,
    applySnap,
    setActiveSnapLines,
    getContainer,
    frameFromX,
  ]);

  return {
    onMovePointerDown: (e: React.PointerEvent) => handlePointerDown(e, 'move'),
    onResizeLeftPointerDown: (e: React.PointerEvent) => handlePointerDown(e, 'resize-left'),
    onResizeRightPointerDown: (e: React.PointerEvent) => handlePointerDown(e, 'resize-right'),
    isDragging: !!dragState.current,
  };
}

function findClipAndTrack(
  timeline: Timeline,
  clipId: string
): { clip: import('@easymotion/shared').Clip; track: import('@easymotion/shared').Track } | null {
  for (const track of timeline.tracks) {
    const clip = track.clips.find((c) => c.id === clipId);
    if (clip) {
      return { clip, track };
    }
  }
  return null;
}
