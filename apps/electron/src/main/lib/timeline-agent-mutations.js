const crypto = require("node:crypto");
const { validateTimeline } = require("@easymotion/shared");

const TRACK_TYPE_LABELS = {
  text: "文字",
  image: "图片",
  video: "视频",
  audio: "音频",
  shape: "形状",
  chart: "图表",
  animation: "动画",
  group: "分组",
};

function newId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function defaultTrackName(type) {
  return `新${TRACK_TYPE_LABELS[type] || type}轨道`;
}

function withValidated(timeline) {
  validateTimeline(timeline);
  return timeline;
}

function getClipRange(clip) {
  return {
    start: clip.startInFrames,
    end: clip.startInFrames + clip.durationInFrames,
  };
}

function rangesOverlap(a, b) {
  return a.start < b.end && b.start < a.end;
}

function hasOverlapOnTrack(track, candidate, excludeClipId) {
  for (const clip of track.clips) {
    if (excludeClipId && clip.id === excludeClipId) continue;
    if (rangesOverlap(candidate, getClipRange(clip))) return true;
  }
  return false;
}

function clampClipStart(startInFrames, durationInFrames, total) {
  const maxStart = Math.max(0, total - durationInFrames);
  return Math.min(maxStart, Math.max(0, startInFrames));
}

function clampClipDuration(durationInFrames, startInFrames, total) {
  const maxDuration = total - startInFrames;
  return Math.min(maxDuration, Math.max(1, durationInFrames));
}

function mapTrackById(tracks, trackId, updater) {
  let changed = false;
  const next = tracks.map((track) => {
    if (track.id === trackId) {
      changed = true;
      return updater(track);
    }
    if (track.children?.length) {
      let childChanged = false;
      const children = track.children.map((child) => {
        if (child.id !== trackId) return child;
        childChanged = true;
        return updater(child);
      });
      if (childChanged) {
        changed = true;
        return { ...track, children };
      }
    }
    return track;
  });
  return { tracks: next, changed };
}

function findTrackById(timeline, trackId) {
  for (const track of timeline.tracks) {
    if (track.id === trackId) return track;
    if (track.children) {
      const child = track.children.find((c) => c.id === trackId);
      if (child) return child;
    }
  }
  return null;
}

function findLayerTrackForClip(timeline, clipId) {
  for (const layerTrack of timeline.tracks) {
    const direct = layerTrack.clips.find((c) => c.id === clipId);
    if (direct) {
      return { layerTrack, clipTrack: layerTrack, clip: direct };
    }
    if (layerTrack.children) {
      for (const child of layerTrack.children) {
        const nested = child.clips.find((c) => c.id === clipId);
        if (nested) {
          return { layerTrack, clipTrack: child, clip: nested };
        }
      }
    }
  }
  return null;
}

function findParentGroup(timeline, trackId) {
  for (const track of timeline.tracks) {
    if (track.type !== "group" || !track.children) continue;
    if (track.children.some((c) => c.id === trackId)) return track;
  }
  return null;
}

function createDefaultTextClip(timeline, content = "文字") {
  const cx = Math.round(timeline.width / 2);
  const cy = Math.round(timeline.height / 2);
  const duration = Math.min(60, timeline.durationInFrames);
  return {
    id: newId("clip"),
    type: "text",
    name: "文字",
    startInFrames: 0,
    durationInFrames: Math.max(1, duration),
    source: { kind: "inline", content },
    transform: {
      position: { x: cx, y: cy },
      scale: 1,
      rotation: 0,
      opacity: 1,
    },
    style: {
      fontFamily: "Inter, sans-serif",
      fontSize: 48,
      color: "#f8fafc",
      textAlign: "center",
    },
    keyframes: [],
    lastModifiedBy: "ai",
  };
}

function addTrack(timeline, type, name, options = {}) {
  const emptyClips = options.emptyClips !== false;
  const maxOrder = timeline.tracks.reduce((max, t) => Math.max(max, t.order), -1);
  const track = {
    id: newId("track"),
    name: name?.trim() || defaultTrackName(type),
    type,
    order: maxOrder + 1,
    visible: true,
    locked: false,
    muted: false,
    solo: false,
    clips:
      !emptyClips && type === "text"
        ? [createDefaultTextClip(timeline)]
        : [],
    ...(type === "group" ? { children: [], collapsed: false } : {}),
  };
  const nextTimeline = withValidated({
    ...timeline,
    tracks: [...timeline.tracks, track],
  });
  return { timeline: nextTimeline, trackId: track.id, track };
}

function addClip(timeline, trackId, clip) {
  const { tracks, changed } = mapTrackById(timeline.tracks, trackId, (track) => {
    if (track.locked) throw new Error("轨道已锁定");
    const start = clampClipStart(
      clip.startInFrames ?? 0,
      clip.durationInFrames ?? 30,
      timeline.durationInFrames,
    );
    const normalized = {
      ...clip,
      id: clip.id || newId("clip"),
      startInFrames: start,
      durationInFrames: clampClipDuration(
        clip.durationInFrames ?? 30,
        start,
        timeline.durationInFrames,
      ),
      lastModifiedBy: clip.lastModifiedBy || "ai",
    };
    if (hasOverlapOnTrack(track, getClipRange(normalized))) {
      throw new Error("与同轨道其它片段重叠");
    }
    return { ...track, clips: [...track.clips, normalized] };
  });
  if (!changed) throw new Error("轨道不存在");
  return withValidated({ ...timeline, tracks });
}

function mergeClip(base, patch) {
  const next = { ...base, lastModifiedBy: "ai" };
  if (patch.name !== undefined) next.name = String(patch.name).trim();
  if (patch.startInFrames !== undefined) next.startInFrames = patch.startInFrames;
  if (patch.durationInFrames !== undefined) {
    next.durationInFrames = patch.durationInFrames;
  }
  if (patch.source) {
    next.source = { ...(base.source ?? {}), ...patch.source };
  }
  if (patch.style) {
    next.style = { ...(base.style ?? {}), ...patch.style };
  }
  if (patch.transform) {
    const baseTransform = base.transform ?? {};
    next.transform = {
      ...baseTransform,
      ...patch.transform,
      position: {
        ...(baseTransform.position ?? {}),
        ...(patch.transform.position ?? {}),
      },
    };
  }
  return next;
}

function buildPatchFromPathUpdates(updates) {
  const patch = {};
  for (const [path, value] of Object.entries(updates ?? {})) {
    if (path === "source.content") {
      patch.source = { kind: "inline", content: String(value) };
    } else if (path === "name") {
      patch.name = String(value);
    } else if (path.startsWith("style.")) {
      const key = path.slice("style.".length);
      patch.style = { ...(patch.style ?? {}), [key]: value };
    } else if (path === "transform.position.x") {
      patch.transform = {
        ...(patch.transform ?? {}),
        position: { ...(patch.transform?.position ?? {}), x: Number(value) },
      };
    } else if (path === "transform.position.y") {
      patch.transform = {
        ...(patch.transform ?? {}),
        position: { ...(patch.transform?.position ?? {}), y: Number(value) },
      };
    } else if (path === "style.fontSize" && typeof value === "string" && value.endsWith("%")) {
      // 相对调整在 executor 层处理
      patch.style = { ...(patch.style ?? {}), fontSize: value };
    } else if (path === "style.fontSize") {
      patch.style = { ...(patch.style ?? {}), fontSize: Number(value) };
    }
  }
  return patch;
}

function replaceClipOnTrack(track, clipTrackId, clipId, nextClip) {
  if (track.id === clipTrackId) {
    return {
      ...track,
      clips: track.clips.map((c) => (c.id === clipId ? nextClip : c)),
    };
  }
  if (track.children?.length) {
    return {
      ...track,
      children: track.children.map((child) =>
        replaceClipOnTrack(child, clipTrackId, clipId, nextClip),
      ),
    };
  }
  return track;
}

function updateClip(timeline, clipId, patch) {
  const located = findLayerTrackForClip(timeline, clipId);
  if (!located) throw new Error("片段不存在");
  const parentGroup = findParentGroup(timeline, located.clipTrack.id);
  if (
    located.layerTrack.locked ||
    located.clipTrack.locked ||
    parentGroup?.locked
  ) {
    throw new Error("轨道已锁定");
  }

  let nextClip = mergeClip(located.clip, patch);
  const start = clampClipStart(
    nextClip.startInFrames,
    nextClip.durationInFrames,
    timeline.durationInFrames,
  );
  const duration = clampClipDuration(
    nextClip.durationInFrames,
    start,
    timeline.durationInFrames,
  );
  nextClip = { ...nextClip, startInFrames: start, durationInFrames: duration };

  if (hasOverlapOnTrack(located.clipTrack, getClipRange(nextClip), clipId)) {
    throw new Error("与同轨道其它片段重叠");
  }

  const tracks = timeline.tracks.map((track) =>
    replaceClipOnTrack(track, located.clipTrack.id, clipId, nextClip),
  );
  return withValidated({ ...timeline, tracks });
}

function removeClip(timeline, trackId, clipId) {
  const { tracks, changed } = mapTrackById(timeline.tracks, trackId, (track) => {
    if (track.locked) throw new Error("轨道已锁定");
    return { ...track, clips: track.clips.filter((c) => c.id !== clipId) };
  });
  if (!changed) throw new Error("轨道不存在");
  return withValidated({ ...timeline, tracks });
}

function queryElement(timeline, query, type = "any") {
  const q = String(query ?? "").trim().toLowerCase();
  if (!q) return { matches: [], bestMatch: null };

  const matches = [];

  const considerTrack = (track, parentName) => {
    if (type === "clip") return;
    const name = (track.name || "").toLowerCase();
    if (name.includes(q)) {
      matches.push({
        type: "track",
        id: track.id,
        name: track.name,
        trackType: track.type,
        parentName,
        confidence: name === q ? 1 : 0.8,
      });
    }
  };

  const considerClip = (track, clip) => {
    if (type === "track") return;
    const name = (clip.name || "").toLowerCase();
    const content =
      clip.source?.kind === "inline" && typeof clip.source.content === "string"
        ? clip.source.content.toLowerCase()
        : "";
    if (name.includes(q) || content.includes(q)) {
      matches.push({
        type: "clip",
        id: clip.id,
        trackId: track.id,
        name: clip.name,
        clipType: clip.type,
        content: clip.source?.content,
        confidence: content === q || name === q ? 1 : 0.85,
      });
    }
  };

  for (const track of timeline.tracks) {
    considerTrack(track, null);
    for (const clip of track.clips) considerClip(track, clip);
    if (track.children) {
      for (const child of track.children) {
        considerTrack(child, track.name);
        for (const clip of child.clips) considerClip(child, clip);
      }
    }
  }

  matches.sort((a, b) => b.confidence - a.confidence);
  return { matches, bestMatch: matches[0] ?? null };
}

function collectTextClips(timeline) {
  const clips = [];
  const walk = (track) => {
    for (const clip of track.clips) {
      if (clip.type === "text") {
        clips.push({ track, clip });
      }
    }
    if (track.children) {
      for (const child of track.children) walk(child);
    }
  };
  for (const track of timeline.tracks) walk(track);
  return clips;
}

function summarizeTimeline(timeline) {
  const tracks = [];
  for (const track of timeline.tracks) {
    tracks.push({
      id: track.id,
      name: track.name,
      type: track.type,
      clipCount: track.clips.length,
      clips: track.clips.map((c) => ({
        id: c.id,
        name: c.name,
        type: c.type,
        content:
          c.source?.kind === "inline" ? c.source.content : undefined,
      })),
    });
    if (track.children) {
      for (const child of track.children) {
        tracks.push({
          id: child.id,
          name: child.name,
          type: child.type,
          parentGroup: track.name,
          clipCount: child.clips.length,
          clips: child.clips.map((c) => ({
            id: c.id,
            name: c.name,
            type: c.type,
            content:
              c.source?.kind === "inline" ? c.source.content : undefined,
          })),
        });
      }
    }
  }
  return {
    fps: timeline.fps,
    durationInFrames: timeline.durationInFrames,
    width: timeline.width,
    height: timeline.height,
    tracks,
  };
}

module.exports = {
  addTrack,
  addClip,
  updateClip,
  removeClip,
  queryElement,
  createDefaultTextClip,
  buildPatchFromPathUpdates,
  summarizeTimeline,
  collectTextClips,
  findTrackById,
  findLayerTrackForClip,
  newId,
};
