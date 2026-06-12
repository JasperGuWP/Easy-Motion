const {
  getAssetDesiredDurationFrames,
  getRemainingFrames,
  needsAssetPlaceChoice,
  computeExtendTargetFrames,
  resolveClipDurationFrames,
  canExtendTimelineForAsset,
  MAX_COMPOSITION_MINUTES,
} = require("@easymotion/shared");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const timeline = { fps: 30, durationInFrames: 90 };
const longVideo = { type: "video", durationInFrames: 300 };
const image = { type: "image" };

assert(
  getAssetDesiredDurationFrames(longVideo, timeline, 0) === 300,
  "video desired duration",
);
assert(getRemainingFrames(timeline, 0) === 90, "remaining at start");
assert(
  needsAssetPlaceChoice(longVideo, timeline, 0),
  "long video should need choice",
);
assert(
  !needsAssetPlaceChoice(image, timeline, 0),
  "short image should not need choice",
);

const extendTo = computeExtendTargetFrames(timeline, 0, 300);
assert(extendTo === 300, `extend target expected 300, got ${extendTo}`);
assert(
  canExtendTimelineForAsset(longVideo, timeline, 0),
  "should be able to extend",
);

assert(
  resolveClipDurationFrames("remaining", longVideo, timeline, 0) === 90,
  "remaining choice",
);
assert(
  resolveClipDurationFrames("extend", longVideo, timeline, 0) === 300,
  "extend choice duration",
);

const cappedTimeline = {
  fps: 30,
  durationInFrames: MAX_COMPOSITION_MINUTES * 60 * 30,
};
const hugeVideo = { type: "video", durationInFrames: 99999 };
assert(
  !canExtendTimelineForAsset(hugeVideo, cappedTimeline, 0),
  "should not extend past max composition",
);

console.log("[PASS] place-asset-duration");
