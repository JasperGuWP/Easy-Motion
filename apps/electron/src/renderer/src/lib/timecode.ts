export function formatTimecode(frame: number, fps: number): string {
  const totalSeconds = Math.floor(frame / fps);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatFrameRange(current: number, total: number, fps: number): string {
  return `${current}/${total} 帧 · ${formatTimecode(current, fps)} / ${formatTimecode(total, fps)}`;
}
