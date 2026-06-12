import type { ProjectAsset } from "@/types/asset";

export function formatAssetDuration(
  asset: ProjectAsset,
  fps = 30,
): string | null {
  const frames = asset.durationInFrames;
  if (!frames || frames <= 0) return null;
  const sec = frames / fps;
  if (sec < 60) return `${sec.toFixed(1)}s`;
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return s > 0 ? `${m}:${String(s).padStart(2, "0")}` : `${m}:00`;
}

export function formatAssetDimensions(asset: ProjectAsset): string | null {
  if (!asset.width || !asset.height) return null;
  return `${asset.width}×${asset.height}`;
}

export function formatAssetMeta(asset: ProjectAsset, fps = 30): string {
  const parts: string[] = [];
  const dim = formatAssetDimensions(asset);
  const dur = formatAssetDuration(asset, fps);
  if (dim) parts.push(dim);
  if (dur) parts.push(dur);
  if (parts.length === 0) return asset.type;
  return parts.join(" · ");
}
