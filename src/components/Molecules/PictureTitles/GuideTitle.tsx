import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { HeadAndNeckAbove } from '@site/src/icons';

const GuideTitle = () => {
  return (
    <PictureTitle
      title="How to start mining"
      titleStyles={{ fontWeight: '800', fontFamily: 'Exo' }}
      secondaryText="Step-by-step guide to mining your first XCB"
      secondaryTextStyle={{
        fontSize: 'var(--regular-font-size)',
        marginTop: '0',
      }}
      image={<HeadAndNeckAbove />}
    />
  );
};

export default GuideTitle;
