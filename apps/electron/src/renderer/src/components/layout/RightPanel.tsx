import { ChatPanel } from "@/components/chat/ChatPanel";
import { PanelTabs } from "@/components/common/PanelTabs";
import { PropertiesPanel } from "@/components/properties/PropertiesPanel";
import { useUiStore } from "@/stores/uiStore";

const TABS = [
  { id: "properties" as const, label: "属性" },
  { id: "assets" as const, label: "素材" },
  { id: "presets" as const, label: "预设" },
  { id: "ai" as const, label: "AI 助手" },
];

export function RightPanel() {
  const { rightTab, setRightTab } = useUiStore();

  return (
    <aside className="flex h-full min-w-0 flex-col border-l border-em-border bg-em-bg">
      <PanelTabs tabs={TABS} active={rightTab} onChange={setRightTab} />
      <div className="flex min-h-0 flex-1 flex-col overflow-auto p-3 text-sm">
        {rightTab === "properties" && <PropertiesPanel />}
        {rightTab === "assets" && <p className="text-em-muted">快捷素材区</p>}
        {rightTab === "presets" && <p className="text-em-muted">预设浏览</p>}
        {rightTab === "ai" && <ChatPanel />}
      </div>
    </aside>
  );
}
