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

const useRadialBarChartData = () => {
  const { data: statsChartsData, isLoading } = useFetchStatsCharts();

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
