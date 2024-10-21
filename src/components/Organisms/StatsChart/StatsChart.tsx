import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { PoolStatisticsTitle } from "@site/src/components/Molecules/PictureTitles";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { InfoBox } from "@site/src/components/Molecules/InsideChart/Info";
import { InfoBoxLoadingSkeleton } from "../../Atoms/InfoBoxLoadingSkeleton";

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

  return (
    <div className={styles.statsChart}>
      <PoolStatisticsTitle />
      <Spacer variant="sm" />
      <Spacer variant="md" />

      <div className={styles.flex}>
        <div className={radialClassName}>
          {isLoading ? (
            <div className={styles.loadingSkeleton}>
              <LoadingPlaceholder />
            </div>
          ) : (
            radialBarChart
          )}
        </div>
        <Spacer variant="xxxl" />
        <InfoBox
          boardClassNameVert={vertClassName}
          className={infoBoxClassName}
          dir="column"
          spaceAround={true}
          items={infoItems}
          isLoading={isLoading}
          context="statsChart"
          loadingComponent={
            <InfoBoxLoadingSkeleton
              className={infoBoxClassName}
              boardClassNameHor={vertClassName}
              loadingPlaceholder={<LoadingPlaceholder />}
            />
          }
        />
      </div>
    </div>
  );
};

export default StatsChart;
