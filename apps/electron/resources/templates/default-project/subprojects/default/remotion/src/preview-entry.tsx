import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player, type PlayerRef } from "@remotion/player";
import { MainSequence } from "./components/MainSequence";
import previewConfig from "./preview-config.json";

const CHANNEL = "easymotion-preview";

const PreviewApp: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.channel !== CHANNEL) return;
      const player = playerRef.current;
      if (!player) return;

      if (data.type === "PLAY") player.play();
      if (data.type === "PAUSE") player.pause();
      if (data.type === "SEEK" && typeof data.frame === "number") {
        player.seekTo(data.frame);
      }
    };

    window.addEventListener("message", onMessage);
    window.parent.postMessage({ channel: CHANNEL, type: "READY" }, "*");
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Player
        ref={playerRef}
        component={MainSequence}
        durationInFrames={previewConfig.durationInFrames}
        fps={previewConfig.fps}
        compositionWidth={previewConfig.width}
        compositionHeight={previewConfig.height}
        style={{ width: "100%", maxHeight: "100%" }}
        controls={false}
        loop
        acknowledgeRemotionLicense
        inputProps={{}}
        onFrameUpdate={(frame) => {
          window.parent.postMessage(
            { channel: CHANNEL, type: "FRAME_CHANGE", frame },
            "*"
          );
        }}
      />
    </div>
  );
};

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(<PreviewApp />);
}
