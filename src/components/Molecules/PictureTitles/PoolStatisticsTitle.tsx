import React from 'react';
import PictureTitle from '@site/src/components/Atoms/PictureTitle/PictureTitle';
import { RabbitPoolStatistics } from '@site/src/icons';

const PoolStatisticsTitle = () => {
  return (
    <PictureTitle
      title="Pool statistics"
      image={<RabbitPoolStatistics />}
      secondaryText="Explore the work behind blockchain mining"
    />
  );
};

export default PoolStatisticsTitle;
