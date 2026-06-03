function generateRoot(timeline) {
  return `import { Composition } from "remotion";
import { MainSequence } from "./components/MainSequence";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={MainSequence}
      durationInFrames={${timeline.durationInFrames}}
      fps={${timeline.fps}}
      width={${timeline.width}}
      height={${timeline.height}}
    />
  );
};
`;
}

module.exports = { generateRoot };
