/** 与 subproject.json / packages/shared 校验结构对齐 */

export type TrackType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "shape"
  | "chart"
  | "animation"
  | "group";

export interface Timeline {
  version: string;
  fps: number;
  durationInFrames: number;
  width: number;
  height: number;
  tracks: Track[];
}

export interface Track {
  id: string;
  name: string;
  type: TrackType;
  order: number;
  visible: boolean;
  locked: boolean;
  muted: boolean;
  clips: Clip[];
}

export interface Clip {
  id: string;
  type: string;
  name: string;
  startInFrames: number;
  durationInFrames: number;
  source?: Record<string, unknown>;
  transform?: Record<string, unknown>;
  style?: Record<string, unknown>;
  keyframes?: unknown[];
  animations?: Record<string, unknown>;
}
