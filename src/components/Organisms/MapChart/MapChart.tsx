import React from 'react';
import { TextFormatOutputType } from '@site/src/utils/textFormat';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import styles from './styles.module.css';

interface IMapChart {
  infoItems: Array<{ title: string; value: TextFormatOutputType }>;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const MapChart = ({ children, infoItems, isLoading }: IMapChart) => {
  const { mobile, tablet } = useMediaQueries();

  return (
    <div className={styles.mapRoot}>
      {(mobile || tablet) && (
        <>
          <ConfiguredInfoBox infoItems={infoItems} isLoading={isLoading} />
        </>
      )}
      <div
        className={`${styles.dashboardContainer} ${mobile && styles.mobileDashboard}`}
      >
        {children}
      </div>
    </div>
  );
};

export default MapChart;
