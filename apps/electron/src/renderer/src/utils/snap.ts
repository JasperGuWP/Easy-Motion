import type { Timeline } from '@easymotion/shared';

export const SNAP_THRESHOLD_PX = 10;

/**
 * Collects all snap points (frame positions) from a timeline.
 * Includes 0 (start of timeline) and all clip boundaries (start and end frames).
 * Excludes boundaries of the clip being dragged if excludeClipId is provided.
 */
export function collectSnapPoints(
  timeline: Timeline,
  excludeClipId?: string
): number[] {
  const points = new Set<number>();
  points.add(0);

  for (const track of timeline.tracks) {
    for (const clip of track.clips) {
      if (clip.id === excludeClipId) continue;
      points.add(clip.startInFrames);
      points.add(clip.startInFrames + clip.durationInFrames);
    }
  }

  return Array.from(points).sort((a, b) => a - b);
}

/**
 * Finds the nearest snap position for a target frame.
 * Snaps if the pixel distance to a snap point is within the threshold.
 */
export function findSnapPosition(
  targetFrame: number,
  snapPoints: number[],
  pixelsPerFrame: number,
  snapThresholdPx: number = SNAP_THRESHOLD_PX
): { frame: number; snapped: boolean } {
  const targetPixel = targetFrame * pixelsPerFrame;
  let nearestFrame = targetFrame;
  let minDistance = Infinity;

  for (const snapFrame of snapPoints) {
    const snapPixel = snapFrame * pixelsPerFrame;
    const distance = Math.abs(targetPixel - snapPixel);

    if (distance < minDistance) {
      minDistance = distance;
      nearestFrame = snapFrame;
    }
  }

  if (minDistance <= snapThresholdPx) {
    return { frame: nearestFrame, snapped: true };
  }

  return { frame: targetFrame, snapped: false };
}
