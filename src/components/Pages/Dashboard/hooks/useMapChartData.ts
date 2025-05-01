import { POOL_NAME_ENUM } from '@site/src/enums/poolName.enum';
import { useFetchSettings } from '@site/src/hooks/useSettings';
import { useFetchStats } from '@site/src/hooks/useStats';
import {
  aggregateNumbers,
  convertPoolChartDataToMapChartInfoBox,
  reduceList,
} from '../utils';
import { WHITELIST_AGGREGATE_KEYS } from '@site/src/configs/aggregate-keys.config';
import { STATS_RESPONSE } from '@site/src/Api/stats/types';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';

const useMapChartData = () => {
  const { siteConfig } = useDocusaurusContext();

  const { data: statsResponse, isLoading } = useFetchStats({
    urls: siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
    apiPath: String(siteConfig.customFields.API_PATH),
  });

  const { data: settingsResponse } = useFetchSettings(POOL_NAME_ENUM.DE);

  const aggregator = aggregateNumbers(WHITELIST_AGGREGATE_KEYS.home.jumbotron);

  let stats: STATS_RESPONSE = null;

  if (statsResponse?.length > 0) stats = reduceList(statsResponse, aggregator);
  return {
    ...convertPoolChartDataToMapChartInfoBox(stats, settingsResponse),
    isLoading,
  };
};

export default useMapChartData;
