import { useAssetPlaceStore } from "@/stores/assetPlaceStore";

function formatSeconds(frames: number, fps: number): string {
  const sec = frames / fps;
  if (sec < 60) return `${sec.toFixed(1)} 秒`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return s > 0 ? `${m} 分 ${s} 秒` : `${m} 分钟`;
}

export function AssetDurationDialog() {
  const dialog = useAssetPlaceStore((s) => s.dialog);
  const respond = useAssetPlaceStore((s) => s.respond);

  if (!dialog) return null;

  const { assetName, desiredFrames, remainingFrames, extendToFrames, fps, canExtend } =
    dialog;

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
        aria-labelledby="asset-duration-title"
        className="w-full max-w-md rounded-md border border-em-border bg-em-elevated p-5 shadow-lg"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2
          id="asset-duration-title"
          className="text-sm font-medium text-em-text"
        >
          素材超出成片时长
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-em-muted">
          「{assetName}」需要约 {formatSeconds(desiredFrames, fps)}，当前落点后仅剩{" "}
          {formatSeconds(remainingFrames, fps)} 空间。
        </p>

        <div className="mt-4 flex flex-col gap-2">
          {canExtend && (
            <button
              type="button"
              onClick={() => respond("extend")}
              className="cursor-pointer rounded-sm border border-em-teal/50 bg-em-teal/10 px-3 py-2 text-left text-xs text-em-text transition-colors duration-150 hover:bg-em-teal/20"
            >
              <span className="font-medium">延长成片</span>
              <span className="mt-0.5 block text-em-muted">
                将成片延长至 {formatSeconds(extendToFrames, fps)} 并放入完整素材
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={() => respond("remaining")}
            className="cursor-pointer rounded-sm border border-em-border bg-em-surface px-3 py-2 text-left text-xs text-em-text transition-colors duration-150 hover:bg-em-bg"
          >
            <span className="font-medium">仅放入剩余空间</span>
            <span className="mt-0.5 block text-em-muted">
              片段时长 {formatSeconds(remainingFrames, fps)}（素材将被裁剪）
            </span>
          </button>

          <button
            type="button"
            onClick={() => respond("cancel")}
            className="cursor-pointer rounded-sm px-3 py-2 text-xs text-em-muted transition-colors duration-150 hover:text-em-text"
          >
            取消
          </button>
        </div>

        {!canExtend && (
          <p className="mt-3 text-[11px] text-em-muted">
            已达成片上限（30 分钟），无法继续延长。
          </p>
        )}
      </div>
    </div>
  );
}
