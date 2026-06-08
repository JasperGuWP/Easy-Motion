const timelineService = require("./timeline-service");
const mutations = require("../lib/timeline-agent-mutations");
const {
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
} = mutations;

const FONT_SCALE_UP = 1.2;
const FONT_SCALE_DOWN = 0.8;

class AgentTimelineSession {
  constructor(projectRoot, subprojectPath = "subprojects/default") {
    this.projectRoot = projectRoot;
    this.subprojectPath = subprojectPath;
    this.timeline = timelineService.loadTimeline(projectRoot, subprojectPath);
    this.changed = false;
  }

  getSummary() {
    return summarizeTimeline(this.timeline);
  }

  async commit() {
    if (!this.changed) {
      return { committed: false, timeline: this.timeline };
    }
    await timelineService.saveTimeline(
      this.projectRoot,
      this.timeline,
      this.subprojectPath,
    );
    const gen = timelineService.generateForSubproject(
      this.projectRoot,
      this.subprojectPath,
    );
    return { committed: true, timeline: this.timeline, generate: gen };
  }
}

function buildUpdatePatch(timeline, clipId, updates) {
  const fontVal = updates?.["style.fontSize"];
  if (typeof fontVal === "string" && fontVal.endsWith("%")) {
    const located = findLayerTrackForClip(timeline, clipId);
    const currentSize = Number(located?.clip?.style?.fontSize ?? 48);
    const ratio = Number(fontVal.replace("%", "")) / 100;
    const patch = buildPatchFromPathUpdates(updates);
    patch.style = {
      ...(patch.style ?? {}),
      fontSize: Math.round(currentSize * ratio),
    };
    return patch;
  }
  return buildPatchFromPathUpdates(updates);
}

function executeTool(session, toolName, params) {
  const timeline = session.timeline;

  switch (toolName) {
    case "createTrack": {
      const { timeline: next, trackId, track } = addTrack(
        timeline,
        params.type,
        params.name,
        { emptyClips: true },
      );
      session.timeline = next;
      session.changed = true;
      return {
        success: true,
        data: { trackId, name: track.name, type: track.type },
      };
    }

    case "createClip": {
      const track = findTrackById(timeline, params.trackId);
      if (!track) {
        return { success: false, error: "轨道不存在" };
      }
      const duration = params.durationInFrames ?? Math.min(60, timeline.durationInFrames);
      let clip;
      if (track.type === "text") {
        clip = createDefaultTextClip(
          timeline,
          params.source?.content ?? params.name ?? "文字",
        );
        clip.name = params.name || clip.name;
        if (params.style) clip.style = { ...clip.style, ...params.style };
      } else {
        clip = {
          id: newId("clip"),
          type: track.type,
          name: params.name,
          startInFrames: params.startInFrames ?? 0,
          durationInFrames: duration,
          source: params.source ?? { kind: "inline" },
          transform: params.transform,
          style: params.style,
          lastModifiedBy: "ai",
        };
      }
      if (params.startInFrames !== undefined) {
        clip.startInFrames = params.startInFrames;
      }
      clip.durationInFrames = duration;
      session.timeline = addClip(timeline, params.trackId, clip);
      session.changed = true;
      return {
        success: true,
        data: {
          clipId: clip.id,
          trackId: params.trackId,
          name: clip.name,
          content: clip.source?.content,
        },
      };
    }

    case "updateClip": {
      const patch = buildUpdatePatch(timeline, params.clipId, params.updates);
      session.timeline = updateClip(timeline, params.clipId, patch);
      session.changed = true;
      return { success: true, data: { clipId: params.clipId } };
    }

    case "deleteClip": {
      session.timeline = removeClip(timeline, params.trackId, params.clipId);
      session.changed = true;
      return { success: true, data: { clipId: params.clipId } };
    }

    case "queryElement": {
      const result = queryElement(timeline, params.query, params.type ?? "any");
      return { success: true, data: result };
    }

    default:
      return { success: false, error: `E4006: unknown tool ${toolName}` };
  }
}

/**
 * 无 LLM 的快速路径：创建标题文字
 */
function tryFastPathTitle(session, userText) {
  const text = String(userText ?? "").trim();
  const patterns = [
    /创建(?:一个)?标题(?:写着|为|：|:)\s*[「"']?([^」"'\n]+)[」"']?/i,
    /标题(?:写着|为|：|:)\s*[「"']?([^」"'\n]+)[」"']?/i,
    /做一个.*标题.*[「"']?([^」"'\n]+)[」"']?/i,
  ];

  let title = null;
  for (const re of patterns) {
    const m = text.match(re);
    if (m?.[1]) {
      title = m[1].trim();
      break;
    }
  }
  if (!title) return null;

  const trackResult = executeTool(session, "createTrack", {
    name: "标题文字",
    type: "text",
  });
  if (!trackResult.success) return trackResult;

  const clipResult = executeTool(session, "createClip", {
    trackId: trackResult.data.trackId,
    name: "标题",
    source: { kind: "inline", content: title },
    style: { fontSize: 64, textAlign: "center" },
  });
  if (!clipResult.success) return clipResult;

  return {
    success: true,
    fastPath: true,
    kind: "createTitle",
    title,
    trackId: trackResult.data.trackId,
    clipId: clipResult.data.clipId,
  };
}

function pickLargestFontClip(items) {
  return items.reduce((best, item) => {
    const bestSize = Number(best.clip.style?.fontSize ?? 0);
    const itemSize = Number(item.clip.style?.fontSize ?? 0);
    return itemSize >= bestSize ? item : best;
  }).clip;
}

function resolveTargetTextClip(timeline, userText) {
  const textClips = collectTextClips(timeline);
  if (textClips.length === 0) return null;
  if (textClips.length === 1) return textClips[0].clip;

  const text = String(userText ?? "");
  for (const { clip } of textClips) {
    const name = clip.name || "";
    const content = clip.source?.content || "";
    if (
      (name && text.includes(name)) ||
      (content && content.length > 1 && text.includes(content))
    ) {
      return clip;
    }
  }

  // 优先调整 Agent 刚创建/修改的片段，避免误改模板自带文字
  const aiClips = textClips.filter(({ clip }) => clip.lastModifiedBy === "ai");
  if (aiClips.length === 1) return aiClips[0].clip;
  if (aiClips.length > 1) return pickLargestFontClip(aiClips);

  return pickLargestFontClip(textClips);
}

/**
 * 无 LLM 快速路径：字体大一点 / 小一点
 */
function tryFastPathFontSize(session, userText) {
  const text = String(userText ?? "").trim();
  const bigger =
    /字体?\s*(大|放大|增大)\s*一点|字\s*大\s*一点|放大字体|字号\s*(大|放大|增大)/i.test(text);
  const smaller =
    /字体?\s*(小|缩小|减小)\s*一点|字\s*小\s*一点|缩小字体|字号\s*(小|缩小|减小)/i.test(text);
  if (!bigger && !smaller) return null;

  const clip = resolveTargetTextClip(session.timeline, userText);
  if (!clip) {
    return { success: false, error: "时间线上没有可调整的文字片段" };
  }

  const currentSize = Number(clip.style?.fontSize ?? 48);
  const ratio = bigger ? FONT_SCALE_UP : FONT_SCALE_DOWN;
  const nextSize = Math.max(12, Math.min(240, Math.round(currentSize * ratio)));

  const result = executeTool(session, "updateClip", {
    clipId: clip.id,
    updates: { "style.fontSize": nextSize },
  });
  if (!result.success) return result;

  return {
    success: true,
    fastPath: true,
    kind: "fontSize",
    clipId: clip.id,
    previousSize: currentSize,
    nextSize,
    direction: bigger ? "up" : "down",
  };
}

/**
 * 依次尝试所有无 LLM 快速路径
 */
function tryFastPath(session, userText) {
  const title = tryFastPathTitle(session, userText);
  if (title) return title;
  return tryFastPathFontSize(session, userText);
}

module.exports = {
  AgentTimelineSession,
  executeTool,
  tryFastPathTitle,
  tryFastPathFontSize,
  tryFastPath,
  FONT_SCALE_UP,
  FONT_SCALE_DOWN,
};
