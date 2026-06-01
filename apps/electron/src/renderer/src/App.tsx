import React, { useEffect } from 'react';
import { PreviewPanel } from './components/preview/PreviewPanel';
import { TimelinePanel } from './components/timeline/TimelinePanel';
import { useTimelineStore } from './stores/timelineStore';
import { usePreviewStore } from './stores/previewStore';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const App: React.FC = () => {
  useKeyboardShortcuts();

  const previewFrame = usePreviewStore((s) => s.currentFrame);
  const timelineSeekTo = useTimelineStore((s) => s.seekTo);

  useEffect(() => {
    timelineSeekTo(previewFrame);
  }, [previewFrame, timelineSeekTo]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#1a1a2e',
        color: '#ffffff',
      }}
    >
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PreviewPanel />
      </div>
      <div style={{ height: '240px', borderTop: '1px solid #2a2a4e' }}>
        <TimelinePanel />
      </div>
    </div>
  );
};

export default App;
