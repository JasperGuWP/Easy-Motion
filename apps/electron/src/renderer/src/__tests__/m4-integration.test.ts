import { describe, it, expect, beforeEach } from 'vitest';
import { useTimelineStore } from '../stores/timelineStore';
import { collectSnapPoints, findSnapPosition } from '../utils/snap';
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
        name: 'Text Track',
        type: 'text',
        order: 0,
        visible: true,
        locked: false,
        clips: [
          {
            id: 'clip-001',
            name: 'Title',
            type: 'text',
            startInFrames: 0,
            durationInFrames: 90,
            source: { kind: 'inline', content: 'Hello' },
            transform: { position: { x: 960, y: 540 }, scale: 1, rotation: 0, opacity: 1 },
            keyframes: [],
          },
          {
            id: 'clip-002',
            name: 'Subtitle',
            type: 'text',
            startInFrames: 100,
            durationInFrames: 60,
            source: { kind: 'inline', content: 'World' },
            transform: { position: { x: 960, y: 600 }, scale: 1, rotation: 0, opacity: 1 },
            keyframes: [],
          },
        ],
      },
      {
        id: 'track-002',
        name: 'Image Track',
        type: 'image',
        order: 1,
        visible: true,
        locked: false,
        clips: [],
      },
    ],
  };
}

describe('M4 Acceptance Criteria', () => {
  beforeEach(() => {
    const store = useTimelineStore.getState();
    store.clearHistory();
    store.loadTimeline(createTestTimeline());
    store.setPixelsPerFrame(2);
    if (!store.snapEnabled) store.toggleSnap();
  });

  it('AC1: moveClip updates position and undo restores original', () => {
    useTimelineStore.getState().moveClip('clip-001', 'track-001', 50);

    let track = useTimelineStore.getState().timeline?.tracks.find((t) => t.id === 'track-001');
    expect(track?.clips.find((c) => c.id === 'clip-001')?.startInFrames).toBe(50);
    expect(useTimelineStore.getState().canUndo()).toBe(true);

    useTimelineStore.getState().undo();

    track = useTimelineStore.getState().timeline?.tracks.find((t) => t.id === 'track-001');
    expect(track?.clips.find((c) => c.id === 'clip-001')?.startInFrames).toBe(0);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    useTimelineStore.getState().redo();
    track = useTimelineStore.getState().timeline?.tracks.find((t) => t.id === 'track-001');
    expect(track?.clips.find((c) => c.id === 'clip-001')?.startInFrames).toBe(50);
  });

  it('AC2: resizeClip updates duration and undo restores original', () => {
    useTimelineStore.getState().resizeClip('clip-001', 0, 120);

    let clip = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(clip?.durationInFrames).toBe(120);
    expect(useTimelineStore.getState().canUndo()).toBe(true);

    useTimelineStore.getState().undo();

    clip = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(clip?.durationInFrames).toBe(90);

    useTimelineStore.getState().redo();
    clip = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(clip?.durationInFrames).toBe(120);
  });

  it('AC3: snap aligns clip to nearby boundary within threshold', () => {
    const timeline = createTestTimeline();
    const snapPoints = collectSnapPoints(timeline, 'clip-001');

    expect(snapPoints).toContain(100);

    const result = findSnapPosition(97, snapPoints, 2);
    expect(result.snapped).toBe(true);
    expect(result.frame).toBe(100);
  });

  it('AC3: snap does not trigger when beyond threshold', () => {
    const timeline = createTestTimeline();
    const snapPoints = collectSnapPoints(timeline, 'clip-001');

    const result = findSnapPosition(80, snapPoints, 2);
    expect(result.snapped).toBe(false);
    expect(result.frame).toBe(80);
  });

  it('AC4: removeSelectedClip deletes clip and undo restores it', () => {
    useTimelineStore.getState().selectClip('clip-001');
    useTimelineStore.getState().removeSelectedClip();

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(1);
    expect(useTimelineStore.getState().timeline?.tracks[0].clips[0].id).toBe('clip-002');
    expect(useTimelineStore.getState().selectedClipId).toBeNull();
    expect(useTimelineStore.getState().canUndo()).toBe(true);

    useTimelineStore.getState().undo();

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(2);
    expect(useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001')).toBeDefined();
  });

  it('AC5: can undo 10 consecutive operations', () => {
    for (let i = 0; i < 10; i++) {
      useTimelineStore.getState().addTrack('text', `Track ${i}`);
    }

    expect(useTimelineStore.getState().historyMeta.pastCount).toBe(10);
    expect(useTimelineStore.getState().canUndo()).toBe(true);

    for (let i = 0; i < 10; i++) {
      useTimelineStore.getState().undo();
    }

    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(2);
    expect(useTimelineStore.getState().canUndo()).toBe(false);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    for (let i = 0; i < 10; i++) {
      useTimelineStore.getState().redo();
    }

    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(12);
    expect(useTimelineStore.getState().canRedo()).toBe(false);
  });

  it('debug: single undo-redo cycle', () => {
    useTimelineStore.getState().addTrack('text', 'Debug Track');
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(3);

    useTimelineStore.getState().undo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(2);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    useTimelineStore.getState().redo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(3);
    expect(useTimelineStore.getState().canRedo()).toBe(false);
  });

  it('debug: two undos two redos', () => {
    useTimelineStore.getState().addTrack('text', 'Track A');
    useTimelineStore.getState().addTrack('text', 'Track B');
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(4);

    useTimelineStore.getState().undo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(3);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    useTimelineStore.getState().undo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(2);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    useTimelineStore.getState().redo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(3);
    expect(useTimelineStore.getState().canRedo()).toBe(true);

    useTimelineStore.getState().redo();
    expect(useTimelineStore.getState().timeline?.tracks).toHaveLength(4);
    expect(useTimelineStore.getState().canRedo()).toBe(false);
  });

  it('AC6: undo stack discards oldest entries at 50 limit', () => {
    for (let i = 0; i < 55; i++) {
      useTimelineStore.getState().moveClip('clip-001', 'track-001', i * 5);
    }

    expect(useTimelineStore.getState().historyMeta.pastCount).toBeLessThanOrEqual(50);
    expect(useTimelineStore.getState().historyMeta.pastCount).toBe(50);

    for (let i = 0; i < 50; i++) {
      useTimelineStore.getState().undo();
    }

    expect(useTimelineStore.getState().canUndo()).toBe(false);
  });

  it('AC7: snap is disabled when snapEnabled is false', () => {
    useTimelineStore.getState().toggleSnap();
    expect(useTimelineStore.getState().snapEnabled).toBe(false);
  });

  it('AC8: zoom changes pixelsPerFrame', () => {
    const initial = useTimelineStore.getState().pixelsPerFrame;
    useTimelineStore.getState().zoomIn();
    expect(useTimelineStore.getState().pixelsPerFrame).toBeGreaterThan(initial);
    useTimelineStore.getState().zoomOut();
    expect(useTimelineStore.getState().pixelsPerFrame).toBeCloseTo(initial, 1);
  });

  it('AC8: zoom clamps to min and max', () => {
    for (let i = 0; i < 20; i++) {
      useTimelineStore.getState().zoomOut();
    }
    expect(useTimelineStore.getState().pixelsPerFrame).toBe(0.5);

    for (let i = 0; i < 20; i++) {
      useTimelineStore.getState().zoomIn();
    }
    expect(useTimelineStore.getState().pixelsPerFrame).toBe(20);
  });

  it('AC9: seekTo clamps frame within bounds', () => {
    useTimelineStore.getState().seekTo(150);
    expect(useTimelineStore.getState().currentFrame).toBe(150);

    useTimelineStore.getState().seekTo(-10);
    expect(useTimelineStore.getState().currentFrame).toBe(0);

    useTimelineStore.getState().seekTo(999);
    expect(useTimelineStore.getState().currentFrame).toBe(299);
  });

  it('moveClip between tracks works and undo restores', () => {
    useTimelineStore.getState().moveClip('clip-001', 'track-002', 20);

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(1);
    expect(useTimelineStore.getState().timeline?.tracks[1].clips).toHaveLength(1);
    expect(useTimelineStore.getState().timeline?.tracks[1].clips[0].startInFrames).toBe(20);

    useTimelineStore.getState().undo();

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(2);
    expect(useTimelineStore.getState().timeline?.tracks[1].clips).toHaveLength(0);
    const restored = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(restored?.startInFrames).toBe(0);
  });

  it('resizeClip with start frame change and undo', () => {
    useTimelineStore.getState().resizeClip('clip-001', 10, 80);

    const clip = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(clip?.startInFrames).toBe(10);
    expect(clip?.durationInFrames).toBe(80);

    useTimelineStore.getState().undo();

    const restored = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(restored?.startInFrames).toBe(0);
    expect(restored?.durationInFrames).toBe(90);
  });

  it('splitClip divides clip in two and undo restores', () => {
    useTimelineStore.getState().splitClip('clip-001', 45);

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(3);
    const clips = useTimelineStore.getState().timeline!.tracks[0].clips;
    expect(clips.filter((c) => c.name === 'Title')).toHaveLength(2);

    const first = clips.find((c) => c.startInFrames === 0);
    const second = clips.find((c) => c.startInFrames === 45);
    expect(first?.durationInFrames).toBe(45);
    expect(second?.durationInFrames).toBe(45);

    useTimelineStore.getState().undo();

    expect(useTimelineStore.getState().timeline?.tracks[0].clips).toHaveLength(2);
    const restored = useTimelineStore.getState().timeline?.tracks[0].clips.find((c) => c.id === 'clip-001');
    expect(restored?.startInFrames).toBe(0);
    expect(restored?.durationInFrames).toBe(90);
  });

  it('keyboard shortcut actions exist', () => {
    const store = useTimelineStore.getState();
    expect(typeof store.removeSelectedClip).toBe('function');
    expect(typeof store.splitClip).toBe('function');
    expect(typeof store.zoomIn).toBe('function');
    expect(typeof store.zoomOut).toBe('function');
    expect(typeof store.toggleSnap).toBe('function');
  });
});
