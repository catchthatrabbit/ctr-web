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
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { StartMining } from "@site/src/components/Organisms/StartMining";

import { Empty } from "@site/src/components/Atoms/Empty";
import { Search } from "../../Molecules/Search";
import styles from "./styles.module.css";

import MainPageSearch from "@site/src/components/Molecules/PictureTitles/MainPageSearch";
import { StartPanel } from "../../Molecules/StartPanel";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

interface IDashboard extends IAnyPageAndWallet {}

const Dashboard = ({ onSetWalletAddress }: IDashboard) => {
  const {
    infoBoxMapData,
    isLoadingMapChart,
    sLoganPrimary,
    SLoganSecondary,
    infoBoxRadialData,
    radialChartData,
    recentMatureBlockListColumns,
    AllRegionsMaturedBlocks,
    isLoadingRadialBarChart,
    isLoadingAllRegionMaturedBlocks,
  } = useControls();

  const { mobile, tablet, desktop } = useMediaQueries();

  // Helper function to render the search component
  const renderSearch = () => <Search onSearch={onSetWalletAddress} />;

  // Helper function to render the map chart section
  const renderMapChartSection = () => (
    <MapChart infoItems={infoBoxMapData} isLoading={isLoadingMapChart}>
      <div
        className={clsx([
          "grid",
          styles.directionRtl,
          mobile || tablet ? "xs-grid-col--12" : "xl-grid-template-columns",
        ])}
      >
        {mobile ? (
          <>
            <Spacer variant="sm" />
            <div className="xs-grid-col--12">
              <DashboardImage />
            </div>
            {desktop ? <Spacer variant="xs" /> : <Spacer variant="xxs" />}
            <div className="xs-grid-col--12">{renderSearch()}</div>
          </>
        ) : (
          <>
            <div
              className={clsx([
                "xl-grid-col--6",
                styles.mapChartLocationPlace,
                styles.directionLtr,
              ])}
            >
              {isLoadingMapChart ? null : <DashboardImage />}
            </div>
            <div
              className={clsx([
                "xl-grid-col--6",
                styles.directionLtr,
                "text-left",
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
                {sLoganPrimary}
              </Text>
              <Spacer variant="xxs" />
              <Text
                color="subheadingColor"
                variant="subheading1"
                letterSpacing="letterSpacing"
              >
                {SLoganSecondary}
              </Text>
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
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xxxl" />}
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
          AllRegionsMaturedBlocks || [],
        )}
      />
      {desktop ? <Spacer variant="xl" /> : <Spacer variant="xxxl" />}
      <StartMining />
      {desktop ? null : <Spacer variant="sm" />}
    </>
  );
};

export default Dashboard;
