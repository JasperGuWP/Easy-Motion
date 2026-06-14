const NESTED_OBJECT_KEYS = ["style", "transform", "source"];

function getNestedValue(obj, path) {
  const parts = path.split(".");
  let cursor = obj;
  for (const part of parts) {
    if (cursor == null || typeof cursor !== "object") return undefined;
    cursor = cursor[part];
  }
  return cursor;
}

function hasUpdatePath(updates, path) {
  if (updates[path] !== undefined) return true;
  const [root, leaf] = path.split(".");
  if (!leaf) return false;
  const nested = updates[root];
  return nested && typeof nested === "object" && nested[leaf] !== undefined;
}

/** 将 LLM 常见误写（根级 fontSize、嵌套 style 对象）统一为点路径更新 */
function normalizeClipUpdates(updates = {}) {
  const normalized = { ...updates };

  if (normalized.fontSize !== undefined && !hasUpdatePath(normalized, "style.fontSize")) {
    normalized["style.fontSize"] = normalized.fontSize;
    delete normalized.fontSize;
  }

  if (normalized.color !== undefined && !hasUpdatePath(normalized, "style.color")) {
    normalized["style.color"] = normalized.color;
    delete normalized.color;
  }

  if (
    normalized.backgroundColor !== undefined &&
    !hasUpdatePath(normalized, "style.backgroundColor") &&
    !hasUpdatePath(normalized, "style.fillColor") &&
    !hasUpdatePath(normalized, "style.background")
  ) {
    normalized["style.backgroundColor"] = normalized.backgroundColor;
    delete normalized.backgroundColor;
  }

  if (
    normalized.background !== undefined &&
    !hasUpdatePath(normalized, "style.background")
  ) {
    normalized["style.background"] = normalized.background;
    delete normalized.background;
  }

  for (const key of NESTED_OBJECT_KEYS) {
    const value = normalized[key];
    if (!value || typeof value !== "object" || Array.isArray(value)) continue;
    for (const [subKey, subValue] of Object.entries(value)) {
      const dotPath = `${key}.${subKey}`;
      if (normalized[dotPath] === undefined) {
        normalized[dotPath] = subValue;
      }
    }
    delete normalized[key];
  }

  return normalized;
}

/**
 * 根据用户自然语言对选中片段做相对调整（±20% 等），避免 LLM 用错基准值。
 */
function resolveRelativeClipUpdates(clip, userInput, updates = {}) {
  const normalized = normalizeClipUpdates(updates);
  const text = String(userInput ?? "");

  const wantsBigger = /大(一点|些|点)|变大|增大|放大/.test(text);
  const wantsSmaller = /小(一点|些|点)|变小|减小|缩小/.test(text);
  if (!wantsBigger && !wantsSmaller) return normalized;

  const result = { ...normalized };
  const fontContext = /字|字体|字号|font/i.test(text) || clip?.type === "text";
  const speedContext = /快|慢|速度|时长|动画/.test(text);

  if (fontContext) {
    const current = Number(getNestedValue(clip, "style.fontSize")) || 72;
    const factor = wantsBigger ? 1.2 : 0.8;
    result["style.fontSize"] = Math.max(1, Math.round(current * factor));
    return result;
  }

  if (speedContext && !hasUpdatePath(result, "durationInFrames")) {
    const current = Number(clip?.durationInFrames) || 30;
    if (/快/.test(text)) {
      result.durationInFrames = Math.max(1, Math.round(current / 2));
    } else if (/慢/.test(text)) {
      result.durationInFrames = Math.round(current * 2);
    }
    return result;
  }

  if (/左|右|上|下/.test(text)) {
    const x = Number(getNestedValue(clip, "transform.position.x")) || 0;
    const y = Number(getNestedValue(clip, "transform.position.y")) || 0;
    const offset = Math.round((clip?.timelineWidth ?? 1920) * 0.1) || 100;
    if (/左/.test(text)) result["transform.position.x"] = x - offset;
    if (/右/.test(text)) result["transform.position.x"] = x + offset;
    if (/上/.test(text)) result["transform.position.y"] = y - offset;
    if (/下/.test(text)) result["transform.position.y"] = y + offset;
    return result;
  }

  if (!hasUpdatePath(result, "transform.scale")) {
    const current = Number(getNestedValue(clip, "transform.scale")) || 1;
    const factor = wantsBigger ? 1.2 : 0.8;
    result["transform.scale"] = Math.round(current * factor * 100) / 100;
  }

  return result;
}

function prepareClipUpdates(clip, { userInput, updates, selectedClipId, clipId }) {
  let prepared = normalizeClipUpdates(updates);
  if (userInput && selectedClipId && clipId === selectedClipId) {
    prepared = resolveRelativeClipUpdates(clip, userInput, prepared);
  }
  return prepared;
}

module.exports = {
  normalizeClipUpdates,
  resolveRelativeClipUpdates,
  prepareClipUpdates,
  getNestedValue,
};
