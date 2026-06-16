/** 将时间线展平为预览渲染列表（底层 → 顶层，与 flatten-tracks 顺序一致） */

interface TimelineClip {
  id: string;
  name?: string;
  startInFrames?: number;
  durationInFrames?: number;
  source?: {
    kind?: string;
    content?: string;
    component?: string;
  };
  transform?: {
    position: { x: number; y: number };
    scale: number;
    rotation: number;
    opacity: number;
  };
  style?: Record<string, unknown>;
  animations?: {
    in?: { type: string; durationInFrames: number };
    out?: { type: string; durationInFrames: number };
  };
}

interface TimelineTrack {
  id: string;
  type: string;
  order?: number;
  visible?: boolean;
  clips?: TimelineClip[];
  children?: TimelineTrack[];
}

export interface TimelineLike {
  tracks?: TimelineTrack[];
}

export interface FlatPreviewClip {
  track: TimelineTrack;
  clip: TimelineClip;
  order: number;
}

export function flattenClipsForPreview(
  timeline?: TimelineLike | null,
): FlatPreviewClip[] {
  if (!timeline?.tracks?.length) return [];

  const items: FlatPreviewClip[] = [];
  const sorted = [...timeline.tracks].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  sorted.forEach((track, parentIndex) => {
    if (track.type === "group") {
      if (track.visible === false) return;
      const children = [...(track.children ?? [])].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0),
      );
      children.forEach((child, childIndex) => {
        if (child.visible === false) return;
        for (const clip of child.clips ?? []) {
          items.push({
            track: child,
            clip,
            order: parentIndex * 1000 + childIndex,
          });
        }
      });
      return;
    }

    if (track.visible === false) return;
    for (const clip of track.clips ?? []) {
      items.push({ track, clip, order: parentIndex * 1000 });
    }
  });

  return items.sort((a, b) => a.order - b.order);
}
