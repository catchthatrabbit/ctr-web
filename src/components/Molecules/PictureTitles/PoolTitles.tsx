import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { Dive } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const PoolTitle = () => {
  const { mobile } = useMediaQueries();

  return (
    <PictureTitle
      title="Pools"
      titleStyles={{ fontWeight: '800', fontFamily: 'Exo' }}
      secondaryText="CTR has a global network of mining pools to choose from"
      secondaryTextStyle={{
        fontSize: 'var(--regular-font-size)',
        textWrap: 'nowrap',
      }}
      image={<Dive />}
    />
  );
};

export default PoolTitle;
