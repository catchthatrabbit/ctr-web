import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';
import { fetchStats } from '../Api/stats/fetchStats';
import { fetchStatsCharts } from '../Api/stats/fetchStatsCharts';
import { getApiConfig } from '../utils/getApiConfig';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const useFetchStats = ({
  urls,
  apiPath,
}: Parameters<typeof fetchStats>[0]) => {
  const { siteConfig } = useDocusaurusContext();
  const apiConfig = getApiConfig(siteConfig.customFields);
  return useQuery({
    queryKey: [QUERY_KEYS.STATS, urls],
    queryFn: () => fetchStats({ urls, apiPath, apiConfig }),
  });
};

export const useFetchStatsCharts = ({
  urls,
  apiPath,
}: Parameters<typeof fetchStatsCharts>[0]) => {
  const { siteConfig } = useDocusaurusContext();
  const apiConfig = getApiConfig(siteConfig.customFields);
  return useQuery({
    queryKey: [QUERY_KEYS.STATS_CHART],
    queryFn: () => fetchStatsCharts({ urls, apiPath, apiConfig }),
  });
};
