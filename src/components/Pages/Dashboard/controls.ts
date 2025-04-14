import { useMemo } from "react";
import usePageControls from "@site/src/hooks/usePageControls";
import useRadialBarChartData from "./hooks/useRadialBarChartData";
import { useFetchAllRegionsMaturedBlocks } from "@site/src/hooks/useBlocks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  AS_START_MINING_POOL_LOCATION,
  EU_START_MINING_POOL_LOCATION,
  BR_START_MINING_POOL_LOCATION,
} from "@site/src/configs/start-minings.config";
import { IDataTable } from "@site/src/components/Atoms/DataTable/types";
import {
  POOLS_API_CONFIG_TYPE,
  URLS_CONFIG_TYPE,
} from "@site/src/configs/types";

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();

  const { infoBoxMapData, isLoadingMapChart, poolFee } = usePageControls({
    defaultRegion: "DE",
    includeInfoBox: true,
  });
  const {
    chart: radialChartData,
    infoBox: infoBoxRadialData,
    isLoading: isLoadingRadialBarChart,
  } = useRadialBarChartData();

  const {
    data: AllRegionsMaturedBlocks,
    isLoading: isLoadingAllRegionMaturedBlocks,
  } = useFetchAllRegionsMaturedBlocks({
    urls: siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
    apiPath: String(siteConfig.customFields.API_PATH),
  });

  const urlsConfigs = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;
  const dataTableColumns = useMemo(
    () => [
      {
        value: "height",
        label: "Height",
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS_URL,
      },
      { value: "type", label: "Type" },
      { value: "minedOn", label: "Found at" },
      {
        canBeCopied: true,
        value: "blockHash",
        label: "Block hash",
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS_URL,
      },
      { value: "reward", label: "Reward" },
      { value: "variance", label: "Variance" },
    ],
    [urlsConfigs.BLOCK_DETAILS_URL],
  ) as IDataTable["columns"];

  const sLoganPrimary: string = String(siteConfig.customFields.SLOGAN_PRIMARY);
  const SLoganSecondary: string = String(
    siteConfig.customFields.SLOGAN_SECONDARY,
  );
  const effectsShowLocation: boolean =
    siteConfig.customFields.EFFECTS_SHOW_LOCATIONS === "true";
  const effectsShowActionIcons: boolean =
    siteConfig.customFields.EFFECTS_SHOW_ACTION_ICONS === "true";

  return {
    radialChartData,
    infoBoxRadialData,
    infoBoxMapData,
    poolFee,
    usStarMiningPoolLocation: (siteConfig.customFields
      .BR_START_MINING_POOL_LOCATION ||
      BR_START_MINING_POOL_LOCATION) as string,
    euStarMiningPoolLocation: (siteConfig.customFields
      .EU_START_MINING_POOL_LOCATION ||
      EU_START_MINING_POOL_LOCATION) as string,
    asStarMiningPoolLocation: (siteConfig.customFields
      .AS_START_MINING_POOL_LOCATION ||
      AS_START_MINING_POOL_LOCATION) as string,
    AllRegionsMaturedBlocks,
    recentMatureBlockListColumns: dataTableColumns,
    isLoadingRadialBarChart,
    isLoadingMapChart,
    isLoadingAllRegionMaturedBlocks,
    effectsShowLocation,
    effectsShowActionIcons,
    sLoganPrimary,
    SLoganSecondary,
  };
};

export default useControls;
