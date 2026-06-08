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
  findTrackById,
  findLayerTrackForClip,
  newId,
} = mutations;

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
    title,
    trackId: trackResult.data.trackId,
    clipId: clipResult.data.clipId,
  };
}

module.exports = {
  AgentTimelineSession,
  executeTool,
  tryFastPathTitle,
};
