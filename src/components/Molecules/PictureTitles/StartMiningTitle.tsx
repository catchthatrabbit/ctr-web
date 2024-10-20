import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { Dive } from "@site/src/icons";

const StartMiningTitle = () => {
  return (
    <PictureTitle
      title="Start mining"
      image={<Dive />}
      secondaryText="Let's jump into it"
    />
  );
};

export default StartMiningTitle;
