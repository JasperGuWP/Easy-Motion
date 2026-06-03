import { create } from "zustand";

export type LeftTab = "project" | "assets" | "presets";
export type RightTab = "properties" | "assets" | "presets" | "ai";

interface UiState {
  leftPanelWidth: number;
  rightPanelWidth: number;
  timelineHeight: number;
  leftCollapsed: boolean;
  rightCollapsed: boolean;
  timelineCollapsed: boolean;
  leftTab: LeftTab;
  rightTab: RightTab;
  setLeftPanelWidth: (w: number) => void;
  setRightPanelWidth: (w: number) => void;
  setTimelineHeight: (h: number) => void;
  toggleLeftCollapsed: () => void;
  toggleRightCollapsed: () => void;
  toggleTimelineCollapsed: () => void;
  setLeftTab: (tab: LeftTab) => void;
  setRightTab: (tab: RightTab) => void;
}

export const useUiStore = create<UiState>((set) => ({
  leftPanelWidth: 220,
  rightPanelWidth: 280,
  timelineHeight: 220,
  leftCollapsed: false,
  rightCollapsed: false,
  timelineCollapsed: false,
  leftTab: "project",
  rightTab: "properties",
  setLeftPanelWidth: (leftPanelWidth) => set({ leftPanelWidth }),
  setRightPanelWidth: (rightPanelWidth) => set({ rightPanelWidth }),
  setTimelineHeight: (timelineHeight) => set({ timelineHeight }),
  toggleLeftCollapsed: () => set((s) => ({ leftCollapsed: !s.leftCollapsed })),
  toggleRightCollapsed: () => set((s) => ({ rightCollapsed: !s.rightCollapsed })),
  toggleTimelineCollapsed: () =>
    set((s) => ({ timelineCollapsed: !s.timelineCollapsed })),
  setLeftTab: (leftTab) => set({ leftTab }),
  setRightTab: (rightTab) => set({ rightTab }),
}));
