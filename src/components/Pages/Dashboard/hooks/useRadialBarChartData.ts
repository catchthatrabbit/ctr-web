import { useFetchStatsCharts } from "@site/src/hooks/useStats";
import {
  aggregateNumbers,
  convertPoolChartDataToChartData,
  convertPoolChartDataToRadialInfoBox,
  reduceList,
} from "../utils";
import { WHITELIST_AGGREGATE_KEYS } from "@site/src/configs/aggregate-keys.config";
import { ChartItem } from "../types";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

const useRadialBarChartData = () => {
  const { siteConfig } = useDocusaurusContext();

  const { data: statsChartsData, isLoading } = useFetchStatsCharts({
    urls: siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
    apiPath: String(siteConfig.customFields.API_PATH),
  });

  let infoBox: Array<{ title: string; value: TextFormatOutputType }> = null;
  let chart: ChartItem[] = null;

  const allPoolChartsData = statsChartsData?.reduce<{
    allPoolChartsData: Array<{ poolCharts: Array<{ x: number; y: number }> }>;
    allLastBlockFound: number[];
  }>(
    (acc, item) => {
      const { poolCharts, stats } = item;

      if (Array.isArray(acc.allPoolChartsData))
        acc.allPoolChartsData = [...acc.allPoolChartsData, { poolCharts }];
      else acc.allPoolChartsData = [{ poolCharts }];

      if (Array.isArray(acc.allLastBlockFound))
        acc.allLastBlockFound = [
          ...acc.allLastBlockFound,
          stats.lastBlockFound,
        ];
      else acc.allLastBlockFound = [stats.lastBlockFound];

      return acc;
    },
    { allPoolChartsData: [], allLastBlockFound: [] },
  );

  let lastBlockFound = null;

  if (
    Array.isArray(allPoolChartsData?.allLastBlockFound) &&
    allPoolChartsData.allLastBlockFound.length > 0
  )
    lastBlockFound = Math.max(...allPoolChartsData.allLastBlockFound) as number;

  const aggregator = aggregateNumbers(WHITELIST_AGGREGATE_KEYS.home.stats);

  const stats = reduceList(statsChartsData || [], aggregator);

  if (statsChartsData?.length > 0)
    infoBox = convertPoolChartDataToRadialInfoBox({
      ...statsChartsData[0],
      lastBlockFound,
    });
  chart = convertPoolChartDataToChartData(stats?.poolCharts || []);

  return { infoBox, chart, isLoading };
};

export default useRadialBarChartData;
