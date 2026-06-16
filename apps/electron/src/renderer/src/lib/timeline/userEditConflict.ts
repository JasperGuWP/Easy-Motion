import type { Clip } from "@/types/timeline";

export const USER_EDIT_CONFLICT_MS = 5 * 60 * 1000;

export function clipNeedsOverwriteConfirm(
  clip: Clip | null | undefined,
  now = Date.now()
): boolean {
  if (!clip || clip.lastModifiedBy !== "user") return false;
  if (typeof clip.lastModifiedAt !== "number") return false;
  return now - clip.lastModifiedAt < USER_EDIT_CONFLICT_MS;
}
