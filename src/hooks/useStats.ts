import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchStats } from "../Api/stats/fetchStats";
import { fetchStatsCharts } from "../Api/stats/fetchStatsCharts";

export const useFetchStats = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS],
    queryFn: () => fetchStats(),
  });
};

export const useFetchStatsCharts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STATS_CHART],
    queryFn: () => fetchStatsCharts(),
  });
};
