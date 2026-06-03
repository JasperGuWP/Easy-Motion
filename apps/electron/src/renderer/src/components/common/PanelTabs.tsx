import { cn } from "@/lib/utils";

export interface TabItem<T extends string> {
  id: T;
  label: string;
}

interface PanelTabsProps<T extends string> {
  tabs: TabItem<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}

export function PanelTabs<T extends string>({
  tabs,
  active,
  onChange,
  className,
}: PanelTabsProps<T>) {
  return (
    <div
      className={cn(
        "flex shrink-0 gap-0.5 border-b border-em-border px-2 pt-1",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "cursor-pointer rounded-t-sm px-3 py-1.5 text-sm transition-colors duration-150 ease-out",
            active === tab.id
              ? "bg-em-surface text-em-text"
              : "text-em-muted hover:bg-em-elevated hover:text-em-text"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
