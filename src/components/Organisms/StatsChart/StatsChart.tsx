import React from 'react';
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { PoolStatisticsTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { InfoBox } from "@site/src/components/Molecules/InsideChart/Info";
import { InfoBoxLoadingSkeleton } from "../../Atoms/InfoBoxLoadingSkeleton";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

import styles from "./styles.module.css";

interface IStatsChart {
  radialBarChart: React.ReactNode;
  infoItems: Array<{ title: string; value: TextFormatOutputType }>;
  isLoading?: boolean;
}

const StatsChart = ({ radialBarChart, infoItems, isLoading }: IStatsChart) => {
  const vertClassName =
    "xl-flex-col--12 lg-flex-col--12 md-flex-col--6 sm-flex-col--12 xs-flex-col--12";
  const radialClassName =
    "xl-flex-col--9 lg-flex-col--9 md-flex-col--12 sm-flex-col--12 xs-flex-col--12";
  const infoBoxClassName =
    "xl-flex-col--3 lg-flex-col--3 md-flex-col--12 sm-flex-col--12 xs-flex-col--12";
  const { mobile, desktop } = useMediaQueries();

  return (
    <div className={styles.statsChart}>
      <PoolStatisticsTitle />
      <Spacer variant="sm" />
      {desktop && <Spacer variant="md" />}

      <div className={styles.flex}>
        {isLoading ? (
          <div className={styles.loadingSkeleton}>
            <LoadingPlaceholder />
          </div>
        ) : (
          radialBarChart
        )}

        <Spacer variant="xxxl" />
        <InfoBox
          dir="column"
          spaceAround={true}
          items={infoItems}
          isLoading={isLoading}
          context="statsChart"
          applyFullWidth={true}
          loadingComponent={
            <InfoBoxLoadingSkeleton
              className={infoBoxClassName}
              boardClassNameHor={vertClassName}
              loadingPlaceholder={<LoadingPlaceholder />}
            />
          }
        />
        <Spacer variant="xxxl" />
      </div>
    </div>
  );
};

export default StatsChart;
