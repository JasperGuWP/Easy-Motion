const USER_EDIT_CONFLICT_MS = 5 * 60 * 1000;

function needsUserOverwriteConfirm(clip, { now = Date.now() } = {}) {
  if (!clip || clip.lastModifiedBy !== "user") return false;
  if (typeof clip.lastModifiedAt !== "number") return false;
  return now - clip.lastModifiedAt < USER_EDIT_CONFLICT_MS;
}

module.exports = { USER_EDIT_CONFLICT_MS, needsUserOverwriteConfirm };
