const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { validateTimeline } = require("@easymotion/shared");
const { atomicWriteJson, ensureDir, readJsonFile } = require("./file-service");
const timelineService = require("./timeline-service");

const BUILTIN_PRESETS_DIR = path.join(
  __dirname,
  "../../../../../packages/shared/fixtures/presets",
);

const CATEGORY_LABELS = {
  title: "标题动画",
  transition: "转场",
  chart: "数据图表",
  social: "社交媒体",
  custom: "自定义",
};

function getUserPresetsDir(projectRoot) {
  return path.join(projectRoot, "presets");
}

function readPresetFile(filePath) {
  const data = readJsonFile(filePath);
  return {
    ...data,
    filePath,
  };
}

function listBuiltinPresets() {
  if (!fs.existsSync(BUILTIN_PRESETS_DIR)) return [];
  return fs
    .readdirSync(BUILTIN_PRESETS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readPresetFile(path.join(BUILTIN_PRESETS_DIR, f)));
}

function listUserPresets(projectRoot) {
  const dir = getUserPresetsDir(projectRoot);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => readPresetFile(path.join(dir, f)));
}

function listPresets(projectRoot) {
  return [...listBuiltinPresets(), ...listUserPresets(projectRoot)].map(
    (preset) => ({
      id: preset.id,
      name: preset.name,
      category: preset.category ?? "custom",
      categoryLabel: CATEGORY_LABELS[preset.category] ?? preset.category,
      description: preset.description ?? "",
      source: preset.source ?? (preset.filePath?.includes("fixtures") ? "builtin" : "user"),
    }),
  );
}

function findPreset(projectRoot, presetId) {
  for (const preset of [...listBuiltinPresets(), ...listUserPresets(projectRoot)]) {
    if (preset.id === presetId) return preset;
  }
  return null;
}

function newId(prefix) {
  return `${prefix}-${crypto.randomUUID()}`;
}

function cloneTrackTree(track) {
  return {
    ...track,
    id: newId("track"),
    clips: (track.clips ?? []).map((clip) => ({
      ...clip,
      id: newId("clip"),
      lastModifiedBy: "user",
    })),
    children: track.children?.map(cloneTrackTree),
  };
}

function clipEndFrame(clip) {
  return clip.startInFrames + clip.durationInFrames;
}

function trackMaxEnd(track) {
  let max = 0;
  for (const clip of track.clips ?? []) {
    max = Math.max(max, clipEndFrame(clip));
  }
  for (const child of track.children ?? []) {
    max = Math.max(max, trackMaxEnd(child));
  }
  return max;
}

function applyPresetToTimeline(timeline, preset) {
  const presetTracks = preset.timeline?.tracks ?? preset.tracks ?? [];
  if (presetTracks.length === 0) {
    throw new Error("预设不含轨道数据");
  }

  let nextOrder =
    timeline.tracks.reduce((max, track) => Math.max(max, track.order ?? 0), -1) + 1;

  const clonedTracks = presetTracks.map((track) => {
    const cloned = cloneTrackTree(track);
    cloned.order = nextOrder;
    nextOrder += 1;
    return cloned;
  });

  let durationNeeded = timeline.durationInFrames;
  for (const track of clonedTracks) {
    durationNeeded = Math.max(durationNeeded, trackMaxEnd(track));
  }

  const next = {
    ...timeline,
    durationInFrames: Math.max(timeline.durationInFrames, durationNeeded),
    tracks: [...timeline.tracks, ...clonedTracks],
  };

  validateTimeline(next);
  return next;
}

async function applyPreset(
  projectRoot,
  presetId,
  subprojectRelativePath = "subprojects/default",
) {
  const preset = findPreset(projectRoot, presetId);
  if (!preset) {
    throw new Error("预设不存在");
  }

  const timeline = timelineService.loadTimeline(projectRoot, subprojectRelativePath);
  const next = applyPresetToTimeline(timeline, preset);
  await timelineService.saveTimeline(projectRoot, next, subprojectRelativePath);
  const gen = await timelineService.generateForSubproject(
    projectRoot,
    subprojectRelativePath,
  );
  return { timeline: next, generate: gen, presetId: preset.id, presetName: preset.name };
}

async function saveCurrentAsPreset(
  projectRoot,
  payload = {},
  subprojectRelativePath = "subprojects/default",
) {
  const name = String(payload.name ?? "").trim();
  if (!name) {
    throw new Error("请填写预设名称");
  }

  const timeline = timelineService.loadTimeline(projectRoot, subprojectRelativePath);
  const id = `user-${crypto.randomUUID()}`;
  const preset = {
    id,
    name,
    category: payload.category ?? "custom",
    description: payload.description ?? "",
    source: "user",
    createdAt: Date.now(),
    timeline: {
      tracks: timeline.tracks,
    },
  };

  const dir = getUserPresetsDir(projectRoot);
  ensureDir(dir);
  await atomicWriteJson(path.join(dir, `${id}.json`), preset);
  return preset;
}

module.exports = {
  CATEGORY_LABELS,
  listPresets,
  findPreset,
  applyPresetToTimeline,
  applyPreset,
  saveCurrentAsPreset,
};
