import usePageControls from '@site/src/hooks/usePageControls';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  POOLS_LIST,
  URLS_CONFIG_TYPE,
} from '@site/src/configs/types';

interface CustomFields {
  DEFAULT_REGION: string;
  URLS: URLS_CONFIG_TYPE;
  POOLS_LIST: POOLS_LIST;
}

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const {
    DEFAULT_REGION,
    URLS: urlsConfig,
    POOLS_LIST: startMiningPoolConfigurations
  } = siteConfig.customFields as unknown as CustomFields;

  const defaultRegion = DEFAULT_REGION?.toString().toUpperCase() || 'DE';

  const { infoBoxMapData, isLoadingMapChart } = usePageControls({
    defaultRegion,
    includeInfoBox: true,
  });

  return {
    startMiningPoolConfigurations,
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export { useControls };
