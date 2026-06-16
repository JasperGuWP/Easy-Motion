/** 从片段 source 解析 Remotion staticFile 路径 */

interface ClipSourceLike {
  kind?: string;
  path?: string;
  publicPath?: string;
}

export function resolveClipMediaSrc(source?: ClipSourceLike | null): string {
  if (!source) return "";
  const raw =
    source.kind === "asset"
      ? source.publicPath || source.path
      : source.path || source.publicPath;
  if (!raw || typeof raw !== "string") return "";
  const normalized = raw.startsWith("/") ? raw.slice(1) : raw;
  return normalized;
}
