import React from "react";
import useControls from "./controls";
import { MapChart } from "@site/src/components/Organisms/MapChart";
import { DashboardImage } from "@site/src/components/Molecules/InsideChart/DashboardImage";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { StatsChart } from "@site/src/components/Organisms/StatsChart";
import { RadialBarChart } from "@site/src/components/Organisms/RadialBarChart";
import { RecentBlocksTitle } from "@site/src/components/Molecules/PictureTitles";
import { List } from "@site/src/components/Templates/List";
import { convertMaturedResponseToRecentBlocksInfo } from "./utils";
import { IAnyPageAndWallet } from "../types";
import { Header } from "@site/src/components/Templates/Header";
import { StartMining } from "@site/src/components/Organisms/StartMining";

import { Empty } from '@site/src/components/Atoms/Empty';
import { Search } from '../../Molecules/Search';
import styles from './styles.module.css';

import MainPageSearch from '@site/src/components/Molecules/PictureTitles/MainPageSearch';
import { StartPanel } from '../../Molecules/StartPanel';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

interface IDashboard extends IAnyPageAndWallet {}

const Dashboard = ({ onSetWalletAddress }: IDashboard) => {
  const {
    infoBoxMapData,
    isLoadingMapChart,
    SloganPrimary,
    SloganSecondary,
    infoBoxRadialData,
    radialChartData,
    recentMatureBlockListColumns,
    AllRegionsMaturedBlocks,
    isLoadingRadialBarChart,
    isLoadingAllRegionMaturedBlocks,
    startMiningPoolConfigurations,
  } = useControls();

  const { mobile, tablet, desktop } = useMediaQueries();

  // Helper function to render the search component
  const renderSearch = () => <Search onSearch={onSetWalletAddress} />;

  // Helper function to render the map chart section
  const renderMapChartSection = () => (
    <MapChart infoItems={infoBoxMapData} isLoading={isLoadingMapChart}>
      <div
        className={clsx([
          'grid',
          styles.directionRtl,
          mobile || tablet ? 'xs-grid-col--12' : 'xl-grid-template-columns',
        ])}
      >
        {mobile ? (
          <>
            <div className={clsx(styles.textContainer, "text-center")}>
              <MainPageSearch flexStart={false} />

              <Spacer variant="xxs" />
              <Text
                variant="heading1"
                weight="extraBold"
                color="dashboardColor"
                lineHeight="largeLineHeight"
                disableMobileStyles={true}
              >
                {SloganPrimary}
              </Text>
              <Spacer variant="xl" />
            </div>
            <div>
              <DashboardImage />
            </div>
            <Spacer variant="xxs" />
            <div>{renderSearch()}</div>
          </>
        ) : (
          <>
            <div
              className={clsx([
                'xl-grid-col--6',
                styles.mapChartLocationPlace,
                styles.directionLtr,
              ])}
            >
              {isLoadingMapChart ? null : <DashboardImage />}
            </div>
            <div
              className={clsx([
                'xl-grid-col--6',
                styles.directionLtr,
                'text-left',
              ])}
            >
              <MainPageSearch flexStart={true} />
              <Spacer variant="xxs" />
              <Text
                variant="heading"
                weight="extraBold"
                color="dashboardColor"
                lineHeight="largeLineHeight"
              >
                {SloganPrimary}
              </Text>
              <Spacer variant="xxs" />
              <Text
                color="subheadingColor"
                variant="subheading1"
                letterSpacing="letterSpacing"
              >
                {SloganSecondary}
              </Text>
              <div className={styles.poolDescriptions}>
                <span className={styles.poolDescriptionTitle}>XCB Pools:</span>
                <Text variant="subheading" color="subheadingColor">
                  {Object.values(startMiningPoolConfigurations)
                    .map((pool) => pool.NAME)
                    .join(", ")}
                </Text>
              </div>
              <Spacer variant="xxl" />
              {renderSearch()}
            </div>
          </>
        )}
      </div>
    </MapChart>
  );

  return (
    <>
      {renderMapChartSection()}
      <Spacer variant="xxxl" />
      {desktop && <Spacer variant="xxl" />}
      <StartPanel />
      {desktop ? <Spacer variant="md" /> : null}
      <Header
        layout={{ boards: false, dropdown: false, search: true }}
        onSearch={onSetWalletAddress}
      />
      <StatsChart
        isLoading={isLoadingRadialBarChart}
        infoItems={infoBoxRadialData}
        radialBarChart={
          <RadialBarChart emptyComponent={<Empty />} data={radialChartData} />
        }
      />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <RecentBlocksTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="lg" />}
      <List
        dataTableColumns={recentMatureBlockListColumns}
        hidePagination={false}
        isLoading={isLoadingAllRegionMaturedBlocks}
        data={convertMaturedResponseToRecentBlocksInfo(
          AllRegionsMaturedBlocks || []
        )}
      />
      <Spacer variant="xxxl" />
      <Spacer variant="xs" />

      <div className={styles.horizontalLine}></div>

      {desktop ? <Spacer variant="xl" /> : <Spacer variant="xxxl" />}
      <StartMining />
      {desktop ? null : <Spacer variant="sm" />}
    </>
  );
};

export default Dashboard;
