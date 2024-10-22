import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { HeadAndNeckAbove } from "@site/src/icons";

const RecentBlocksTitle = () => {
  return (
    <PictureTitle
      title="Recent blocks"
      image={<HeadAndNeckAbove />}
      secondaryText="Core mining pool in the lotusland of Ores"
      secondaryTextStyle={{ fontSize: "20px" }}
    />
  );
};

export default RecentBlocksTitle;
