import React, { useRef, useCallback } from 'react';
import { usePreviewStore } from '../../stores/previewStore';
import { usePreviewBridge } from '../../hooks/usePreviewBridge';
import { PreviewControls } from './PreviewControls';
import { PreviewPlaceholder } from './PreviewPlaceholder';

export const PreviewPanel: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { sendCommand } = usePreviewBridge(iframeRef);

  const previewUrl = usePreviewStore((s) => s.previewUrl);
  const isReady = usePreviewStore((s) => s.isReady);
  const zoom = usePreviewStore((s) => s.zoom);
  const error = usePreviewStore((s) => s.error);
  const compositionWidth = usePreviewStore((s) => s.compositionWidth);
  const compositionHeight = usePreviewStore((s) => s.compositionHeight);

  const handleIframeLoad = useCallback(() => {}, [sendCommand]);

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1a1a2e' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b6b', fontSize: '14px' }}>
          Preview Error: {error}
        </div>
      </div>
    );
  }

  if (!isReady || !previewUrl) {
    return <PreviewPlaceholder />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1a1a2e' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
          }}
        >
          <iframe
            ref={iframeRef}
            src={previewUrl}
            onLoad={handleIframeLoad}
            sandbox="allow-scripts allow-same-origin"
            style={{
              width: compositionWidth || 1920,
              height: compositionHeight || 1080,
              border: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>
      <PreviewControls sendCommand={sendCommand} />
    </div>
  );
};
