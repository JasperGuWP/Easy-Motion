const { runSimplifiedAgent } = require("../src/main/services/agent-service");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const {
  AgentTimelineSession,
  tryFastPathTitle,
} = require("../src/main/services/agent-tool-executor");

const parentPath = path.join(os.tmpdir(), `easymotion-agent-simple-${Date.now()}`);
const SUBPROJECT = "subprojects/default";

async function run() {
  fs.mkdirSync(parentPath, { recursive: true });
  const created = await createProject({ name: "简化模式测试", parentPath });
  const projectPath = created.path;

  const session = new AgentTimelineSession(projectPath, SUBPROJECT);
  const seeded = tryFastPathTitle(session, "创建一个标题写着 Hello");
  if (!seeded?.success) throw new Error("seed title failed");
  await session.commit();

  const session2 = new AgentTimelineSession(projectPath, SUBPROJECT);
  const deltas = [];
  const result = await runSimplifiedAgent(
    session2,
    "把量子力学讲清楚",
    (c) => deltas.push(c),
  );

  if (!result.simplifiedMode) throw new Error("expected simplifiedMode");
  if (result.timelineUpdated) throw new Error("should not update timeline");
  if (!result.replyText.includes("E4009")) throw new Error("missing E4009");

  const session3 = new AgentTimelineSession(projectPath, SUBPROJECT);
  const result2 = await runSimplifiedAgent(session3, "字体大一点", (c) => deltas.push(c));
  if (!result2.simplifiedMode || !result2.timelineUpdated) {
    throw new Error("fontSize simplified path failed");
  }

  fs.rmSync(parentPath, { recursive: true, force: true });
  console.log("[PASS] agent-simplified");
}

run().catch((err) => {
  console.error("[FAIL] agent-simplified", err);
  process.exit(1);
});
