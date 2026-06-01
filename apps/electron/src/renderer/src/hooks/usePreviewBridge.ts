import { useCallback, useEffect } from 'react';
import type { PreviewCommand, PreviewEvent } from '@easymotion/shared';
import { usePreviewStore } from '../stores/previewStore';

export function usePreviewBridge(iframeRef: React.RefObject<HTMLIFrameElement | null>) {
  const setReady = usePreviewStore((s) => s.setReady);
  const setPlaying = usePreviewStore((s) => s.setPlaying);
  const setCurrentFrame = usePreviewStore((s) => s.setCurrentFrame);
  const setError = usePreviewStore((s) => s.setError);
  const setCompositionMeta = usePreviewStore((s) => s.setCompositionMeta);

  // Send command to iframe
  const sendCommand = useCallback(
    (command: PreviewCommand) => {
      const iframe = iframeRef.current;
      if (!iframe?.contentWindow) return;
      iframe.contentWindow.postMessage(command, '*');
    },
    [iframeRef]
  );

  // Listen for events from iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      // Validate source is our iframe
      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = event.data as PreviewEvent;
      if (!data?.type?.startsWith('preview:')) return;

      switch (data.type) {
        case 'preview:ready':
          // iframe is ready to receive commands
          break;
        case 'preview:frameUpdate':
          setCurrentFrame(data.frame);
          break;
        case 'preview:play':
          setPlaying(true);
          break;
        case 'preview:pause':
          setPlaying(false);
          break;
        case 'preview:ended':
          setPlaying(false);
          break;
        case 'preview:error':
          setError(data.error);
          break;
        case 'preview:compositionLoaded':
          setCompositionMeta(data.meta);
          break;
      }
    };

    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [iframeRef, setReady, setPlaying, setCurrentFrame, setError, setCompositionMeta]);

  return { sendCommand };
}
