import type { Keyframe } from "@/types/timeline";
import {
  clipLocalFrame,
  filterPropertyKeyframes,
  interpolateKeyframesAtFrame,
  removeKeyframe,
  upsertKeyframe,
} from "@easymotion/shared";

export {
  clipLocalFrame,
  filterPropertyKeyframes,
  interpolateKeyframesAtFrame,
  removeKeyframe,
  upsertKeyframe,
};

export function getClipLocalFrame(timelineFrame: number, clipStartInFrames: number): number {
  return clipLocalFrame(timelineFrame, clipStartInFrames);
}

export function getKeyframesForProperty(
  keyframes: Keyframe[] | undefined,
  property: string,
): Keyframe[] {
  return filterPropertyKeyframes(keyframes ?? [], property) as Keyframe[];
}

export function resolvePropertyAtClipFrame(
  clip: {
    keyframes?: Keyframe[];
    transform?: Record<string, unknown>;
    style?: Record<string, unknown>;
  },
  property: string,
  localFrame: number,
): unknown {
  const fallback =
    property === "transform.opacity"
      ? ((clip.transform?.opacity as number | undefined) ?? 1)
      : undefined;
  return interpolateKeyframesAtFrame(clip.keyframes ?? [], property, localFrame, fallback);
}
