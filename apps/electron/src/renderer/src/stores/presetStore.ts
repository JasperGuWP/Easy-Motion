import { create } from "zustand";
import { getEasyMotion } from "@/types/easyMotion";
import { useTimelineStore } from "@/stores/timelineStore";

export interface PresetSummary {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  description: string;
  source: string;
}

interface PresetState {
  presets: PresetSummary[];
  isLoading: boolean;
  isApplying: boolean;
  isSaving: boolean;
  error: string | null;

  loadPresets: () => Promise<void>;
  applyPreset: (presetId: string) => Promise<boolean>;
  saveCurrentAsPreset: (name: string, description?: string) => Promise<boolean>;
  clearError: () => void;
}

export const usePresetStore = create<PresetState>((set, get) => ({
  presets: [],
  isLoading: false,
  isApplying: false,
  isSaving: false,
  error: null,

  clearError: () => set({ error: null }),

  loadPresets: async () => {
    const api = getEasyMotion();
    if (!api?.preset?.list) {
      set({ presets: [] });
      return;
    }

    set({ isLoading: true, error: null });
    const res = await api.preset.list();
    set({ isLoading: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "加载预设失败", presets: [] });
      return;
    }

    set({ presets: res.data ?? [], error: null });
  },

  applyPreset: async (presetId) => {
    const api = getEasyMotion();
    if (!api?.preset?.apply) {
      set({ error: "预设 API 不可用" });
      return false;
    }

    set({ isApplying: true, error: null });
    const res = await api.preset.apply({ presetId });
    set({ isApplying: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "应用预设失败" });
      return false;
    }

    await useTimelineStore.getState().loadTimeline();
    if (res.data?.generate?.previewReload) {
      useTimelineStore.setState((s) => ({
        previewReloadNonce: s.previewReloadNonce + 1,
      }));
    } else {
      await useTimelineStore.getState().runGenerate({ manual: false });
    }

    return true;
  },

  saveCurrentAsPreset: async (name, description) => {
    const api = getEasyMotion();
    if (!api?.preset?.save) {
      set({ error: "预设 API 不可用" });
      return false;
    }

    set({ isSaving: true, error: null });
    const res = await api.preset.save({ name, description, category: "custom" });
    set({ isSaving: false });

    if (!res.success) {
      set({ error: res.error?.message ?? "保存预设失败" });
      return false;
    }

    await get().loadPresets();
    return true;
  },
}));
