// Preview server lifecycle states
export type PreviewServerStatus = 'stopped' | 'starting' | 'installing' | 'running' | 'error';

export interface PreviewServerState {
  status: PreviewServerStatus;
  port: number | null;
  url: string | null;
  error: string | null;
  subprojectId: string | null;
}

// Composition metadata matches Timeline fields
export interface PreviewCompositionMeta {
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
}

// postMessage protocol: parent -> iframe
export type PreviewCommand =
  | { type: 'preview:play' }
  | { type: 'preview:pause' }
  | { type: 'preview:seek'; frame: number }
  | { type: 'preview:setPlaybackRate'; rate: number }
  | { type: 'preview:setComposition'; meta: PreviewCompositionMeta }
  | { type: 'preview:reload' };

// postMessage protocol: iframe -> parent
export type PreviewEvent =
  | { type: 'preview:ready' }
  | { type: 'preview:frameUpdate'; frame: number }
  | { type: 'preview:play' }
  | { type: 'preview:pause' }
  | { type: 'preview:ended' }
  | { type: 'preview:error'; error: string }
  | { type: 'preview:compositionLoaded'; meta: PreviewCompositionMeta };

// IPC payload types for main:preview:* channels
export interface StartServerPayload {
  subprojectId: string;
  projectPath: string;
}

export interface StartServerResult {
  url: string;
  port: number;
}

export interface SeekPayload {
  frame: number;
}
