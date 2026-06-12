const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const { listAssets } = require("../src/main/services/asset-service");
const {
  AgentTimelineSession,
  executeTool,
} = require("../src/main/services/agent-tool-executor");
const { AGENT_TOOL_NAMES } = require("@easymotion/shared");
const { removeDirRecursive } = require("../src/main/services/file-service");

const SUBPROJECT = "subprojects/default";

async function run() {
  if (!AGENT_TOOL_NAMES.includes("importAsset")) {
    throw new Error("importAsset missing from AGENT_TOOL_NAMES");
  }

  const tmpRoot = path.join(os.tmpdir(), `easymotion-import-${Date.now()}`);
  const parentPath = path.join(tmpRoot, "parent");
  const samplePng = path.join(tmpRoot, "logo.png");

  fs.mkdirSync(parentPath, { recursive: true });
  require("./test-fixtures/media-bytes").writeMinimalPng(samplePng);

  const created = await createProject({ name: "importAsset 测试", parentPath });
  const projectPath = created.path;

  const session = new AgentTimelineSession(projectPath, SUBPROJECT);
  const result = await executeTool(session, "importAsset", {
    filePath: samplePng,
  });
  if (!result.success) {
    throw new Error(`importAsset failed: ${result.error}`);
  }
  if (!result.data?.assetId || !result.data?.publicPath?.startsWith("/assets/image/")) {
    throw new Error("importAsset return shape invalid");
  }

  const assets = listAssets(projectPath);
  if (assets.length !== 1 || assets[0].id !== result.data.assetId) {
    throw new Error("asset not persisted in manifest");
  }

  removeDirRecursive(tmpRoot);
  console.log("[PASS] agent-import-asset");
}

run().catch((err) => {
  console.error("[FAIL] agent-import-asset", err);
  process.exit(1);
});
