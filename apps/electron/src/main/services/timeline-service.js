const fs = require("node:fs");
const path = require("node:path");
const { readJsonFile, atomicWriteJson } = require("./file-service");
const { validateTimeline } = require("@easymotion/shared");
const { generateRemotionCode } = require("../generator");

function getSubprojectDir(projectRoot, subprojectRelativePath = "subprojects/default") {
  return path.join(projectRoot, subprojectRelativePath);
}

function getSubprojectJsonPath(projectRoot, subprojectRelativePath) {
  return path.join(
    getSubprojectDir(projectRoot, subprojectRelativePath),
    "subproject.json"
  );
}

function getRemotionSrcDir(projectRoot, subprojectRelativePath) {
  return path.join(
    getSubprojectDir(projectRoot, subprojectRelativePath),
    "remotion",
    "src"
  );
}

function loadTimeline(projectRoot, subprojectRelativePath = "subprojects/default") {
  const subprojectPath = getSubprojectJsonPath(projectRoot, subprojectRelativePath);
  const subproject = readJsonFile(subprojectPath);
  validateTimeline(subproject.timeline);
  return subproject.timeline;
}

async function saveTimeline(
  projectRoot,
  timeline,
  subprojectRelativePath = "subprojects/default"
) {
  validateTimeline(timeline);
  const subprojectPath = getSubprojectJsonPath(projectRoot, subprojectRelativePath);
  const subproject = readJsonFile(subprojectPath);
  subproject.timeline = timeline;
  await atomicWriteJson(subprojectPath, subproject);
  return timeline;
}

function applySampleTimeline(
  projectRoot,
  subprojectRelativePath = "subprojects/default"
) {
  const samplePath = path.join(
    __dirname,
    "../../../../../packages/shared/fixtures/sample-timeline.json"
  );
  const timeline = readJsonFile(samplePath);
  const subprojectPath = getSubprojectJsonPath(projectRoot, subprojectRelativePath);
  const subproject = readJsonFile(subprojectPath);
  subproject.timeline = timeline;
  fs.writeFileSync(subprojectPath, `${JSON.stringify(subproject, null, 2)}\n`, "utf8");
  return timeline;
}

function generateForSubproject(
  projectRoot,
  subprojectRelativePath = "subprojects/default"
) {
  const timeline = loadTimeline(projectRoot, subprojectRelativePath);
  const remotionSrcDir = getRemotionSrcDir(projectRoot, subprojectRelativePath);
  if (!fs.existsSync(remotionSrcDir)) {
    throw new Error("E2201: remotion/src directory not found");
  }
  return generateRemotionCode({ remotionSrcDir, timeline });
}

module.exports = {
  loadTimeline,
  saveTimeline,
  applySampleTimeline,
  generateForSubproject,
  getRemotionSrcDir,
};
