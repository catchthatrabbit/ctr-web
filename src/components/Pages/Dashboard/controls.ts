import { useMemo } from 'react';
import usePageControls from '@site/src/hooks/usePageControls';
import useRadialBarChartData from './hooks/useRadialBarChartData';
import { useFetchAllRegionsMaturedBlocks } from '@site/src/hooks/useBlocks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { IDataTable } from '@site/src/components/Atoms/DataTable/types';
import {
  POOLS_API_CONFIG_TYPE,
  URLS_CONFIG_TYPE,
  POOLS_LIST,
} from "@site/src/configs/types";

interface CustomFields {
  DEFAULT_REGION: string;
  API_ENDPOINTS: POOLS_API_CONFIG_TYPE;
  API_PATH: string;
  URLS: URLS_CONFIG_TYPE;
  POOLS_LIST: POOLS_LIST;
  SLOGAN_PRIMARY: string;
  SLOGAN_SECONDARY: string;
  EFFECTS_SHOW_LOCATIONS: string;
  EFFECTS_SHOW_ACTION_ICONS: string;
}

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    DEFAULT_REGION,
    API_ENDPOINTS,
    API_PATH,
    URLS: urlsConfigs,
    POOLS_LIST: startMiningPoolConfigurations,
    SLOGAN_PRIMARY,
    SLOGAN_SECONDARY,
    EFFECTS_SHOW_LOCATIONS,
    EFFECTS_SHOW_ACTION_ICONS
  } = siteConfig.customFields as unknown as CustomFields;

  const defaultRegion = DEFAULT_REGION?.toString().toUpperCase() || 'DE';

  const { infoBoxMapData, isLoadingMapChart, poolFee } = usePageControls({
    defaultRegion,
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
    urls: API_ENDPOINTS,
    apiPath: String(API_PATH),
  });

  const dataTableColumns = useMemo(
    () => [
      {
        value: 'height',
        label: 'Height',
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS,
      },
      { value: 'type', label: 'Type' },
      { value: 'minedOn', label: 'Found at' },
      {
        canBeCopied: true,
        value: 'blockHash',
        label: 'Block hash',
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS,
      },
      { value: 'reward', label: 'Reward' },
      { value: 'variance', label: 'Variance' },
    ],
    [urlsConfigs.BLOCK_DETAILS]
  ) as IDataTable['columns'];

  const effectsShowLocation: boolean = EFFECTS_SHOW_LOCATIONS === 'true';
  const effectsShowActionIcons: boolean = EFFECTS_SHOW_ACTION_ICONS === 'true';

  return {
    radialChartData,
    infoBoxRadialData,
    infoBoxMapData,
    poolFee,
    AllRegionsMaturedBlocks,
    recentMatureBlockListColumns: dataTableColumns,
    isLoadingRadialBarChart,
    isLoadingMapChart,
    isLoadingAllRegionMaturedBlocks,
    effectsShowLocation,
    effectsShowActionIcons,
    SloganPrimary: String(SLOGAN_PRIMARY),
    SloganSecondary: String(SLOGAN_SECONDARY),
    startMiningPoolConfigurations,
  };
};

export default useControls;
