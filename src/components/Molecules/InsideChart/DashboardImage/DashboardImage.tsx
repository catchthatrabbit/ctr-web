import clsx from 'clsx';
import React from 'react';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import styles from './styles.module.css';

interface ILocation {
  children?: React.ReactNode;
}

const DashboardImage = ({ children }: ILocation) => {
  const { desktop, mobile } = useMediaQueries();
  return (
    <div className={clsx(styles.locations, { [styles.flexEnd]: desktop })}>
      <img
        src="/img/thatRabbitImg.png"
        className={clsx(styles.bgImage, { [styles.bgImageMobile]: mobile })}
        alt="Rabbit"
      />
    </div>
  );
};

export default DashboardImage;
