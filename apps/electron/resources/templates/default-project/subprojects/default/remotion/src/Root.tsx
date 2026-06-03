import { Composition } from "remotion";
import { MainSequence } from "./components/MainSequence";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={MainSequence}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
