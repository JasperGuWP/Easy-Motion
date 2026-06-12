import { useMemo, useState } from "react";
import { LayoutTemplate, Loader2, Save } from "lucide-react";
import { usePresetStore } from "@/stores/presetStore";
import { useProjectStore } from "@/stores/projectStore";

export function PresetsPanel() {
  const hasProject = Boolean(useProjectStore((s) => s.current));
  const presets = usePresetStore((s) => s.presets);
  const isLoading = usePresetStore((s) => s.isLoading);
  const isApplying = usePresetStore((s) => s.isApplying);
  const isSaving = usePresetStore((s) => s.isSaving);
  const error = usePresetStore((s) => s.error);
  const applyPreset = usePresetStore((s) => s.applyPreset);
  const saveCurrentAsPreset = usePresetStore((s) => s.saveCurrentAsPreset);
  const clearError = usePresetStore((s) => s.clearError);

  const [saveName, setSaveName] = useState("");
  const [showSave, setShowSave] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof presets>();
    for (const preset of presets) {
      const key = preset.categoryLabel || preset.category;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(preset);
    }
    return [...map.entries()];
  }, [presets]);

  if (!hasProject) {
    return (
      <p className="text-xs text-em-muted">打开项目后可浏览和应用预设。</p>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-em-muted">点击应用，将预设轨道追加到时间线</p>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => {
            clearError();
            setShowSave((v) => !v);
          }}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-sm border border-em-border bg-em-surface px-2 py-1 text-[10px] text-em-text hover:bg-em-elevated disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Save className="h-3 w-3" />
          )}
          保存为预设
        </button>
      </div>

      {showSave && (
        <div className="space-y-2 rounded-md border border-em-border bg-em-surface p-2">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="预设名称"
            className="w-full rounded-sm border border-em-border bg-em-bg px-2 py-1 text-xs text-em-text outline-none focus:border-em-teal/50"
          />
          <button
            type="button"
            disabled={isSaving || !saveName.trim()}
            onClick={() => {
              void (async () => {
                const ok = await saveCurrentAsPreset(saveName.trim());
                if (ok) {
                  setSaveName("");
                  setShowSave(false);
                }
              })();
            }}
            className="w-full cursor-pointer rounded-sm bg-em-teal/20 px-2 py-1.5 text-xs text-em-text hover:bg-em-teal/30 disabled:cursor-not-allowed disabled:opacity-50"
          >
            保存当前时间线
          </button>
        </div>
      )}

      {error && (
        <p className="text-xs text-em-error" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-xs text-em-muted">加载预设…</p>
      ) : presets.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
          <LayoutTemplate className="h-10 w-10 text-em-border" />
          <p className="text-xs text-em-muted">暂无预设</p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-auto">
          {grouped.map(([category, items]) => (
            <section key={category}>
              <h3 className="mb-1 text-[10px] font-medium uppercase tracking-wide text-em-muted">
                {category}
              </h3>
              <ul className="flex flex-col gap-1">
                {items.map((preset) => (
                  <li key={preset.id}>
                    <button
                      type="button"
                      disabled={isApplying}
                      onClick={() => {
                        clearError();
                        void applyPreset(preset.id);
                      }}
                      className="w-full cursor-pointer rounded-md border border-em-border bg-em-surface px-2 py-2 text-left text-xs transition-colors duration-150 hover:border-em-teal/40 hover:bg-em-elevated disabled:opacity-50"
                    >
                      <span className="font-medium text-em-text">{preset.name}</span>
                      {preset.description && (
                        <span className="mt-0.5 block text-[10px] text-em-muted">
                          {preset.description}
                        </span>
                      )}
                      {preset.source === "user" && (
                        <span className="mt-1 inline-block rounded bg-em-bg px-1 py-0.5 text-[9px] text-em-muted">
                          自定义
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
