import { PanelTabs } from "@/components/common/PanelTabs";
import { AssetsPanel } from "@/components/assets/AssetsPanel";
import { ProjectPanel } from "@/components/project/ProjectPanel";
import { useUiStore } from "@/stores/uiStore";
import { PresetsPanel } from "@/components/presets/PresetsPanel";

const TABS = [
  { id: "project" as const, label: "项目" },
  { id: "assets" as const, label: "素材" },
  { id: "presets" as const, label: "预设" },
];

export function LeftPanel() {
  const { leftTab, setLeftTab } = useUiStore();

  return (
    <aside className="flex h-full min-w-0 flex-col border-r border-em-border bg-em-bg">
      <PanelTabs tabs={TABS} active={leftTab} onChange={setLeftTab} />
      <div className="flex flex-1 flex-col overflow-auto p-3 text-sm text-em-muted">
        {leftTab === "project" && <ProjectPanel />}
        {leftTab === "assets" && <AssetsPanel />}
        {leftTab === "presets" && <PresetsPanel />}
      </div>
    </aside>
  );
}
