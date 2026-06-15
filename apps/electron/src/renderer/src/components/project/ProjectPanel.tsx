import { useState } from "react";
import { FolderOpen, FolderPlus, Loader2 } from "lucide-react";
import {
  loadNewProjectDialogDefaults,
  NewProjectDialog,
  type NewProjectDialogState,
} from "@/components/project/NewProjectDialog";
import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";

export function ProjectPanel() {
  const current = useProjectStore((s) => s.current);
  const isLoading = useProjectStore((s) => s.isLoading);
  const error = useProjectStore((s) => s.error);
  const openProjectByPicker = useProjectStore((s) => s.openProjectByPicker);
  const clearError = useProjectStore((s) => s.clearError);

  const [newDialog, setNewDialog] = useState<NewProjectDialogState | null>(null);
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  const openNewProjectDialog = async () => {
    clearError();
    const defaults = await loadNewProjectDialogDefaults();
    if (!defaults) {
      useProjectStore.setState({ error: "项目 API 不可用（请在 Electron 窗口中运行）" });
      return;
    }
    setNewDialog(defaults);
    setNewDialogOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3 text-sm">
        {current ? (
          <div className="rounded-md border border-em-border bg-em-surface p-3">
            <p className="font-medium text-em-text">{current.name}</p>
            <p className="mt-1 break-all text-xs text-em-muted">{current.path}</p>
          </div>
        ) : (
          <p className="text-em-muted">尚未打开项目</p>
        )}

        {error && !newDialogOpen ? (
          <p className="text-xs text-em-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => void openNewProjectDialog()}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-em-accent px-3 py-2 text-sm text-white transition-colors duration-150 ease-out hover:bg-em-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isLoading && !newDialogOpen ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <FolderPlus className="h-4 w-4" />
            )}
            新建项目
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              clearError();
              void openProjectByPicker();
            }}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border border-em-border bg-em-elevated px-3 py-2 text-sm text-em-text transition-colors duration-150 ease-out hover:bg-em-surface disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FolderOpen className="h-4 w-4" />
            打开项目…
          </button>
        </div>
      </div>

      <NewProjectDialog
        open={newDialogOpen}
        initial={newDialog}
        onClose={() => {
          setNewDialogOpen(false);
          clearError();
        }}
      />
    </>
  );
}
