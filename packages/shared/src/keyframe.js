/** 关键帧插值 — 与 remotion/src/lib/keyframe.ts 逻辑保持一致 */

const DEFAULT_EASING = "linear";

function sortKeyframes(keyframes) {
  return [...keyframes].sort((a, b) => a.frame - b.frame);
}

function filterPropertyKeyframes(keyframes, property) {
  return sortKeyframes(
    (keyframes ?? []).filter((kf) => kf && kf.property === property),
  );
}

/** 片段内相对帧号（Sequence 内 useCurrentFrame） */
function clipLocalFrame(timelineFrame, clipStartInFrames) {
  return timelineFrame - clipStartInFrames;
}

function newKeyframeId() {
  return `kf-${crypto.randomUUID()}`;
}

function upsertKeyframe(keyframes, partial) {
  const list = [...(keyframes ?? [])];
  const index = list.findIndex(
    (kf) => kf.property === partial.property && kf.frame === partial.frame,
  );
  const next = {
    id: partial.id ?? (index >= 0 ? list[index].id : newKeyframeId()),
    property: partial.property,
    frame: partial.frame,
    value: partial.value,
    easing: partial.easing ?? DEFAULT_EASING,
    interpolation: partial.interpolation ?? "linear",
  };
  if (index >= 0) {
    list[index] = next;
  } else {
    list.push(next);
  }
  return list;
}

function removeKeyframe(keyframes, keyframeId) {
  return (keyframes ?? []).filter((kf) => kf.id !== keyframeId);
}

function removePropertyKeyframes(keyframes, property) {
  return (keyframes ?? []).filter((kf) => kf.property !== property);
}

/**
 * 在片段本地帧上插值属性值（无 Remotion 依赖，供测试与主进程使用）
 */
function interpolateKeyframesAtFrame(keyframes, property, localFrame, fallback) {
  const sorted = filterPropertyKeyframes(keyframes, property);
  if (sorted.length === 0) return fallback;

  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  if (localFrame <= first.frame) return first.value;
  if (localFrame >= last.frame) return last.value;

  let before = first;
  let after = last;
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (localFrame >= sorted[i].frame && localFrame <= sorted[i + 1].frame) {
      before = sorted[i];
      after = sorted[i + 1];
      break;
    }
  }

  if (after.interpolation === "hold") {
    return before.value;
  }

  const span = after.frame - before.frame;
  if (span <= 0) return after.value;

  const progress = (localFrame - before.frame) / span;
  const eased = applyEasing(progress, before.easing ?? DEFAULT_EASING);

  if (typeof before.value === "number" && typeof after.value === "number") {
    return before.value + (after.value - before.value) * eased;
  }
  return localFrame - before.frame < span / 2 ? before.value : after.value;
}

function applyEasing(t, easing) {
  const x = Math.min(1, Math.max(0, t));
  switch (easing) {
    case "ease-in":
      return x * x;
    case "ease-out":
      return 1 - (1 - x) * (1 - x);
    case "ease-in-out":
      return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
    case "spring":
      return x;
    default:
      return x;
  }
}

module.exports = {
  DEFAULT_EASING,
  clipLocalFrame,
  filterPropertyKeyframes,
  upsertKeyframe,
  removeKeyframe,
  removePropertyKeyframes,
  interpolateKeyframesAtFrame,
};
