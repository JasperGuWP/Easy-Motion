/** M6-05：素材落点时间线时长计算（渲染端与 Agent 共用） */

const MAX_COMPOSITION_MINUTES = 30;

function getAssetDesiredDurationFrames(asset, timeline, startInFrames = 0) {
  const fromAsset = asset?.durationInFrames;
  if (fromAsset && fromAsset > 0) {
    return fromAsset;
  }
  const fps = timeline?.fps ?? 30;
  const fallback = asset?.type === "image" ? fps * 3 : fps * 5;
  return Math.max(1, fallback);
}

function getRemainingFrames(timeline, startInFrames) {
  const total = timeline?.durationInFrames ?? 0;
  const start = Math.max(0, Math.min(startInFrames, total));
  return Math.max(0, total - start);
}

function getMaxCompositionFrames(timeline) {
  const fps = timeline?.fps ?? 30;
  return fps * MAX_COMPOSITION_MINUTES * 60;
}

function computeExtendTargetFrames(timeline, startInFrames, desiredFrames) {
  const maxFrames = getMaxCompositionFrames(timeline);
  return Math.min(startInFrames + desiredFrames, maxFrames);
}

function needsAssetPlaceChoice(asset, timeline, startInFrames) {
  const desired = getAssetDesiredDurationFrames(asset, timeline, startInFrames);
  const remaining = getRemainingFrames(timeline, startInFrames);
  return desired > remaining;
}

function resolveClipDurationFrames(choice, asset, timeline, startInFrames) {
  const desired = getAssetDesiredDurationFrames(asset, timeline, startInFrames);
  const remaining = getRemainingFrames(timeline, startInFrames);

  if (choice === "remaining") {
    return Math.max(1, remaining);
  }
  if (choice === "extend") {
    return Math.max(1, desired);
  }
  // fit：素材未超出剩余空间时的默认时长
  return Math.max(1, Math.min(desired, remaining));
}

function canExtendTimelineForAsset(asset, timeline, startInFrames) {
  const desired = getAssetDesiredDurationFrames(asset, timeline, startInFrames);
  const extendTo = computeExtendTargetFrames(timeline, startInFrames, desired);
  return extendTo > (timeline?.durationInFrames ?? 0);
}

module.exports = {
  MAX_COMPOSITION_MINUTES,
  getAssetDesiredDurationFrames,
  getRemainingFrames,
  getMaxCompositionFrames,
  computeExtendTargetFrames,
  needsAssetPlaceChoice,
  resolveClipDurationFrames,
  canExtendTimelineForAsset,
};
