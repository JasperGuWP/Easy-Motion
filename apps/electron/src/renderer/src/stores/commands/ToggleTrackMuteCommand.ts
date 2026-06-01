import type { WritableDraft } from 'immer';
import type { Timeline } from '@easymotion/shared';
import type { Command } from './types';

export class ToggleTrackMuteCommand implements Command {
  readonly type = 'toggleTrackMute';

  constructor(
    private trackId: string,
    private oldValue: boolean,
    private newValue: boolean
  ) {}

  execute(timeline: WritableDraft<Timeline>): void {
    const track = timeline.tracks.find((t) => t.id === this.trackId);
    if (track) {
      track.muted = this.newValue;
    }
  }

  undo(timeline: WritableDraft<Timeline>): void {
    const track = timeline.tracks.find((t) => t.id === this.trackId);
    if (track) {
      track.muted = this.oldValue;
    }
  }
}