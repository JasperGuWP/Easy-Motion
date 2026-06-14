const { randomUUID } = require("node:crypto");
const { validateTimeline } = require("@easymotion/shared");
const { needsUserOverwriteConfirm } = require("./conflict");

const VALID_KEYFRAME_EASING = [
  "linear",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "spring",
];
const VALID_KEYFRAME_INTERPOLATION = ["linear", "bezier", "hold"];

function newId(prefix) {
  return `${prefix}-${randomUUID()}`;
}

function findTrackById(tracks, trackId) {
  for (const track of tracks) {
    if (track.id === trackId) return track;
    if (track.children) {
      for (const child of track.children) {
        if (child.id === trackId) return child;
      }
    }
  }
  return null;
}

function findClipLocation(tracks, clipId) {
  for (const track of tracks) {
    for (const clip of track.clips ?? []) {
      if (clip.id === clipId) {
        return { track, clip };
      }
    }
    if (track.children) {
      for (const child of track.children) {
        for (const clip of child.clips ?? []) {
          if (clip.id === clipId) {
            return { track: child, clip, parentGroup: track };
          }
        }
      }
    }
  }
  return null;
}

function patchTrack(timeline, trackId, updater) {
  let found = false;

  const tracks = timeline.tracks.map((track) => {
    if (track.id === trackId) {
      found = true;
      return updater(track);
    }
    if (!track.children?.length) return track;

    let childChanged = false;
    const children = track.children.map((child) => {
      if (child.id !== trackId) return child;
      childChanged = true;
      found = true;
      return updater(child);
    });
    return childChanged ? { ...track, children } : track;
  });

  if (!found) {
    throw new Error(`轨道不存在: ${trackId}`);
  }

  const next = { ...timeline, tracks };
  validateTimeline(next);
  return next;
}

function createTrack(timeline, { name, type, order }) {
  const maxOrder = timeline.tracks.reduce((max, track) => Math.max(max, track.order), -1);
  const track = {
    id: newId("track"),
    name,
    type,
    order: typeof order === "number" ? order : maxOrder + 1,
    visible: true,
    locked: false,
    muted: false,
    clips: [],
  };

  if (type === "group") {
    track.children = [];
    track.collapsed = false;
  }

  const tracks = [...timeline.tracks, track]
    .sort((a, b) => a.order - b.order)
    .map((item, index) => ({ ...item, order: index }));

  const next = { ...timeline, tracks };
  validateTimeline(next);
  return { timeline: next, track };
}

function createClip(timeline, params) {
  const {
    trackId,
    name,
    startInFrames,
    durationInFrames,
    source,
    transform,
    style,
    animations,
  } = params;

  const target = findTrackById(timeline.tracks, trackId);
  if (!target) {
    throw new Error(`轨道不存在: ${trackId}`);
  }
  if (target.type === "group") {
    throw new Error("不能在 group 轨道上直接创建片段，请使用子轨道");
  }
  if (target.locked) {
    throw new Error("轨道已锁定");
  }

  const start = Math.max(0, Math.min(startInFrames, timeline.durationInFrames - 1));
  const duration = Math.max(
    1,
    Math.min(durationInFrames, timeline.durationInFrames - start)
  );

  const clip = {
    id: newId("clip"),
    type: target.type,
    name,
    startInFrames: start,
    durationInFrames: duration,
    source:
      source ??
      (target.type === "shape"
        ? {
            kind: "inline",
            shape: "rect",
            width: timeline.width,
            height: timeline.height,
          }
        : { kind: "inline", content: name }),
    transform: transform ?? {
      position: { x: timeline.width / 2, y: timeline.height / 2 },
      scale: 1,
      rotation: 0,
      opacity: 1,
    },
    style: style ?? {},
    keyframes: [],
    ...(animations ? { animations } : {}),
  };

  const next = patchTrack(timeline, trackId, (track) => ({
    ...track,
    clips: [...(track.clips ?? []), clip],
  }));

  return { timeline: next, clip };
}

function setAnimation(timeline, { clipId, animationType, config, confirmOverwrite = false }) {
  const located = findClipLocation(timeline.tracks, clipId);
  if (!located) {
    throw new Error(`片段不存在: ${clipId}`);
  }

  if (needsUserOverwriteConfirm(located.clip) && !confirmOverwrite) {
    throw new Error("E2010: 您手动调整了此片段，需要确认后才能覆盖");
  }

  const key = animationType === "out" ? "out" : "in";
  const next = patchTrack(timeline, located.track.id, (track) => ({
    ...track,
    clips: track.clips.map((clip) => {
      if (clip.id !== clipId) return clip;
      return markClipAiModified({
        ...clip,
        animations: {
          ...(clip.animations ?? {}),
          [key]: config,
        },
      });
    }),
  }));

  return { timeline: next, clipId };
}

function scoreMatch(text, query) {
  const hay = String(text ?? "").toLowerCase();
  const needle = String(query ?? "").toLowerCase().trim();
  if (!needle) return 0;
  if (hay === needle) return 1;
  if (hay.includes(needle)) return 0.85;
  const tokens = needle.split(/\s+/).filter(Boolean);
  const hits = tokens.filter((token) => hay.includes(token)).length;
  return hits / tokens.length;
}

function queryElement(timeline, { query, type }) {
  const matches = [];

  const pushMatch = (item) => {
    matches.push(item);
  };

  for (const track of timeline.tracks) {
    if (type === "track") {
      const confidence = scoreMatch(track.name, query);
      if (confidence > 0.2) {
        pushMatch({
          id: track.id,
          name: track.name,
          type: track.type,
          confidence,
        });
      }
    }

    const scanClips = (ownerTrack, parentTrack = null) => {
      if (type !== "clip") return;
      for (const clip of ownerTrack.clips ?? []) {
        const content = clip.source?.content ?? "";
        const component = clip.source?.component ?? "";
        const confidence = Math.max(
          scoreMatch(clip.name, query),
          scoreMatch(content, query),
          scoreMatch(ownerTrack.name, query),
          scoreMatch(component, query),
          parentTrack ? scoreMatch(parentTrack.name, query) : 0
        );
        if (confidence > 0.2) {
          pushMatch({
            id: clip.id,
            name: clip.name,
            type: clip.type,
            confidence,
          });
        }
      }
    };

    scanClips(track);
    for (const child of track.children ?? []) {
      if (type === "track") {
        const confidence = scoreMatch(child.name, query);
        if (confidence > 0.2) {
          pushMatch({
            id: child.id,
            name: child.name,
            type: child.type,
            confidence,
          });
        }
      }
      scanClips(child, track);
    }
  }

  matches.sort((a, b) => b.confidence - a.confidence);
  return {
    matches,
    bestMatch: matches[0]?.id ?? null,
  };
}

function applyClipUpdates(clip, updates) {
  const next = structuredClone(clip);
  for (const [path, value] of Object.entries(updates)) {
    if (!path.includes(".")) {
      next[path] = value;
      continue;
    }
    const parts = path.split(".");
    let cursor = next;
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i];
      if (!cursor[key] || typeof cursor[key] !== "object") {
        cursor[key] = {};
      }
      cursor = cursor[key];
    }
    cursor[parts[parts.length - 1]] = value;
  }
  return next;
}

function markClipAiModified(clip) {
  return {
    ...clip,
    lastModifiedBy: "ai",
    lastModifiedAt: Date.now(),
  };
}

function updateClip(timeline, { clipId, updates, confirmOverwrite = false }) {
  const located = findClipLocation(timeline.tracks, clipId);
  if (!located) {
    throw new Error(`片段不存在: ${clipId}`);
  }

  if (needsUserOverwriteConfirm(located.clip) && !confirmOverwrite) {
    throw new Error("E2010: 您手动调整了此片段，需要确认后才能覆盖");
  }

  const next = patchTrack(timeline, located.track.id, (track) => ({
    ...track,
    clips: track.clips.map((clip) =>
      clip.id === clipId
        ? markClipAiModified(applyClipUpdates(clip, updates))
        : clip
    ),
  }));

  return { timeline: next, clipId };
}

function deleteClip(timeline, { clipId }) {
  const located = findClipLocation(timeline.tracks, clipId);
  if (!located) {
    throw new Error(`片段不存在: ${clipId}`);
  }
  if (located.track.locked) {
    throw new Error("轨道已锁定");
  }

  const next = patchTrack(timeline, located.track.id, (track) => ({
    ...track,
    clips: track.clips.filter((clip) => clip.id !== clipId),
  }));

  return { timeline: next, clipId, trackId: located.track.id };
}

function addKeyframe(
  timeline,
  { clipId, property, frame, value, easing = "linear", interpolation = "linear", confirmOverwrite = false }
) {
  const located = findClipLocation(timeline.tracks, clipId);
  if (!located) {
    throw new Error(`片段不存在: ${clipId}`);
  }
  if (located.track.locked) {
    throw new Error("轨道已锁定");
  }
  if (needsUserOverwriteConfirm(located.clip) && !confirmOverwrite) {
    throw new Error("E2010: 您手动调整了此片段，需要确认后才能覆盖");
  }

  const prop = String(property ?? "").trim();
  if (!prop) {
    throw new Error("property 不能为空");
  }
  if (!VALID_KEYFRAME_EASING.includes(easing)) {
    throw new Error(`不支持的 easing: ${easing}`);
  }
  if (!VALID_KEYFRAME_INTERPOLATION.includes(interpolation)) {
    throw new Error(`不支持的 interpolation: ${interpolation}`);
  }

  const frameNumber = Math.round(frame);
  if (!Number.isFinite(frameNumber) || frameNumber < 0) {
    throw new Error("frame 必须是非负整数");
  }
  if (frameNumber >= located.clip.durationInFrames) {
    throw new Error("关键帧 frame 必须小于片段 durationInFrames");
  }

  const keyframe = {
    id: newId("kf"),
    property: prop,
    frame: frameNumber,
    value,
    easing,
    interpolation,
  };

  const next = patchTrack(timeline, located.track.id, (track) => ({
    ...track,
    clips: track.clips.map((clip) => {
      if (clip.id !== clipId) return clip;
      const keyframes = [...(clip.keyframes ?? [])];
      const existingIndex = keyframes.findIndex(
        (item) => item.property === prop && item.frame === frameNumber
      );
      if (existingIndex >= 0) {
        keyframes[existingIndex] = { ...keyframes[existingIndex], ...keyframe, id: keyframes[existingIndex].id };
      } else {
        keyframes.push(keyframe);
      }
      keyframes.sort((a, b) => a.frame - b.frame || a.property.localeCompare(b.property));
      return markClipAiModified({
        ...clip,
        keyframes,
      });
    }),
  }));

  return { timeline: next, clipId, keyframeId: keyframe.id };
}

function collectClipIds(timeline) {
  const ids = new Set();
  const walk = (tracks) => {
    for (const track of tracks) {
      for (const clip of track.clips ?? []) {
        ids.add(clip.id);
      }
      if (track.children?.length) walk(track.children);
    }
  };
  walk(timeline.tracks ?? []);
  return ids;
}

module.exports = {
  createTrack,
  createClip,
  updateClip,
  deleteClip,
  addKeyframe,
  setAnimation,
  queryElement,
  findTrackById,
  findClipLocation,
  collectClipIds,
  needsUserOverwriteConfirm,
  markClipAiModified,
};
