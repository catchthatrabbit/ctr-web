import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { Dive } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

const SelectPoolTitle = () => {
  const { mobile } = useMediaQueries();

  return (
    <PictureTitle
      title="Select Pool"
      titleStyles={{ fontWeight: '800', fontFamily: 'Exo' }}
      secondaryText="Core ID has been found in multiple locations"
      secondaryTextStyle={{
        fontSize: 'var(--regular-font-size)',
        textWrap: 'nowrap',
      }}
      image={<Dive />}
    />
  );
};

export default SelectPoolTitle;
