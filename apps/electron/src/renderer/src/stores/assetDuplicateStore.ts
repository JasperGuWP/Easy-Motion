import { create } from "zustand";

export type DuplicateImportPolicy = "overwrite" | "rename" | "skip";

export interface DuplicateImportDialogPayload {
  count: number;
  names: string[];
}

interface AssetDuplicateState {
  dialog: DuplicateImportDialogPayload | null;
  requestPolicy: (
    payload: DuplicateImportDialogPayload,
  ) => Promise<DuplicateImportPolicy | "cancel">;
  respond: (policy: DuplicateImportPolicy | "cancel") => void;
}

let pendingResolve: ((policy: DuplicateImportPolicy | "cancel") => void) | null =
  null;

export const useAssetDuplicateStore = create<AssetDuplicateState>((set) => ({
  dialog: null,

  requestPolicy: (payload) =>
    new Promise((resolve) => {
      pendingResolve = resolve;
      set({ dialog: payload });
    }),

  respond: (policy) => {
    pendingResolve?.(policy);
    pendingResolve = null;
    set({ dialog: null });
  },
}));
