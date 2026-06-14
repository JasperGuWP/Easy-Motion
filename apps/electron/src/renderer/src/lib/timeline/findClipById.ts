import { findLayerTrackForClip } from "@/lib/timeline/trackTree";
import type { Timeline } from "@/types/timeline";

export function findClipById(
  timeline: Timeline,
  clipId: string
): Timeline["tracks"][number]["clips"][number] | null {
  const located = findLayerTrackForClip(timeline, clipId);
  return located?.clip ?? null;
}
