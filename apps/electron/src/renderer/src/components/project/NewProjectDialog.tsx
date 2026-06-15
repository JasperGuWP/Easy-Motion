import { useEffect, useRef, useState } from "react";
import { FolderOpen, Loader2 } from "lucide-react";
import { getEasyMotion } from "@/types/easyMotion";
import { useProjectStore } from "@/stores/projectStore";
import { cn } from "@/lib/utils";

export interface NewProjectDialogState {
  parentPath: string;
  name: string;
}

interface NewProjectDialogProps {
  open: boolean;
  initial: NewProjectDialogState | null;
  onClose: () => void;
}

export function NewProjectDialog({ open, initial, onClose }: NewProjectDialogProps) {
  const createProject = useProjectStore((s) => s.createProject);
  const isLoading = useProjectStore((s) => s.isLoading);
  const storeError = useProjectStore((s) => s.error);
  const clearError = useProjectStore((s) => s.clearError);

  const [name, setName] = useState("");
  const [parentPath, setParentPath] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open || !initial) return;
    setName(initial.name);
    setParentPath(initial.parentPath);
    setLocalError(null);
    clearError();
    const t = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
    return () => window.clearTimeout(t);
  }, [open, initial, clearError]);

  if (!open || !initial) return null;

  const error = localError ?? storeError;

  const pickParent = async () => {
    const api = getEasyMotion();
    if (!api?.project.pickParentDirectory) {
      setLocalError("项目 API 不可用（请在 Electron 窗口中运行）");
      return;
    }
    const res = await api.project.pickParentDirectory();
    if (!res.success || !res.data?.path) return;
    setParentPath(res.data.path);
    setLocalError(null);
  };

  const submit = async () => {
    setLocalError(null);
    clearError();
    const ok = await createProject(name, parentPath);
    if (ok) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (!isLoading && e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-title"
        className="w-full max-w-md rounded-md border border-em-border bg-em-elevated p-5 shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 id="new-project-title" className="text-sm font-medium text-em-text">
          新建项目
        </h2>
        <p className="mt-1 text-xs text-em-muted">输入项目名称并选择保存位置</p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs text-em-muted">项目名称</label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              disabled={isLoading}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") void submit();
                if (e.key === "Escape") onClose();
              }}
              className="w-full rounded-md border border-em-border bg-em-surface px-3 py-2 text-sm text-em-text placeholder:text-em-muted focus:border-em-teal focus:outline-none focus:ring-1 focus:ring-em-teal disabled:opacity-50"
              placeholder="未命名项目"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-em-muted">保存位置</label>
            <div className="flex gap-2">
              <p className="min-h-[2.25rem] flex-1 break-all rounded-md border border-em-border bg-em-surface px-3 py-2 text-xs leading-relaxed text-em-muted">
                {parentPath}
              </p>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => void pickParent()}
                className="shrink-0 cursor-pointer rounded-sm border border-em-border bg-em-surface px-2 py-2 text-em-text transition-colors hover:bg-em-bg disabled:cursor-not-allowed disabled:opacity-50"
                title="选择文件夹"
              >
                <FolderOpen className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <p className="mt-3 text-xs text-em-error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="cursor-pointer rounded-sm px-3 py-2 text-xs text-em-muted transition-colors hover:text-em-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            取消
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => void submit()}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-em-accent px-4 py-2 text-xs text-white transition-colors hover:bg-em-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            创建
          </button>
        </div>
      </div>
    </div>
  );
}

export async function loadNewProjectDialogDefaults(): Promise<NewProjectDialogState | null> {
  const api = getEasyMotion();
  if (!api?.project.prepareCreate) return null;
  const res = await api.project.prepareCreate();
  if (!res.success || !res.data) return null;
  return {
    parentPath: res.data.parentPath,
    name: res.data.suggestedName,
  };
}
