const { getLayerComponent, buildClipProps, renderJsxProps } = require("./utils");

function collectUsedLayers(tracks) {
  const used = new Set();
  for (const track of tracks) {
    if (track.type === "group") continue;
    if (track.clips?.length) used.add(getLayerComponent(track.type));
  }
  return [...used];
}

function flattenClips(tracks) {
  const sortedTracks = [...tracks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const items = [];

  for (const track of sortedTracks) {
    if (!track.visible) continue;
    for (const clip of track.clips ?? []) {
      items.push({ track, clip });
    }
  }

  return items;
}

function generateMainSequence(timeline) {
  const usedLayers = collectUsedLayers(timeline.tracks);
  const imports = usedLayers
    .map((layer) => `import { ${layer} } from "./layers/${layer}";`)
    .join("\n");

  const clipBlocks = flattenClips(timeline.tracks)
    .map(({ track, clip }) => {
      const component = getLayerComponent(track.type);
      const props = buildClipProps(track, clip);
      const propsLiteral = renderJsxProps(props);

      return `      {/* Track: ${track.name} | Clip: ${clip.name} */}
      <Sequence from={${clip.startInFrames}} durationInFrames={${clip.durationInFrames}}>
        <${component}
          ${propsLiteral}
        />
      </Sequence>`;
    })
    .join("\n\n");

  return `import { AbsoluteFill, Sequence } from "remotion";
${imports}

export const MainSequence: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f23" }}>
${clipBlocks || "      {/* empty timeline */}"}
    </AbsoluteFill>
  );
};
`;
}

module.exports = { generateMainSequence };
