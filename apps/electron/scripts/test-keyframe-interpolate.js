const {
  interpolateKeyframesAtFrame,
  upsertKeyframe,
  removeKeyframe,
} = require("@easymotion/shared");

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const keyframes = [
  {
    id: "kf-a",
    property: "transform.opacity",
    frame: 0,
    value: 0,
    easing: "linear",
    interpolation: "linear",
  },
  {
    id: "kf-b",
    property: "transform.opacity",
    frame: 30,
    value: 1,
    easing: "ease-in-out",
    interpolation: "linear",
  },
];

assert(
  interpolateKeyframesAtFrame(keyframes, "transform.opacity", 0, 1) === 0,
  "frame 0 opacity",
);
assert(
  interpolateKeyframesAtFrame(keyframes, "transform.opacity", 30, 1) === 1,
  "frame 30 opacity",
);
assert(
  Math.abs(
    interpolateKeyframesAtFrame(keyframes, "transform.opacity", 15, 1) - 0.5,
  ) < 0.01,
  "mid opacity",
);

const merged = upsertKeyframe(keyframes, {
  property: "transform.opacity",
  frame: 15,
  value: 0.25,
});
assert(merged.length === 3, "upsert adds keyframe");

const removed = removeKeyframe(merged, "kf-a");
assert(removed.length === 2, "remove keyframe");

console.log("[PASS] keyframe-interpolate");
