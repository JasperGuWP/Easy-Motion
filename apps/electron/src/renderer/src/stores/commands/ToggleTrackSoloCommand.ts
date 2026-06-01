import type { WritableDraft } from 'immer';
import type { Timeline } from '@easymotion/shared';
import type { Command } from './types';

export class ToggleTrackSoloCommand implements Command {
  readonly type = 'toggleTrackSolo';

  constructor(
    private oldMutedStates: Map<string, boolean>,
    private newMutedStates: Map<string, boolean>
  ) {}

  private applyMutedStates(timeline: WritableDraft<Timeline>, states: Map<string, boolean>): void {
    for (const [trackId, muted] of states) {
      const track = timeline.tracks.find((t) => t.id === trackId);
      if (track) {
        track.muted = muted;
      }
    }
  }

  execute(timeline: WritableDraft<Timeline>): void {
    this.applyMutedStates(timeline, this.newMutedStates);
  }

  undo(timeline: WritableDraft<Timeline>): void {
    this.applyMutedStates(timeline, this.oldMutedStates);
  }
}