import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { HeadAndNeckAbove } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const GetStarted = () => {
  const { mobile } = useMediaQueries();

  const titleStyles = {
    fontWeight: '800',
    fontFamily: 'Exo',
    ...(mobile && { fontSize: 'var(--large-font-size)' }),
  };

  return (
    <PictureTitle
      title="Start mining"
      titleStyles={titleStyles}
      disableMobileStyles={true}
      image={<HeadAndNeckAbove />}
    />
  );
};

export default GetStarted;
