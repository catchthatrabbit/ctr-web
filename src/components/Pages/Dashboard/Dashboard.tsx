import React from "react";
import useControls from "./controls";
import { MapChart } from "@site/src/components/Organisms/MapChart";
import { Locations } from "@site/src/components/Molecules/InsideChart/Locations";
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
    infoBoxMapData = [],
    isLoadingMapChart = false,
    sLoganPrimary = "Default Primary Text",
    SLoganSecondary = "Default Secondary Text",
    infoBoxRadialData = [],
    radialChartData = [],
    recentMatureBlockListColumns = [],
    AllRegionsMaturedBlocks = [],
    isLoadingRadialBarChart = false,
    isLoadingAllRegionMaturedBlocks = false,
  } = useControls();

  const { mobile, tablet, desktop } = useMediaQueries();

  return (
    <>
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
              <div
                className={clsx([
                  "xs-grid-col--12",
                  styles.directionLtr,
                  "text-center",
                ])}
              >
                <MainPageSearch flexStart={false} />
                {desktop ? <Spacer variant="xs" /> : null}
                <Text
                  variant="headingMobile"
                  weight="extraBold"
                  lineHeight="largeLineHeight"
                  color="dashboardColor"
                  style={{ textAlign: "center" }}
                >
                  {sLoganPrimary}
                </Text>
                <Spacer variant="sm" />
              </div>
              <Spacer variant="sm" />
              <div className="xs-grid-col--12">
                <Locations />
              </div>
              {desktop ? <Spacer variant="xs" /> : <Spacer variant="xxs" />}
              <div className="xs-grid-col--12">
                <Search onSearch={onSetWalletAddress} />
              </div>
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
                {isLoadingMapChart ? (
                  <div className={styles.loadingSkeleton}>
                    <LoadingPlaceholder className={styles.loadingPlaceholder} />
                  </div>
                ) : (
                  <Locations />
                )}
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
                <Search onSearch={onSetWalletAddress} />
              </div>
            </>
          )}
        </div>
      </MapChart>
      {desktop ? (
        <>
          <Spacer variant="xxl" /> <Spacer variant="xxl" />
        </>
      ) : (
        <Spacer variant="xxxl" />
      )}
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

      {desktop ? (
        <>
          <Spacer variant="xl" />
          <Spacer variant="md" />
        </>
      ) : (
        <>
          <Spacer variant="xl" />
          <Spacer variant="lg" />
        </>
      )}
      <div className={styles.horizontalLine}></div>
      {desktop ? <Spacer variant="xl" /> : <Spacer variant="xxxl" />}
      <StartMining />
      {desktop ? null : <Spacer variant="sm" />}
    </>
  );
};

export default Dashboard;
