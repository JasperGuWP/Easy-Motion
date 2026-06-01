import { useEffect, useCallback } from 'react';
import { useTimelineStore } from '../stores/timelineStore';

function isTypingElement(): boolean {
  const activeElement = document.activeElement;
  if (!activeElement) return false;

  const tagName = activeElement.tagName.toLowerCase();
  if (tagName === 'input' || tagName === 'textarea') return true;

  if (activeElement.getAttribute('contenteditable') === 'true') return true;

  return false;
}

export function useKeyboardShortcuts() {
  const play = useTimelineStore((s) => s.play);
  const pause = useTimelineStore((s) => s.pause);
  const isPlaying = useTimelineStore((s) => s.isPlaying);
  const stepForward = useTimelineStore((s) => s.stepForward);
  const stepBackward = useTimelineStore((s) => s.stepBackward);
  const undo = useTimelineStore((s) => s.undo);
  const redo = useTimelineStore((s) => s.redo);
  const zoomIn = useTimelineStore((s) => s.zoomIn);
  const zoomOut = useTimelineStore((s) => s.zoomOut);
  const removeSelectedClip = useTimelineStore((s) => s.removeSelectedClip);
  const splitClip = useTimelineStore((s) => s.splitClip);
  const selectedClipId = useTimelineStore((s) => s.selectedClipId);
  const currentFrame = useTimelineStore((s) => s.currentFrame);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isTypingElement()) return;

      const isMac = navigator.platform.toLowerCase().includes('mac');
      const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

      // Space → toggle play/pause
      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          pause();
        } else {
          play();
        }
        return;
      }

      // ArrowLeft → step backward 1 frame
      if (e.code === 'ArrowLeft' && !ctrlOrCmd && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        stepBackward(1);
        return;
      }

      // ArrowRight → step forward 1 frame
      if (e.code === 'ArrowRight' && !ctrlOrCmd && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        stepForward(1);
        return;
      }

      // Delete / Backspace → remove selected clip
      if (e.code === 'Delete' || e.code === 'Backspace') {
        if (ctrlOrCmd || e.shiftKey || e.altKey) return;
        e.preventDefault();
        removeSelectedClip();
        return;
      }

      // Ctrl+Z / Cmd+Z → undo
      if (ctrlOrCmd && !e.shiftKey && e.code === 'KeyZ') {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl+Shift+Z / Cmd+Shift+Z → redo
      if (ctrlOrCmd && e.shiftKey && e.code === 'KeyZ') {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl+Y / Cmd+Y → redo (Windows/Linux only, not macOS)
      if (ctrlOrCmd && !isMac && e.code === 'KeyY') {
        e.preventDefault();
        redo();
        return;
      }

      // Ctrl+= / Cmd+= → zoom in
      if (ctrlOrCmd && (e.code === 'Equal' || e.code === 'NumpadAdd' || e.key === '+' || e.key === '=')) {
        e.preventDefault();
        zoomIn();
        return;
      }

      // Ctrl+- / Cmd+- → zoom out
      if (ctrlOrCmd && (e.code === 'Minus' || e.code === 'NumpadSubtract' || e.key === '-' || e.key === '_')) {
        e.preventDefault();
        zoomOut();
        return;
      }

      // S → split selected clip at playhead position
      if (e.code === 'KeyS' && !ctrlOrCmd && !e.shiftKey && !e.altKey) {
        e.preventDefault();
        if (selectedClipId) {
          splitClip(selectedClipId, currentFrame);
        }
        return;
      }
    },
    [
      isPlaying,
      play,
      pause,
      stepForward,
      stepBackward,
      undo,
      redo,
      zoomIn,
      zoomOut,
      removeSelectedClip,
      splitClip,
      selectedClipId,
      currentFrame,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
