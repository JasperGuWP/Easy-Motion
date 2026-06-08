const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const timelineService = require("../src/main/services/timeline-service");
const {
  AgentTimelineSession,
  executeTool,
  tryFastPathTitle,
} = require("../src/main/services/agent-tool-executor");
const { shouldUseAgent } = require("../src/main/services/agent-service");

const parentPath = path.join(os.tmpdir(), `easymotion-agent-${Date.now()}`);
const SUBPROJECT = "subprojects/default";

async function run() {
  fs.mkdirSync(parentPath, { recursive: true });
  const created = await createProject({ name: "Agent 工具测试", parentPath });
  const projectPath = created.path;

  if (!shouldUseAgent("创建一个标题写着 Hello")) {
    throw new Error("shouldUseAgent failed");
  }

  const session = new AgentTimelineSession(projectPath, SUBPROJECT);
  const fast = tryFastPathTitle(session, "创建一个标题写着 Hello");
  if (!fast?.success) {
    throw new Error(`fast path failed: ${fast?.error}`);
  }

  const commit = await session.commit();
  if (!commit.committed) {
    throw new Error("timeline not committed");
  }

  const timeline = timelineService.loadTimeline(projectPath, SUBPROJECT);
  const textTrack = timeline.tracks.find((t) => t.type === "text");
  if (!textTrack) {
    throw new Error("text track missing");
  }
  const clip = textTrack.clips.find(
    (c) => c.source?.kind === "inline" && c.source.content === "Hello",
  );
  if (!clip) {
    throw new Error("Hello clip missing");
  }

  const session2 = new AgentTimelineSession(projectPath, SUBPROJECT);
  const trackRes = executeTool(session2, "createTrack", {
    name: "副标题",
    type: "text",
  });
  if (!trackRes.success) throw new Error("createTrack failed");

  const clipRes = executeTool(session2, "createClip", {
    trackId: trackRes.data.trackId,
    name: "副标题片段",
    source: { kind: "inline", content: "World" },
  });
  if (!clipRes.success) throw new Error("createClip failed");

  const queryRes = executeTool(session2, "queryElement", {
    query: "Hello",
    type: "clip",
  });
  if (!queryRes.success || !queryRes.data.bestMatch) {
    throw new Error("queryElement failed");
  }

  await session2.commit();

  fs.rmSync(parentPath, { recursive: true, force: true });
  console.log("[PASS] agent-tools");
}

run().catch((err) => {
  console.error("[FAIL] agent-tools", err);
  process.exit(1);
});
