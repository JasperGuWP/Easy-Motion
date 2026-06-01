import React from 'react';
import { usePreviewStore } from '../../stores/previewStore';

export const PreviewPlaceholder: React.FC = () => {
  const serverStatus = usePreviewStore((s) => s.serverStatus);

  let message = 'Open a project to preview';
  if (serverStatus === 'starting') {
    message = 'Starting preview server...';
  } else if (serverStatus === 'installing') {
    message = 'Installing dependencies...';
  } else if (serverStatus === 'error') {
    message = 'Preview server error';
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#1a1a2e',
        color: '#888',
        fontSize: '14px',
      }}
    >
      {message}
    </div>
  );
};
