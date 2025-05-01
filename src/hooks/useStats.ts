import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { fetchStats } from '../Api/stats/fetchStats';
import { fetchStatsCharts } from '../Api/stats/fetchStatsCharts';

export const useFetchStats = ({
  urls,
  apiPath,
}: Parameters<typeof fetchStats>[0]) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS, urls],
    queryFn: () => fetchStats({ urls, apiPath }),
  });
};

export const useFetchStatsCharts = ({
  urls,
  apiPath,
}: Parameters<typeof fetchStats>[0]) => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS_CHART],
    queryFn: () => fetchStatsCharts({ urls, apiPath }),
  });
};
