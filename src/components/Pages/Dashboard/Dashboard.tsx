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

import styles from "./styles.module.css";

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
      <Spacer variant="xxxl" />
      <MapChart infoItems={infoBoxMapData} isLoading={isLoadingMapChart}>
        <div
          className={clsx([
            "grid xl-grid-col--5 lg-grid-col--5 md-grid-row--2 sm-grid-row--2 xs-grid-row--2",
            styles.directionRtl,
            styles.fullWidth,
          ])}
        >
          <div
            className={clsx([
              styles.mapChartLocationPlace,
              "xl-grid-span-col--4",
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
                      <MapPin
                        className="lg-grid-span-col--2 md-grid-span-col--3"
                        mapButton={
                          <MapButton
                            value="US location"
                            href={
                              effectsShowActionIcons && usStarMiningPoolLocation
                            }
                          />
                        }
                      />
                      <span className="lg-hide" />
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
                      <span className="lg-hide md-hide" />
                      <MapPin
                        className="lg-grid-span-col--2 md-grid-span-col--2"
                        mapButton={
                          <MapButton
                            value="AP location"
                            href={
                              effectsShowActionIcons && asStarMiningPoolLocation
                            }
                          />
                        }
                      />
                    </>
                  )}
                </Locations>
                <Mouse>
                  <MouseContent />
                </Mouse>
              </>
            )}
          </div>
          <Spacer className="xl-hide lg-hide" variant="lg" />
          <div
            className={clsx([
              styles.directionLtr,
              "xs-text-center sm-text-center md-text-center",
            ])}
          >
            <Spacer variant="lg" className="xl-hide lg-hide md-hide" />
            <Text variant="subheading">{sLoganPrimary}</Text>
            <br />
            <Text variant="body" color="gray" type="label">
              {SLoganSecondary}
            </Text>
            <br />
            <Text variant="body" color="primary" type="value">
              Pay-per-last-N-shares &nbsp;&nbsp;
            </Text>
            <Text variant="body" color="gray" type="value">
              (PPLNS)&nbsp;
            </Text>
            <Text variant="body" color="gray" type="value">
              system with only&nbsp;
            </Text>
            <Text variant="body" color="primary" type="value">
              {poolFee ? `${poolFee}% fee` : "-"}
            </Text>
            <br />
            <Text variant="body" color="gray" type="value">
              Please, select one of the locations to&nbsp;
            </Text>
            <a href="/start-mining">
              <Text variant="body" color="primary" type="value">
                start your mining today
              </Text>
            </a>
          </div>
        </div>
      </MapChart>
      <Spacer variant="xl" />
      <Header
        layout={{ boards: false, dropdown: false, search: true }}
        onSearch={onSetWalletAddress}
      />
      <Spacer variant="xl" />
      <StatsChart
        isLoading={isLoadingRadialBarChart}
        infoItems={infoBoxRadialData}
        radialBarChart={
          <RadialBarChart emptyComponent={<Empty />} data={radialChartData} />
        }
      />
      <Spacer variant="xl" />
      <RecentBlocksTitle />
      <Spacer variant="xl" />
      <List
        dataTableColumns={recentMatureBlockListColumns}
        hidePagination
        isLoading={isLoadingAllRegionMaturedBlocks}
        data={convertMaturedResponseToRecentBlocksInfo(AllRegionsMaturedBlocks)}
      />
      <Spacer variant="xxl" />
      <StartMining />
    </>
  );
};

export default Dashboard;
