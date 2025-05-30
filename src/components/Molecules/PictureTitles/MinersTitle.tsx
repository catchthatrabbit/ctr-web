import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { HeadAbove } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const MinersTitle = () => {
  const { mobile } = useMediaQueries();

  const titleStyles = {
    fontWeight: '800',
    fontFamily: 'Exo',
    marginTop: '15px',
    ...(mobile && { fontSize: 'var(--large-font-size)' }),
  };
  return (
    <PictureTitle
      title="Miners"
      titleStyles={titleStyles}
      image={<HeadAbove />}
    />
  );
};

export default MinersTitle;
