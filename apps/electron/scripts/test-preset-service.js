const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { createProject } = require("../src/main/services/project-service");
const presetService = require("../src/main/services/preset-service");
const timelineService = require("../src/main/services/timeline-service");
const { removeDirRecursive } = require("../src/main/services/file-service");

const SUBPROJECT = "subprojects/default";

async function run() {
  const parentPath = path.join(os.tmpdir(), `easymotion-preset-${Date.now()}`);
  fs.mkdirSync(parentPath, { recursive: true });
  const created = await createProject({ name: "预设测试", parentPath });
  const projectPath = created.path;

  const presets = presetService.listPresets(projectPath);
  if (presets.length < 2) {
    throw new Error(`expected builtin presets, got ${presets.length}`);
  }

  const fade = presets.find((p) => p.id === "preset-title-fade-in");
  if (!fade) throw new Error("title-fade-in preset missing");

  const before = timelineService.loadTimeline(projectPath, SUBPROJECT);
  const trackCountBefore = before.tracks.length;

  await presetService.applyPreset(projectPath, "preset-title-fade-in", SUBPROJECT);

  const after = timelineService.loadTimeline(projectPath, SUBPROJECT);
  if (after.tracks.length <= trackCountBefore) {
    throw new Error("apply preset should add tracks");
  }

  const saved = await presetService.saveCurrentAsPreset(
    projectPath,
    { name: "我的预设", description: "测试" },
    SUBPROJECT,
  );
  if (!saved.id.startsWith("user-")) {
    throw new Error("user preset id invalid");
  }

  const all = presetService.listPresets(projectPath);
  if (!all.some((p) => p.id === saved.id)) {
    throw new Error("saved preset not listed");
  }

  removeDirRecursive(parentPath);
  console.log("[PASS] preset-service");
}

run().catch((err) => {
  console.error("[FAIL] preset-service", err);
  process.exit(1);
});
