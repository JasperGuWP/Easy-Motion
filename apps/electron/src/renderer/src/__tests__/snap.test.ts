import { describe, it, expect } from 'vitest';
import { collectSnapPoints, findSnapPosition, SNAP_THRESHOLD_PX } from '../utils/snap';
import type { Timeline } from '@easymotion/shared';

function createTestTimeline(): Timeline {
  return {
    id: 'tl-test',
    version: '1.0',
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
    tracks: [
      {
        id: 'track-001',
        name: 'Video Track',
        type: 'video',
        order: 0,
        visible: true,
        locked: false,
        clips: [
          {
            id: 'clip-001',
            name: 'Intro',
            type: 'video',
            startInFrames: 0,
            durationInFrames: 60,
            source: { kind: 'asset', assetId: 'asset-001', path: '/intro.mp4' },
            transform: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
            keyframes: [],
          },
          {
            id: 'clip-002',
            name: 'Main',
            type: 'video',
            startInFrames: 60,
            durationInFrames: 120,
            source: { kind: 'asset', assetId: 'asset-002', path: '/main.mp4' },
            transform: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
            keyframes: [],
          },
        ],
      },
      {
        id: 'track-002',
        name: 'Audio Track',
        type: 'audio',
        order: 1,
        visible: true,
        locked: false,
        clips: [
          {
            id: 'clip-003',
            name: 'Music',
            type: 'audio',
            startInFrames: 30,
            durationInFrames: 90,
            source: { kind: 'asset', assetId: 'asset-003', path: '/music.mp3' },
            transform: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
            keyframes: [],
          },
        ],
      },
    ],
  };
}

describe('collectSnapPoints', () => {
  it('returns 0 and all clip boundaries from multiple tracks', () => {
    const timeline = createTestTimeline();
    const points = collectSnapPoints(timeline);

    // clip-001: 0, 60
    // clip-002: 60, 180
    // clip-003: 30, 120
    // plus 0
    expect(points).toEqual([0, 30, 60, 120, 180]);
  });

  it('excludes boundaries of the dragged clip', () => {
    const timeline = createTestTimeline();
    const points = collectSnapPoints(timeline, 'clip-001');

    // clip-001 boundaries (0, 60) should be excluded
    // clip-002: 60, 180
    // clip-003: 30, 120
    // plus 0 (still included)
    expect(points).toEqual([0, 30, 60, 120, 180]);
    expect(points.filter((p) => p === 0)).toHaveLength(1);
    expect(points.filter((p) => p === 60)).toHaveLength(1);
  });

  it('excludes boundaries of a middle clip', () => {
    const timeline = createTestTimeline();
    const points = collectSnapPoints(timeline, 'clip-002');

    // clip-002 boundaries (60, 180) should be excluded
    // clip-001: 0, 60
    // clip-003: 30, 120
    // plus 0
    expect(points).toEqual([0, 30, 60, 120]);
  });

  it('returns only 0 for an empty timeline', () => {
    const timeline: Timeline = {
      id: 'tl-empty',
      version: '1.0',
      fps: 30,
      durationInFrames: 300,
      width: 1920,
      height: 1080,
      tracks: [],
    };

    const points = collectSnapPoints(timeline);
    expect(points).toEqual([0]);
  });

  it('returns sorted unique points when clips share boundaries', () => {
    const timeline: Timeline = {
      id: 'tl-overlap',
      version: '1.0',
      fps: 30,
      durationInFrames: 300,
      width: 1920,
      height: 1080,
      tracks: [
        {
          id: 'track-001',
          name: 'Track 1',
          type: 'video',
          order: 0,
          visible: true,
          locked: false,
          clips: [
            {
              id: 'clip-001',
              name: 'Clip 1',
              type: 'video',
              startInFrames: 0,
              durationInFrames: 50,
              source: { kind: 'inline', content: '' },
              transform: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
              keyframes: [],
            },
            {
              id: 'clip-002',
              name: 'Clip 2',
              type: 'video',
              startInFrames: 50,
              durationInFrames: 50,
              source: { kind: 'inline', content: '' },
              transform: { position: { x: 0, y: 0 }, scale: 1, rotation: 0, opacity: 1 },
              keyframes: [],
            },
          ],
        },
      ],
    };

    const points = collectSnapPoints(timeline);
    expect(points).toEqual([0, 50, 100]);
  });
});

describe('findSnapPosition', () => {
  const snapPoints = [0, 30, 60, 120, 180];

  it('snaps to exact match', () => {
    const result = findSnapPosition(60, snapPoints, 2);
    expect(result).toEqual({ frame: 60, snapped: true });
  });

  it('snaps when within threshold', () => {
    // At 2px per frame, threshold is 10px = 5 frames
    // target 58 -> 4px away from 60 -> should snap
    const result = findSnapPosition(58, snapPoints, 2);
    expect(result).toEqual({ frame: 60, snapped: true });
  });

  it('snaps to nearest point when multiple are within threshold', () => {
    // target 55 -> 10px from 60, 50px from 30 -> should snap to 60
    const result = findSnapPosition(55, snapPoints, 2);
    expect(result).toEqual({ frame: 60, snapped: true });
  });

  it('does not snap when just outside threshold', () => {
    // At 2px per frame, threshold is 10px = 5 frames
    // target 54 -> 12px away from 60 -> should NOT snap
    const result = findSnapPosition(54, snapPoints, 2);
    expect(result).toEqual({ frame: 54, snapped: false });
  });

  it('snaps when just within threshold boundary', () => {
    // At 2px per frame, threshold is 10px = 5 frames
    // target 55 -> 10px away from 60 -> should snap (exactly at threshold)
    const result = findSnapPosition(55, snapPoints, 2);
    expect(result).toEqual({ frame: 60, snapped: true });
  });

  it('does not snap when far from any point', () => {
    const result = findSnapPosition(500, snapPoints, 2);
    expect(result).toEqual({ frame: 500, snapped: false });
  });

  it('uses custom threshold', () => {
    // With threshold 20px at 2px/frame = 10 frames
    // target 50 -> 20px away from 60 -> should snap with custom threshold
    const result = findSnapPosition(50, snapPoints, 2, 20);
    expect(result).toEqual({ frame: 60, snapped: true });
  });

  it('respects default SNAP_THRESHOLD_PX', () => {
    expect(SNAP_THRESHOLD_PX).toBe(10);
  });

  it('snaps to 0 when near start', () => {
    // target 4 -> 8px away from 0 -> should snap
    const result = findSnapPosition(4, snapPoints, 2);
    expect(result).toEqual({ frame: 0, snapped: true });
  });

  it('does not snap to 0 when just outside threshold', () => {
    // target -6 -> 12px away from 0 -> should NOT snap
    const result = findSnapPosition(-6, snapPoints, 2);
    expect(result).toEqual({ frame: -6, snapped: false });
  });

  it('handles empty snapPoints by returning original frame', () => {
    const result = findSnapPosition(50, [], 2);
    expect(result).toEqual({ frame: 50, snapped: false });
  });

  it('handles different pixelsPerFrame values correctly', () => {
    // At 1px per frame, threshold is 10px = 10 frames
    // target 52 -> 8px away from 60 -> should snap
    const result = findSnapPosition(52, snapPoints, 1);
    expect(result).toEqual({ frame: 60, snapped: true });

    // At 5px per frame, threshold is 10px = 2 frames
    // target 58 -> 10px away from 60 -> should snap
    const result2 = findSnapPosition(58, snapPoints, 5);
    expect(result2).toEqual({ frame: 60, snapped: true });

    // At 5px per frame, threshold is 10px = 2 frames
    // target 57 -> 15px away from 60 -> should NOT snap
    const result3 = findSnapPosition(57, snapPoints, 5);
    expect(result3).toEqual({ frame: 57, snapped: false });
  });
});
