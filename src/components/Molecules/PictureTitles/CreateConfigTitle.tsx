import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { HeadDown } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const CreateConfigTitle = () => {
  const { mobile } = useMediaQueries();
  const titleStyles = {
    fontWeight: "800",
    fontFamily: "Exo",
    textAlign: "center" as const,

    ...(mobile && { fontSize: 'var(--large-font-size)' }),
  };
  return (
    <PictureTitle
      title="Launch Miner"
      image={<HeadDown />}
      titleStyles={titleStyles}
    />
  );
};

export default CreateConfigTitle;
