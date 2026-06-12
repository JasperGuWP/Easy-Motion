import type { ProjectAsset } from "@/types/asset";

interface AssetHoverPreviewProps {
  asset: ProjectAsset;
  previewUrl: string;
}

export function AssetHoverPreview({ asset, previewUrl }: AssetHoverPreviewProps) {
  return (
    <div
      className="pointer-events-none absolute left-[calc(100%+8px)] top-0 z-30 w-40 overflow-hidden rounded-md border border-em-border bg-em-bg shadow-lg"
      role="tooltip"
    >
      {asset.type === "image" && (
        <img
          src={previewUrl}
          alt={asset.name}
          className="h-28 w-full object-contain bg-black/80"
        />
      )}
      {asset.type === "video" && (
        <video
          src={previewUrl}
          className="h-28 w-full object-contain bg-black"
          muted
          autoPlay
          loop
          playsInline
        />
      )}
      {asset.type === "audio" && (
        <div className="flex h-20 items-center justify-center bg-em-surface px-3 text-center text-[11px] text-em-muted">
          音频素材
        </div>
      )}
      <p className="truncate border-t border-em-border px-2 py-1 text-[10px] text-em-muted">
        {asset.name}
      </p>
    </div>
  );
}
