import { useFetchStatsCharts } from '@site/src/hooks/useStats';
import {
  aggregateNumbers,
  convertPoolChartDataToChartData,
  convertPoolChartDataToRadialInfoBox,
  reduceList,
} from '../utils';
import { WHITELIST_AGGREGATE_KEYS } from '@site/src/configs/aggregate-keys.config';
import { ChartItem } from '../types';
import { TextFormatOutputType } from '@site/src/utils/textFormat';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';

const useRadialBarChartData = () => {
  const { siteConfig } = useDocusaurusContext();

  // Fetch data from the API
  const { data: statsChartsData = [], isLoading } = useFetchStatsCharts({
    urls: siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
    apiPath: String(siteConfig.customFields.API_PATH),
  });

  // Default values for infoBox and chart
  let infoBox: Array<{ title: string; value: TextFormatOutputType }> = [];
  let chart: ChartItem[] = [];

  try {
    // Safely reduce statsChartsData to extract required data
    const allPoolChartsData = statsChartsData.reduce<{
      allPoolChartsData: Array<{ poolCharts: Array<{ x: number; y: number }> }>;
      allLastBlockFound: number[];
    }>(
      (acc, item) => {
        const { poolCharts = [], stats = { lastBlockFound: 0 } } = item || {};

        acc.allPoolChartsData.push({ poolCharts });

        if (stats?.lastBlockFound !== undefined) {
          acc.allLastBlockFound.push(stats.lastBlockFound);
        }

        return acc;
      },
      { allPoolChartsData: [], allLastBlockFound: [] }
    );

    // Calculate the last block found
    const lastBlockFound =
      allPoolChartsData.allLastBlockFound.length > 0
        ? Math.max(...allPoolChartsData.allLastBlockFound)
        : null;

    // Aggregate stats data
    const aggregator = aggregateNumbers(WHITELIST_AGGREGATE_KEYS.home.stats);
    const stats = reduceList(statsChartsData || [], aggregator);

    // Generate infoBox and chart data
    if (statsChartsData.length > 0) {
      infoBox = convertPoolChartDataToRadialInfoBox({
        ...statsChartsData[0],
        lastBlockFound,
      });
    }
    chart = convertPoolChartDataToChartData(stats?.poolCharts || []);
  } catch (error) {
    console.error('Error processing radial bar chart data:', error);
    // Fallback to empty data in case of an error
    infoBox = [];
    chart = [];
  }

  return { infoBox, chart, isLoading };
};

export default useRadialBarChartData;
