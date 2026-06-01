import type { Command } from './types';

/**
 * Manages the undo/redo stack for timeline commands.
 * Lives outside Zustand state (module-level singleton) to avoid
 * storing command objects in Immer-managed state.
 */
export class CommandHistory {
  private past: Command[] = [];
  private future: Command[] = [];
  private maxSteps: number;

  constructor(maxSteps: number) {
    this.maxSteps = maxSteps;
  }

  /**
   * Push a new command onto the undo stack.
   * Clears the redo stack (new branch).
   */
  push(command: Command): void {
    this.past.push(command);
    if (this.past.length > this.maxSteps) {
      this.past.shift();
    }
    this.future = [];
  }

  /**
   * Pop the most recent command from the undo stack.
   * The caller is responsible for executing command.undo() and pushing
   * it to the redo stack via pushRedo().
   */
  popUndo(): Command | undefined {
    return this.past.pop();
  }

  /**
   * Pop the most recent command from the redo stack.
   * The caller is responsible for executing command.execute() and pushing
   * it back to the undo stack via push().
   */
  popRedo(): Command | undefined {
    return this.future.pop();
  }

  /**
   * Push a command onto the redo stack (used after undo).
   */
  pushRedo(command: Command): void {
    this.future.push(command);
  }

  /**
   * Push a command onto the undo stack WITHOUT clearing the redo stack.
   * Used by redo() to move commands back from redo to undo.
   */
  pushToPast(command: Command): void {
    this.past.push(command);
    if (this.past.length > this.maxSteps) {
      this.past.shift();
    }
  }

  canUndo(): boolean {
    return this.past.length > 0;
  }

  canRedo(): boolean {
    return this.future.length > 0;
  }

  clear(): void {
    this.past = [];
    this.future = [];
  }

  getPastCount(): number {
    return this.past.length;
  }

  getFutureCount(): number {
    return this.future.length;
  }
}
