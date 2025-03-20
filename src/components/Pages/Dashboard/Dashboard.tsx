import React from 'react';
import useControls from "./controls";
import { MapChart } from "@site/src/components/Organisms/MapChart";
import {
  Locations,
} from "@site/src/components/Molecules/InsideChart/Locations";
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
    asStarMiningPoolLocation,
    euStarMiningPoolLocation,
    usStarMiningPoolLocation,
    poolFee,
    infoBoxRadialData,
    radialChartData,
    recentMatureBlockListColumns,
    AllRegionsMaturedBlocks,
    isLoadingMapChart,
    isLoadingRadialBarChart,
    isLoadingAllRegionMaturedBlocks,
    SLoganSecondary, // TODO: eh?
    sLoganPrimary,
    effectsShowActionIcons,
    effectsShowLocation,
  } = useControls();

  const { mobile, tablet, desktop } = useMediaQueries();

  return (
    <>
      <MapChart infoItems={infoBoxMapData} isLoading={isLoadingMapChart}>
        <div
          className={clsx([
            mobile || tablet ? "" : "lg-grid-col--5  xl-grid-col--2",
            "grid md-grid-row--2 sm-grid-row--2 xs-grid-row--2",
            styles.directionRtl,
          ])}
        >
          {mobile ? (
            <>
              <div
                className={clsx([
                  styles.directionLtr,
                  "text-center",
                ])}
              >
                <MainPageSearch flexStart={false} />
                <Spacer variant="xs" />
                <Text
                  variant="headingMobile"
                  weight="extraBold"
                  lineHeight="normalLineHeight"
                  color="dashboardColor"
                  style={{ textAlign: "center" }}
                >
                  {sLoganPrimary}
                </Text>
                <Spacer variant="sm" />
              </div>
              <Spacer variant="sm" />
              <Locations />
              <Spacer variant="xs" />
              <Search onSearch={onSetWalletAddress} />
            </>
          ) : (
            <>
              <div
                className={clsx([
                  styles.mapChartLocationPlace,
                  "grid-span-col--4",
                  styles.directionLtr,
                ])}
              >
                {isLoadingMapChart ? (
                  <div className={styles.loadingSkeleton}>
                    <LoadingPlaceholder className={styles.loadingPlaceholder} />
                  </div>
                ) : (
                  <>
                    <Locations />
                  </>
                )}
              </div>
              <div
                className={clsx([
                  styles.directionLtr,
                  "grid-col--6 text-left",
                ])}
              >
                <MainPageSearch flexStart={true} />
                <Spacer variant="sm" />
                <Text
                  variant="heading"
                  weight="extraBold"
                  lineHeight="largeLineHeight"
                  color="dashboardColor"
                >
                  {sLoganPrimary}
                </Text>
                <Spacer variant="sm" />
                <Text
                  color="subheadingColor"
                  variant="subheading1"
                  lineHeight="normalLineHeight"
                  letterSpacing="letterSpacing"
                >
                  {SLoganSecondary}
                </Text>
                <Spacer variant="xxl" />
                <Search onSearch={onSetWalletAddress} />
              </div>
            </>
          )}
        </div>
      </MapChart>
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <StartPanel />
      <Spacer variant="md" />
      <Header
        layout={{ boards: false, dropdown: false, search: true }}
        onSearch={onSetWalletAddress}
      />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <StatsChart
        isLoading={isLoadingRadialBarChart}
        infoItems={infoBoxRadialData}
        radialBarChart={
          <RadialBarChart emptyComponent={<Empty />} data={radialChartData} />
        }
      />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <RecentBlocksTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <List
        dataTableColumns={recentMatureBlockListColumns}
        hidePagination={false}
        isLoading={isLoadingAllRegionMaturedBlocks}
        data={convertMaturedResponseToRecentBlocksInfo(AllRegionsMaturedBlocks)}
      />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <StartMining />
    </>
  );
};

export default Dashboard;
