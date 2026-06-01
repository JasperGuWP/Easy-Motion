import type { WritableDraft } from 'immer';
import type { Timeline } from '@easymotion/shared';

/**
 * Command Pattern interface for timeline operations.
 * Each command knows how to execute and undo itself on a Timeline draft.
 */
export interface Command {
  readonly type: string;
  execute(timeline: WritableDraft<Timeline>): void;
  undo(timeline: WritableDraft<Timeline>): void;
}
