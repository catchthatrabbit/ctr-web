import useControls from "./controls";
import { MapChart } from "@site/src/components/Organisms/MapChart";
import {
  Locations,
  MapPin,
} from "@site/src/components/Molecules/InsideChart/Locations";
import { MapButton } from "@site/src/components/Molecules/InsideChart/MapButton";
import { Text } from "@site/src/components/Atoms/Text";
import {
  Mouse,
  MouseContent,
} from "@site/src/components/Molecules/InsideChart/Mouse";
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
    SLoganSecondary,
    sLoganPrimary,
    effectsShowActionIcons,
    effectsShowLocation,
  } = useControls();

  return (
    <>
      {/* <Spacer variant="xxxl" /> */}
      <MapChart infoItems={infoBoxMapData} isLoading={isLoadingMapChart}>
        <div
          className={clsx([
            "grid xl-grid-col--2 lg-grid-col--5 md-grid-row--2 sm-grid-row--2 xs-grid-row--2",
            styles.directionRtl,
            styles.fullWidth,
          ])}
        >
          <div
            className={clsx([
              styles.mapChartLocationPlace,

              "lg-grid-span-col--4",
              styles.directionLtr,
            ])}
          >
            {isLoadingMapChart ? (
              <div className={styles.loadingSkeleton}>
                <LoadingPlaceholder className={styles.loadingPlaceholder} />
              </div>
            ) : (
              <>
                <Locations>
                  <span className="lg-hide md-hide" />
                  {effectsShowLocation && (
                    <>
                      {/* <MapPin
                        className="lg-grid-span-col--2 md-grid-span-col--3"
                        mapButton={
                          <MapButton
                            value="US location"
                            href={
                              effectsShowActionIcons && usStarMiningPoolLocation
                            }
                          />
                        }
                      /> */}
                      {/* <span className="lg-hide" />
                      <MapPin
                        className="xl-grid-span-col--2 lg-grid-span-col--2 md-grid-span-col--3 sm-grid-span-col--6"
                        mapButton={
                          <MapButton
                            value="EU location"
                            href={
                              effectsShowActionIcons && euStarMiningPoolLocation
                            }
                          />
                        }
                      />
                      <span className="lg-hide md-hide" /> */}
                      {/* <MapPin
                        className="lg-grid-span-col--2 md-grid-span-col--2"
                        mapButton={
                          <MapButton
                            value="AP location"
                            href={
                              effectsShowActionIcons && asStarMiningPoolLocation
                            }
                          />
                        }
                      /> */}
                    </>
                  )}
                </Locations>
                <Mouse>
                  <MouseContent />
                </Mouse>
              </>
            )}
          </div>
          {/* <Spacer className="xl-hide lg-hide" variant="lg" /> */}
          <div
            className={clsx([
              styles.directionLtr,
              "xs-text-center sm-text-center md-text-center",
            ])}
          >
            <MainPageSearch />
            <Spacer variant="sm" />
            <Text
              variant="heading"
              weight="extraBold"
              lineHeight="largeLineHeight"
              color="dashboardColor"
              style={{ width: "43rem", display: "inline-block" }}
            >
              {sLoganPrimary}
            </Text>
            <Spacer variant="sm" />
            <Text color="subheadingColor" variant="subheading1">
              {SLoganSecondary}
            </Text>
            <br />
            <Spacer variant="xxl" />
            <Search onSearch={onSetWalletAddress} />
          </div>
        </div>
      </MapChart>
      <Spacer variant="xxxl" />
      <Spacer variant="xxxl" />
      <StartPanel />
      <Spacer variant="md" />
      <Header
        layout={{ boards: false, dropdown: false, search: true }}
        onSearch={onSetWalletAddress}
      />
      <Spacer variant="xxs" />
      <StatsChart
        isLoading={isLoadingRadialBarChart}
        infoItems={infoBoxRadialData}
        radialBarChart={
          <RadialBarChart emptyComponent={<Empty />} data={radialChartData} />
        }
      />
      <Spacer variant="xxxl" />
      <Spacer variant="xxxl" />
      <RecentBlocksTitle />
      <Spacer variant="xl" />

      <List
        dataTableColumns={recentMatureBlockListColumns}
        hidePagination={false}
        isLoading={isLoadingAllRegionMaturedBlocks}
        data={convertMaturedResponseToRecentBlocksInfo(AllRegionsMaturedBlocks)}
      />
      <Spacer variant="xxxl" />
      <Spacer variant="xl" />

      <StartMining />
    </>
  );
};

export default Dashboard;
