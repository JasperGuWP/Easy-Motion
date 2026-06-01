import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WritableDraft } from 'immer';
import {
  type Clip,
  type Keyframe,
  type Timeline,
  type Track,
  type TrackType,
  type Transform,
  MAX_UNDO_STEPS,
} from '@easymotion/shared';
import {
  CommandHistory,
  PatchCommand,
  MoveClipCommand,
  ResizeClipCommand,
  ReorderTracksCommand,
  AddTrackCommand,
  RemoveTrackCommand,
  AddClipCommand,
  RemoveClipCommand,
  ToggleTrackVisibilityCommand,
  ToggleTrackLockCommand,
  UpdateKeyframeCommand,
} from './commands';
import type { Command } from './commands';

const commandHistory = new CommandHistory(MAX_UNDO_STEPS);

interface TimelineState {
  timeline: Timeline | null;
  currentFrame: number;
  isPlaying: boolean;
  playbackSpeed: number;
  loopRange: [number, number] | null;
  selectedTrackId: string | null;
  selectedClipId: string | null;
  selectedKeyframeId: string | null;
  historyMeta: { canUndo: boolean; canRedo: boolean; pastCount: number; futureCount: number };
  hasUnsavedChanges: boolean;
  isGenerating: boolean;
  generatorProgress: number;
  pixelsPerFrame: number;
  snapEnabled: boolean;
  scrollLeft: number;
  activeSnapLines: number[];
}

interface TimelineActions {
  loadTimeline(timeline: Timeline): void;
  addTrack(type: TrackType, name?: string): string;
  removeTrack(trackId: string): void;
  reorderTracks(trackIds: string[]): void;
  toggleTrackVisibility(trackId: string): void;
  toggleTrackLock(trackId: string): void;
  toggleTrackMute(trackId: string): void;
  toggleTrackSolo(trackId: string): void;
  addClip(trackId: string, clip: Clip): void;
  removeClip(trackId: string, clipId: string): void;
  moveClip(clipId: string, targetTrackId: string, newStartFrame: number): void;
  moveClipImmediate(clipId: string, targetTrackId: string, newStartFrame: number): void;
  resizeClip(clipId: string, newStartFrame: number, newDuration: number): void;
  resizeClipImmediate(clipId: string, newStartFrame: number, newDuration: number): void;
  updateClipTransform(clipId: string, transform: Partial<Transform>): void;
  addKeyframe(clipId: string, keyframe: Keyframe): void;
  removeKeyframe(clipId: string, keyframeId: string): void;
  updateKeyframe(clipId: string, keyframeId: string, updates: Partial<Keyframe>): void;
  selectTrack(trackId: string | null): void;
  selectClip(clipId: string | null): void;
  selectKeyframe(keyframeId: string | null): void;
  play(): void;
  pause(): void;
  seekTo(frame: number): void;
  setPlaybackSpeed(speed: number): void;
  setLoopRange(range: [number, number] | null): void;
  stepForward(frames?: number): void;
  stepBackward(frames?: number): void;
  undo(): void;
  redo(): void;
  canUndo(): boolean;
  canRedo(): boolean;
  clearHistory(): void;
  setGenerating(isGenerating: boolean, progress?: number): void;
  setPixelsPerFrame(value: number): void;
  zoomIn(): void;
  zoomOut(): void;
  setScrollLeft(value: number): void;
  toggleSnap(): void;
  removeSelectedClip(): void;
  splitClip(clipId: string, splitFrame: number): void;
  setActiveSnapLines(lines: number[]): void;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

function pushPatchCommand(
  state: WritableDraft<TimelineState>,
  before: Timeline
): void {
  if (!state.timeline) return;
  const after = deepClone(state.timeline);
  commandHistory.push(new PatchCommand(before, after));
  state.historyMeta.canUndo = commandHistory.canUndo();
  state.historyMeta.canRedo = commandHistory.canRedo();
  state.historyMeta.pastCount = commandHistory.getPastCount();
  state.historyMeta.futureCount = commandHistory.getFutureCount();
}

function pushCommand(state: WritableDraft<TimelineState>, command: Command): void {
  commandHistory.push(command);
  state.historyMeta.canUndo = commandHistory.canUndo();
  state.historyMeta.canRedo = commandHistory.canRedo();
  state.historyMeta.pastCount = commandHistory.getPastCount();
  state.historyMeta.futureCount = commandHistory.getFutureCount();
}

function findClipAndTrack(
  timeline: Timeline,
  clipId: string
): { clip: Clip; track: Track } | null {
  for (const track of timeline.tracks) {
    const clip = track.clips.find((c) => c.id === clipId);
    if (clip) {
      return { clip, track };
    }
  }
  return null;
}

const initialState: TimelineState = {
  timeline: null,
  currentFrame: 0,
  isPlaying: false,
  playbackSpeed: 1,
  loopRange: null,
  selectedTrackId: null,
  selectedClipId: null,
  selectedKeyframeId: null,
  historyMeta: { canUndo: false, canRedo: false, pastCount: 0, futureCount: 0 },
  hasUnsavedChanges: false,
  isGenerating: false,
  generatorProgress: 0,
  pixelsPerFrame: 2,
  snapEnabled: true,
  scrollLeft: 0,
  activeSnapLines: [],
};

type TimelineStore = TimelineState & TimelineActions;

export const useTimelineStore = create<TimelineStore>()(
  devtools(
    immer((set) => ({
      ...initialState,

      loadTimeline: (timeline) => {
        set((state) => {
          state.timeline = timeline;
          commandHistory.clear();
          state.historyMeta = { canUndo: false, canRedo: false, pastCount: 0, futureCount: 0 };
          state.hasUnsavedChanges = false;
          state.currentFrame = 0;
          state.isPlaying = false;
        });
      },

      addTrack: (type, name) => {
        const trackId = crypto.randomUUID();
        set((state) => {
          if (!state.timeline) return;
          const maxOrder = state.timeline.tracks.reduce(
            (max, t) => Math.max(max, t.order),
            -1
          );
          const newTrack: Track = {
            id: trackId,
            name: name || `${type} Track`,
            type,
            order: maxOrder + 1,
            visible: true,
            locked: false,
            clips: [],
          };
          state.timeline.tracks.push(newTrack);
          state.hasUnsavedChanges = true;
          pushCommand(state, new AddTrackCommand(trackId, deepClone(newTrack)));
        });
        return trackId;
      },

      removeTrack: (trackId) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          const trackData = deepClone(track);
          state.timeline.tracks = state.timeline.tracks.filter(
            (t) => t.id !== trackId
          );
          state.hasUnsavedChanges = true;
          pushCommand(state, new RemoveTrackCommand(trackId, trackData));
        });
      },

      reorderTracks: (trackIds) => {
        set((state) => {
          if (!state.timeline) return;
          const oldOrder = state.timeline.tracks.map((t) => t.id);
          const trackMap = new Map(state.timeline.tracks.map((t) => [t.id, t]));
          const reordered: Track[] = [];
          for (const id of trackIds) {
            const track = trackMap.get(id);
            if (track) {
              reordered.push(track);
            }
          }
          const existingIds = new Set(trackIds);
          for (const track of state.timeline.tracks) {
            if (!existingIds.has(track.id)) {
              reordered.push(track);
            }
          }
          reordered.forEach((track, index) => {
            track.order = index;
          });
          state.timeline.tracks = reordered;
          const newOrder = state.timeline.tracks.map((t) => t.id);
          state.hasUnsavedChanges = true;
          pushCommand(state, new ReorderTracksCommand(oldOrder, newOrder));
        });
      },

      toggleTrackVisibility: (trackId) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          const oldValue = track.visible;
          track.visible = !track.visible;
          state.hasUnsavedChanges = true;
          pushCommand(state, new ToggleTrackVisibilityCommand(trackId, oldValue, track.visible));
        });
      },

      toggleTrackLock: (trackId) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          const oldValue = track.locked;
          track.locked = !track.locked;
          state.hasUnsavedChanges = true;
          pushCommand(state, new ToggleTrackLockCommand(trackId, oldValue, track.locked));
        });
      },

      toggleTrackMute: (trackId) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          track.muted = !track.muted;
          state.hasUnsavedChanges = true;
        });
      },

      toggleTrackSolo: (trackId) => {
        set((state) => {
          if (!state.timeline) return;
          const targetTrack = state.timeline.tracks.find((t) => t.id === trackId);
          if (!targetTrack) return;

          const isCurrentlySoloed =
            !targetTrack.muted &&
            state.timeline.tracks
              .filter((t) => t.id !== trackId && t.type === 'audio')
              .every((t) => t.muted);

          if (isCurrentlySoloed) {
            state.timeline.tracks.forEach((t) => {
              if (t.type === 'audio') t.muted = false;
            });
          } else {
            state.timeline.tracks.forEach((t) => {
              if (t.type === 'audio') {
                t.muted = t.id !== trackId;
              }
            });
          }
          state.hasUnsavedChanges = true;
        });
      },

      addClip: (trackId, clip) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          track.clips.push(clip);
          state.hasUnsavedChanges = true;
          pushCommand(state, new AddClipCommand(trackId, deepClone(clip)));
        });
      },

      removeClip: (trackId, clipId) => {
        set((state) => {
          if (!state.timeline) return;
          const track = state.timeline.tracks.find((t) => t.id === trackId);
          if (!track) return;
          const clip = track.clips.find((c) => c.id === clipId);
          if (!clip) return;
          const clipData = deepClone(clip);
          track.clips = track.clips.filter((c) => c.id !== clipId);
          state.hasUnsavedChanges = true;
          pushCommand(state, new RemoveClipCommand(trackId, clipData));
        });
      },

      moveClip: (clipId, targetTrackId, newStartFrame) => {
        set((state) => {
          if (!state.timeline) return;
          const result = findClipAndTrack(state.timeline, clipId);
          if (!result) return;
          const { clip, track: sourceTrack } = result;
          const oldTrackId = sourceTrack.id;
          const oldStartFrame = clip.startInFrames;
          sourceTrack.clips = sourceTrack.clips.filter((c) => c.id !== clipId);
          const targetTrack = state.timeline.tracks.find(
            (t) => t.id === targetTrackId
          );
          if (!targetTrack) return;
          clip.startInFrames = newStartFrame;
          targetTrack.clips.push(clip);
          state.hasUnsavedChanges = true;
          pushCommand(
            state,
            new MoveClipCommand(clipId, oldTrackId, targetTrackId, oldStartFrame, newStartFrame)
          );
        });
      },

      moveClipImmediate: (clipId, targetTrackId, newStartFrame) => {
        set((state) => {
          if (!state.timeline) return;
          const result = findClipAndTrack(state.timeline, clipId);
          if (!result) return;
          const { clip, track: sourceTrack } = result;
          sourceTrack.clips = sourceTrack.clips.filter((c) => c.id !== clipId);
          const targetTrack = state.timeline.tracks.find((t) => t.id === targetTrackId);
          if (!targetTrack) return;
          clip.startInFrames = newStartFrame;
          targetTrack.clips.push(clip);
        });
      },

      resizeClip: (clipId, newStartFrame, newDuration) => {
        set((state) => {
          if (!state.timeline) return;
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              const oldStartFrame = clip.startInFrames;
              const oldDuration = clip.durationInFrames;
              clip.startInFrames = newStartFrame;
              clip.durationInFrames = newDuration;
              state.hasUnsavedChanges = true;
              pushCommand(
                state,
                new ResizeClipCommand(clipId, oldStartFrame, newStartFrame, oldDuration, newDuration)
              );
              return;
            }
          }
        });
      },

      resizeClipImmediate: (clipId, newStartFrame, newDuration) => {
        set((state) => {
          if (!state.timeline) return;
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              clip.startInFrames = newStartFrame;
              clip.durationInFrames = newDuration;
              return;
            }
          }
        });
      },

      updateClipTransform: (clipId, transform) => {
        set((state) => {
          if (!state.timeline) return;
          const before = deepClone(state.timeline);
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              clip.transform = { ...clip.transform, ...transform };
              state.hasUnsavedChanges = true;
              pushPatchCommand(state, before);
              return;
            }
          }
        });
      },

      addKeyframe: (clipId, keyframe) => {
        set((state) => {
          if (!state.timeline) return;
          const before = deepClone(state.timeline);
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              clip.keyframes.push(keyframe);
              state.hasUnsavedChanges = true;
              pushPatchCommand(state, before);
              return;
            }
          }
        });
      },

      removeKeyframe: (clipId, keyframeId) => {
        set((state) => {
          if (!state.timeline) return;
          const before = deepClone(state.timeline);
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              clip.keyframes = clip.keyframes.filter((k) => k.id !== keyframeId);
              state.hasUnsavedChanges = true;
              pushPatchCommand(state, before);
              return;
            }
          }
        });
      },

      updateKeyframe: (clipId, keyframeId, updates) => {
        set((state) => {
          if (!state.timeline) return;
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              const keyframe = clip.keyframes.find((k) => k.id === keyframeId);
              if (keyframe) {
                const oldKeyframe = deepClone(keyframe);
                Object.assign(keyframe, updates);
                const newKeyframe = deepClone(keyframe);
                state.hasUnsavedChanges = true;
                pushCommand(
                  state,
                  new UpdateKeyframeCommand(clipId, keyframeId, oldKeyframe, newKeyframe)
                );
              }
              return;
            }
          }
        });
      },

      selectTrack: (trackId) => {
        set((state) => {
          state.selectedTrackId = trackId;
        });
      },

      selectClip: (clipId) => {
        set((state) => {
          state.selectedClipId = clipId;
        });
      },

      selectKeyframe: (keyframeId) => {
        set((state) => {
          state.selectedKeyframeId = keyframeId;
        });
      },

      play: () => {
        set((state) => {
          state.isPlaying = true;
        });
      },

      pause: () => {
        set((state) => {
          state.isPlaying = false;
        });
      },

      seekTo: (frame) => {
        set((state) => {
          if (!state.timeline) return;
          state.currentFrame = Math.max(
            0,
            Math.min(frame, state.timeline.durationInFrames - 1)
          );
        });
      },

      setPlaybackSpeed: (speed) => {
        set((state) => {
          state.playbackSpeed = speed;
        });
      },

      setLoopRange: (range) => {
        set((state) => {
          state.loopRange = range;
        });
      },

      stepForward: (frames = 1) => {
        set((state) => {
          if (!state.timeline) return;
          state.currentFrame = Math.min(
            state.currentFrame + frames,
            state.timeline.durationInFrames - 1
          );
        });
      },

      stepBackward: (frames = 1) => {
        set((state) => {
          state.currentFrame = Math.max(0, state.currentFrame - frames);
        });
      },

      undo: () => {
        set((state) => {
          if (!state.timeline || !commandHistory.canUndo()) return;
          const command = commandHistory.popUndo()!;
          commandHistory.pushRedo(command);
          command.undo(state.timeline);
          state.hasUnsavedChanges = true;
          state.historyMeta.canUndo = commandHistory.canUndo();
          state.historyMeta.canRedo = commandHistory.canRedo();
          state.historyMeta.pastCount = commandHistory.getPastCount();
          state.historyMeta.futureCount = commandHistory.getFutureCount();
        });
      },

      redo: () => {
        set((state) => {
          if (!state.timeline || !commandHistory.canRedo()) return;
          const command = commandHistory.popRedo()!;
          commandHistory.pushToPast(command);
          command.execute(state.timeline);
          state.hasUnsavedChanges = true;
          state.historyMeta.canUndo = commandHistory.canUndo();
          state.historyMeta.canRedo = commandHistory.canRedo();
          state.historyMeta.pastCount = commandHistory.getPastCount();
          state.historyMeta.futureCount = commandHistory.getFutureCount();
        });
      },

      canUndo: () => {
        return commandHistory.canUndo();
      },

      canRedo: () => {
        return commandHistory.canRedo();
      },

      clearHistory: () => {
        set((state) => {
          commandHistory.clear();
          state.historyMeta = { canUndo: false, canRedo: false, pastCount: 0, futureCount: 0 };
        });
      },

      setGenerating: (isGenerating, progress) => {
        set((state) => {
          state.isGenerating = isGenerating;
          if (progress !== undefined) {
            state.generatorProgress = progress;
          }
        });
      },

      setPixelsPerFrame: (value) => {
        set((state) => {
          state.pixelsPerFrame = Math.max(0.5, Math.min(20, value));
        });
      },

      zoomIn: () => {
        set((state) => {
          state.pixelsPerFrame = Math.min(20, state.pixelsPerFrame * 1.25);
        });
      },

      zoomOut: () => {
        set((state) => {
          state.pixelsPerFrame = Math.max(0.5, state.pixelsPerFrame / 1.25);
        });
      },

      setScrollLeft: (value) => {
        set((state) => {
          state.scrollLeft = Math.max(0, value);
        });
      },

      toggleSnap: () => {
        set((state) => {
          state.snapEnabled = !state.snapEnabled;
        });
      },

      removeSelectedClip: () => {
        set((state) => {
          if (!state.timeline || !state.selectedClipId) return;
          const clipId = state.selectedClipId;
          for (const track of state.timeline.tracks) {
            const clip = track.clips.find((c) => c.id === clipId);
            if (clip) {
              const clipData = deepClone(clip);
              track.clips = track.clips.filter((c) => c.id !== clipId);
              state.selectedClipId = null;
              state.hasUnsavedChanges = true;
              pushCommand(state, new RemoveClipCommand(track.id, clipData));
              return;
            }
          }
        });
      },

      splitClip: (clipId, splitFrame) => {
        set((state) => {
          if (!state.timeline) return;
          const before = deepClone(state.timeline);

          for (const track of state.timeline.tracks) {
            const clipIndex = track.clips.findIndex((c) => c.id === clipId);
            if (clipIndex === -1) continue;

            const originalClip = track.clips[clipIndex];
            const clipStart = originalClip.startInFrames;
            const clipEnd = clipStart + originalClip.durationInFrames;

            if (splitFrame <= clipStart || splitFrame >= clipEnd) return;

            const firstDuration = splitFrame - clipStart;
            const secondDuration = clipEnd - splitFrame;

            const firstClip: Clip = {
              id: crypto.randomUUID(),
              name: originalClip.name,
              type: originalClip.type,
              startInFrames: clipStart,
              durationInFrames: firstDuration,
              source: originalClip.source,
              transform: { ...originalClip.transform },
              style: originalClip.style ? deepClone(originalClip.style) : undefined,
              keyframes: originalClip.keyframes.map((k) => ({ ...k })),
              animations: originalClip.animations
                ? { in: originalClip.animations.in, out: originalClip.animations.out }
                : undefined,
              lastModifiedBy: originalClip.lastModifiedBy,
            };

            const secondClip: Clip = {
              id: crypto.randomUUID(),
              name: originalClip.name,
              type: originalClip.type,
              startInFrames: splitFrame,
              durationInFrames: secondDuration,
              source: originalClip.source,
              transform: { ...originalClip.transform },
              style: originalClip.style ? deepClone(originalClip.style) : undefined,
              keyframes: originalClip.keyframes.map((k) => ({ ...k })),
              animations: originalClip.animations
                ? { in: originalClip.animations.in, out: originalClip.animations.out }
                : undefined,
              lastModifiedBy: originalClip.lastModifiedBy,
            };

            track.clips.splice(clipIndex, 1, firstClip, secondClip);
            state.selectedClipId = null;
            state.hasUnsavedChanges = true;
            pushPatchCommand(state, before);
            return;
          }
        });
      },

      setActiveSnapLines: (lines) => {
        set((state) => {
          state.activeSnapLines = lines;
        });
      },
    })),
    { name: 'TimelineStore' }
  )
);
