import { useFetchSettings } from '@site/src/hooks/useSettings';
import { useFetchStats } from '@site/src/hooks/useStats';
import {
  aggregateNumbers,
  convertPoolChartDataToMapChartInfoBox,
  reduceList,
} from '../utils';
import { WHITELIST_AGGREGATE_KEYS } from '@site/src/configs/aggregate-keys.config';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useEffect, useState } from 'react';
import { TextFormatOutputType } from '@site/src/utils/textFormat';
import { profitabilityCalculation } from '@site/src/utils/profitabilityCalculation';
import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';

interface CustomFields {
  DEFAULT_REGION: string;
  API_ENDPOINTS: POOLS_API_CONFIG_TYPE;
  API_PATH: string;
}

interface MapChartData {
  poolFee: string | number;
  infoBoxItems: Array<{ title: string; value: TextFormatOutputType }>;
}

const useMapChartData = () => {
  const { siteConfig } = useDocusaurusContext();
  const { 
    DEFAULT_REGION,
    API_ENDPOINTS,
    API_PATH
  } = siteConfig.customFields as unknown as CustomFields;

  const defaultRegion = DEFAULT_REGION?.toString().toUpperCase() || 'DE';

  const [chartData, setChartData] = useState<MapChartData>({
    poolFee: '',
    infoBoxItems: [],
  });

  const { data: statsResponse, isLoading } = useFetchStats({
    urls: API_ENDPOINTS,
    apiPath: String(API_PATH),
  });

  const { data: settingsResponse } = useFetchSettings(defaultRegion);

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) return;

      if (!Array.isArray(statsResponse)) {
        return;
      }

      const validStats = statsResponse.filter(Boolean);

      if (validStats.length === 0) {
        console.warn('No valid stats data received from any pools.');
        return;
      }

      try {
        const aggregator = aggregateNumbers(
          WHITELIST_AGGREGATE_KEYS.home.jumbotron
        );

        const stats = reduceList(validStats, aggregator);

        const profitability = await profitabilityCalculation(
          1000,
          siteConfig.customFields,
          'usd',
          'monthly'
        );

        const data = await convertPoolChartDataToMapChartInfoBox(
          stats,
          settingsResponse,
          profitability === false
            ? undefined
            : { revenue: profitability.revenue }
        );

        setChartData(data);
      } catch (error) {
        console.error('Error building chart data:', error);
      }
    };

    fetchData();
  }, [
    statsResponse,
    isLoading,
    settingsResponse,
    API_ENDPOINTS,
    API_PATH,
  ]);

  return {
    ...chartData,
    isLoading,
  };
};

export default useMapChartData;
