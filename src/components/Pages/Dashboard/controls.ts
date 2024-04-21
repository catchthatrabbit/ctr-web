import useRadialBarChartData from "./hooks/useRadialBarChartData";
import useMapChartData from "./hooks/useMapChartData";
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  AS_START_MINING_POOL_LOCATION,
  EU_START_MINING_POOL_LOCATION,
  US_START_MINING_POOL_LOCATION,
} from "@site/src/configs/start-minings.config";
import { useFetchAllRegionsMaturedBlocks } from "@site/src/hooks/useBlocks";
import { useMemo } from "react";
import { EXTERNAL_URL } from "@site/src/constants/links";
import { EXTERNAL_URL_ENUM } from "@site/src/enums/externalUrls.enum";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();

  const {
    chart: radialChartData,
    infoBox: infoBoxRadialData,
    isLoading: isLoadingRadialBarChart,
  } = useRadialBarChartData();

  const {
    infoBoxItems: infoBoxMapData,
    poolFee,
    isLoading: isLoadingMapChart,
  } = useMapChartData();

  const {
    data: AllRegionsMaturedBlocks,
    isLoading: isLoadingAllRegionMaturedBlocks,
  } = useFetchAllRegionsMaturedBlocks();

  const dataTableColumns = useMemo(
    () => [
      {
        value: "height",
        label: "Height",
        isPrimary: true,
        alignToCenter: true,
        href: String(
          siteConfig.customFields.BLOCK_DETAILS_URL ||
            EXTERNAL_URL[EXTERNAL_URL_ENUM.BLOCK_DETAILS],
        ),
      },
      { value: "type", label: "Type", alignToCenter: true },
      { value: "minedOn", label: "Mined on" },
      {
        value: "blockHash",
        label: "Block hash",
        isPrimary: true,
        href: String(
          siteConfig.customFields.TRANSACTION_DETAILS_URL ||
            EXTERNAL_URL[EXTERNAL_URL_ENUM.BLOCK_DETAILS],
        ),
      },
      { value: "reward", label: "Reward", alignToCenter: true },
      { value: "variance", label: "Variance", alignToCenter: true },
    ],
    [
      siteConfig.customFields.BLOCK_DETAILS_URL,
      siteConfig.customFields.TRANSACTION_DETAILS_URL,
    ],
  );

  return {
    radialChartData,
    infoBoxRadialData,
    infoBoxMapData,
    poolFee,
    usStarMiningPoolLocation: (siteConfig.customFields
      .US_START_MINING_POOL_LOCATION ||
      US_START_MINING_POOL_LOCATION) as string,
    euStarMiningPoolLocation: (siteConfig.customFields
      .EU_START_MINING_POOL_LOCATION ||
      EU_START_MINING_POOL_LOCATION) as string,
    asStarMiningPoolLocation: (siteConfig.customFields
      .AS_START_MINING_POOL_LOCATION ||
      AS_START_MINING_POOL_LOCATION) as string,
    estd:
      siteConfig.customFields.estd !== "" &&
      siteConfig.customFields.estd !== undefined
        ? siteConfig.customFields.estd
        : new Date().getFullYear().toString(),
    AllRegionsMaturedBlocks,
    recentMatureBlockListColumns: dataTableColumns,
    isLoadingRadialBarChart,
    isLoadingMapChart,
    isLoadingAllRegionMaturedBlocks,
  };
};

export default useControls;
