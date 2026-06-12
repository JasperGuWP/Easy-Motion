import { create } from "zustand";

export type AssetPlaceChoice = "extend" | "remaining" | "cancel";

export interface AssetPlaceDialogPayload {
  assetName: string;
  desiredFrames: number;
  remainingFrames: number;
  extendToFrames: number;
  fps: number;
  canExtend: boolean;
}

interface AssetPlaceState {
  dialog: AssetPlaceDialogPayload | null;
  requestChoice: (payload: AssetPlaceDialogPayload) => Promise<AssetPlaceChoice>;
  respond: (choice: AssetPlaceChoice) => void;
}

let pendingResolve: ((choice: AssetPlaceChoice) => void) | null = null;

export const useAssetPlaceStore = create<AssetPlaceState>((set) => ({
  dialog: null,

  requestChoice: (payload) =>
    new Promise((resolve) => {
      pendingResolve = resolve;
      set({ dialog: payload });
    }),

  respond: (choice) => {
    pendingResolve?.(choice);
    pendingResolve = null;
    set({ dialog: null });
  },
}));
