import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { TailsAbove } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const BlockTitle = () => {
  const { mobile } = useMediaQueries();

  const titleStyles = {
    fontWeight: '800',
    fontFamily: 'Exo',
    marginTop: '10px',
    ...(mobile && { fontSize: 'var(--large-font-size)', marginTop: '8px' }),
  };

  return (
    <PictureTitle
      title="Pool blocks"
      titleStyles={titleStyles}
      image={<TailsAbove />}
    />
  );
};

export default BlockTitle;
