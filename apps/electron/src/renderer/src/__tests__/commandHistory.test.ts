import { describe, it, expect, beforeEach } from 'vitest';
import { CommandHistory } from '../stores/commands/CommandHistory';
import { PatchCommand } from '../stores/commands/PatchCommand';
import type { Command } from '../stores/commands/types';
import type { Timeline } from '@easymotion/shared';
import type { WritableDraft } from 'immer';

function createTestTimeline(name: string): Timeline {
  return {
    id: 'tl-test',
    version: '1.0',
    fps: 30,
    durationInFrames: 300,
    width: 1920,
    height: 1080,
    tracks: [
      {
        id: `track-${name}`,
        name: `Track ${name}`,
        type: 'text',
        order: 0,
        visible: true,
        locked: false,
        clips: [],
      },
    ],
  } as Timeline;
}

class MockCommand implements Command {
  readonly type = 'mock';
  constructor(private id: number) {}

  execute(): void {
    /* no-op for test */
  }
  undo(): void {
    /* no-op for test */
  }

  getId(): number {
    return this.id;
  }
}

describe('CommandHistory', () => {
  let history: CommandHistory;

  beforeEach(() => {
    history = new CommandHistory(5);
  });

  it('starts empty', () => {
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
    expect(history.getPastCount()).toBe(0);
    expect(history.getFutureCount()).toBe(0);
  });

  it('pushes commands and clears future', () => {
    history.push(new MockCommand(1));
    expect(history.canUndo()).toBe(true);
    expect(history.getPastCount()).toBe(1);

    history.push(new MockCommand(2));
    expect(history.getPastCount()).toBe(2);
    expect(history.getFutureCount()).toBe(0);
  });

  it('pops undo and can redo', () => {
    history.push(new MockCommand(1));
    const cmd = history.popUndo();
    expect(cmd).toBeDefined();
    expect(history.canUndo()).toBe(false);
    expect(history.getPastCount()).toBe(0);
  });

  it('supports undo→pushRedo→redo flow', () => {
    const cmd1 = new MockCommand(1);
    history.push(cmd1);

    const popped = history.popUndo()!;
    history.pushRedo(popped);

    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(true);
    expect(history.getFutureCount()).toBe(1);

    const redoCmd = history.popRedo()!;
    history.push(redoCmd);
    expect(history.canUndo()).toBe(true);
    expect(history.canRedo()).toBe(false);
  });

  it('caps past at maxSteps', () => {
    for (let i = 0; i < 10; i++) {
      history.push(new MockCommand(i));
    }
    expect(history.getPastCount()).toBe(5);
  });

  it('clears both stacks', () => {
    history.push(new MockCommand(1));
    history.push(new MockCommand(2));
    history.popUndo();
    history.pushRedo(new MockCommand(3));

    history.clear();
    expect(history.canUndo()).toBe(false);
    expect(history.canRedo()).toBe(false);
    expect(history.getPastCount()).toBe(0);
    expect(history.getFutureCount()).toBe(0);
  });
});

describe('PatchCommand', () => {
  it('execute restores after snapshot', () => {
    const before = createTestTimeline('before');
    const after = createTestTimeline('after');
    after.tracks[0].name = 'Modified Track';

    const cmd = new PatchCommand(before, after);
    const target = createTestTimeline('target');

    cmd.execute(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('Modified Track');
  });

  it('undo restores before snapshot', () => {
    const before = createTestTimeline('before');
    before.tracks[0].name = 'Original Track';
    const after = createTestTimeline('after');
    after.tracks[0].name = 'Modified Track';

    const cmd = new PatchCommand(before, after);
    const target = createTestTimeline('target');
    target.tracks[0].name = 'Current';

    cmd.execute(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('Modified Track');

    cmd.undo(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('Original Track');
  });

  it('roundtrips execute→undo→execute', () => {
    const before = createTestTimeline('before');
    before.tracks[0].name = 'A';
    const after = createTestTimeline('after');
    after.tracks[0].name = 'B';

    const cmd = new PatchCommand(before, after);
    const target = createTestTimeline('target');

    cmd.execute(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('B');

    cmd.undo(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('A');

    cmd.execute(target as WritableDraft<Timeline>);
    expect(target.tracks[0].name).toBe('B');
  });
});
