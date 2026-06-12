import { useAssetDuplicateStore } from "@/stores/assetDuplicateStore";

export function AssetDuplicateDialog() {
  const dialog = useAssetDuplicateStore((s) => s.dialog);
  const respond = useAssetDuplicateStore((s) => s.respond);

  if (!dialog) return null;

  const preview = dialog.names.slice(0, 5).join("、");
  const more = dialog.names.length > 5 ? ` 等 ${dialog.count} 个` : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) respond("cancel");
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-md border border-em-border bg-em-elevated p-5 shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-sm font-medium text-em-text">发现同名素材</h2>
        <p className="mt-2 text-xs leading-relaxed text-em-muted">
          {preview}
          {more} 已在素材库中。如何处理？
        </p>

        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => respond("rename")}
            className="cursor-pointer rounded-sm border border-em-teal/50 bg-em-teal/10 px-3 py-2 text-left text-xs text-em-text hover:bg-em-teal/20"
          >
            <span className="font-medium">重命名导入</span>
            <span className="mt-0.5 block text-em-muted">自动添加序号，如 logo (1).png</span>
          </button>
          <button
            type="button"
            onClick={() => respond("overwrite")}
            className="cursor-pointer rounded-sm border border-em-border bg-em-surface px-3 py-2 text-left text-xs text-em-text hover:bg-em-bg"
          >
            <span className="font-medium">覆盖原素材</span>
            <span className="mt-0.5 block text-em-muted">保留 ID，时间线引用仍有效</span>
          </button>
          <button
            type="button"
            onClick={() => respond("skip")}
            className="cursor-pointer rounded-sm border border-em-border bg-em-surface px-3 py-2 text-left text-xs text-em-text hover:bg-em-bg"
          >
            <span className="font-medium">跳过同名文件</span>
          </button>
          <button
            type="button"
            onClick={() => respond("cancel")}
            className="cursor-pointer px-3 py-2 text-xs text-em-muted hover:text-em-text"
          >
            取消导入
          </button>
        </div>
      </div>
    </div>
  );
}
