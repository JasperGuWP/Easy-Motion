import { PanelTabs } from "@/components/common/PanelTabs";
import { ProjectPanel } from "@/components/project/ProjectPanel";
import { useUiStore } from "@/stores/uiStore";
import { Image, LayoutTemplate } from "lucide-react";

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
        {leftTab === "assets" && (
          <EmptyHint
            icon={<Image className="h-10 w-10 text-em-border" />}
            title="素材库"
            hint="拖拽文件到此处导入"
          />
        )}
        {leftTab === "presets" && (
          <EmptyHint
            icon={<LayoutTemplate className="h-10 w-10 text-em-border" />}
            title="预设"
            hint="浏览预设，快速开始"
          />
        )}
      </div>
    </aside>
  );
}

function EmptyHint({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      {icon}
      <p className="text-em-text">{title}</p>
      <p className="text-xs">{hint}</p>
    </div>
  );
}
