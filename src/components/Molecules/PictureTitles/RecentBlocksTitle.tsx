import React from 'react';
import PictureTitle from "@site/src/components/Atoms/PictureTitle/PictureTitle";
import { HeadAndNeckAbove } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const RecentBlocksTitle = () => {
  const { desktop } = useMediaQueries();
  const secondaryTextStyle = desktop ? { fontSize: "20px" } : {};

  return (
    <PictureTitle
      title="Recent blocks"
      image={<HeadAndNeckAbove />}
      secondaryText="Core mining pool in the lotusland of Ores"
      secondaryTextStyle={secondaryTextStyle}
    />
  );
};

export default RecentBlocksTitle;
