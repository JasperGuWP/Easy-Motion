const timeline = require("./timeline");
const trackSolo = require("./track-solo");
const previewVisibility = require("./preview-visibility");
const agentTools = require("./agent-tools");
const {
  MAX_COMPOSITION_MINUTES,
  getAssetDesiredDurationFrames,
  getRemainingFrames,
  getMaxCompositionFrames,
  computeExtendTargetFrames,
  needsAssetPlaceChoice,
  resolveClipDurationFrames,
  canExtendTimelineForAsset,
} = require("./asset-place-duration");
const {
  DEFAULT_EASING,
  clipLocalFrame,
  filterPropertyKeyframes,
  upsertKeyframe,
  removeKeyframe,
  removePropertyKeyframes,
  interpolateKeyframesAtFrame,
} = require("./keyframe");

module.exports = {
  ...timeline,
  ...trackSolo,
  ...previewVisibility,
  ...agentTools,
  MAX_COMPOSITION_MINUTES,
  getAssetDesiredDurationFrames,
  getRemainingFrames,
  getMaxCompositionFrames,
  computeExtendTargetFrames,
  needsAssetPlaceChoice,
  resolveClipDurationFrames,
  canExtendTimelineForAsset,
  DEFAULT_EASING,
  clipLocalFrame,
  filterPropertyKeyframes,
  upsertKeyframe,
  removeKeyframe,
  removePropertyKeyframes,
  interpolateKeyframesAtFrame,
};
