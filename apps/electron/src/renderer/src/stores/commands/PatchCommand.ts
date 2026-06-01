import type { WritableDraft } from 'immer';
import type { Timeline } from '@easymotion/shared';
import type { Command } from './types';

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * Snapshot-based fallback command.
 * Stores the full Timeline before and after a change.
 * execute() restores the "after" snapshot; undo() restores the "before" snapshot.
 */
export class PatchCommand implements Command {
  readonly type = 'patch';
  private before: Timeline;
  private after: Timeline;

  constructor(before: Timeline, after: Timeline) {
    this.before = deepClone(before);
    this.after = deepClone(after);
  }

  execute(timeline: WritableDraft<Timeline>): void {
    const cloned = deepClone(this.after);
    Object.assign(timeline, cloned);
  }

  undo(timeline: WritableDraft<Timeline>): void {
    const cloned = deepClone(this.before);
    Object.assign(timeline, cloned);
  }
}
