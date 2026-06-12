import { Easing, interpolate, useCurrentFrame } from "remotion";

export type KeyframeLike = {
  id?: string;
  property: string;
  frame: number;
  value: unknown;
  easing?: string;
  interpolation?: string;
};

function sortKeyframes(keyframes: KeyframeLike[]) {
  return [...keyframes].sort((a, b) => a.frame - b.frame);
}

function filterPropertyKeyframes(keyframes: KeyframeLike[], property: string) {
  return sortKeyframes(keyframes.filter((kf) => kf.property === property));
}

function applyEasing(t: number, easing?: string) {
  const x = Math.min(1, Math.max(0, t));
  switch (easing) {
    case "ease-in":
      return Easing.in(Easing.ease)(x);
    case "ease-out":
      return Easing.out(Easing.ease)(x);
    case "ease-in-out":
      return Easing.inOut(Easing.ease)(x);
    default:
      return x;
  }
}

export function interpolateKeyframesAtFrame(
  keyframes: KeyframeLike[],
  property: string,
  localFrame: number,
  fallback: number,
): number {
  const sorted = filterPropertyKeyframes(keyframes, property);
  if (sorted.length === 0) return fallback;

  const inputRange = sorted.map((kf) => kf.frame);
  const outputRange = sorted.map((kf) => Number(kf.value));

  if (localFrame <= inputRange[0]) return outputRange[0];
  if (localFrame >= inputRange[inputRange.length - 1]) {
    return outputRange[outputRange.length - 1];
  }

  let easing = "linear";
  for (let i = 0; i < sorted.length - 1; i += 1) {
    if (localFrame >= sorted[i].frame && localFrame <= sorted[i + 1].frame) {
      if (sorted[i + 1].interpolation === "hold") {
        return Number(sorted[i].value);
      }
      easing = sorted[i].easing ?? "linear";
      break;
    }
  }

  const easingFn =
    easing === "linear"
      ? undefined
      : (t: number) => applyEasing(t, easing);

  return interpolate(localFrame, inputRange, outputRange, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easingFn,
  });
}
