import { AxiosInstance } from '../api';
import { getApiConfig } from '../../utils/getApiConfig';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_API_CONFIG_TYPE } from '../../configs/types';
import { GET_ALL_PROPS, STATS_CHARTS_RESPONSE, STATS_RESPONSE } from './types';
import { MATURED_RESPONSE } from '../blocks/types';

export const generateAllApiInstances = (
  urls: POOLS_API_CONFIG_TYPE,
  apiPath: string,
  apiConfig?: ApiConfig
) => {
  return Object.entries(urls).map(([region, url]) => {
    if (url === '') {
      if (!apiConfig) {
        throw new Error('Missing apiConfig for empty region URL');
      }
      return new AxiosInstance({ region, apiConfig });
    }
    return new AxiosInstance({ url });
  });
};

export const getAllStats = ({
  urls,
  apiPath,
  apiConfig,
}: GET_ALL_PROPS & { apiConfig?: ApiConfig }) => {
  const allApi = generateAllApiInstances(urls, apiPath, apiConfig);
  return allApi.map((api) => api.getInstance().get('/v2/api/stats')) as Array<
    Promise<{ data: STATS_RESPONSE }>
  >;
};

export const getAllStatsCharts = ({
  urls,
  apiPath,
  apiConfig,
}: GET_ALL_PROPS & { apiConfig?: ApiConfig }) => {
  const allApi = generateAllApiInstances(urls, apiPath, apiConfig);
  return allApi.map((api) =>
    api.getInstance().get('/v2/api/stats/chart')
  ) as Array<Promise<{ data: STATS_CHARTS_RESPONSE }>>;
};

export const getAllRegionsMaturedBlocks = ({
  urls,
  apiPath,
  apiConfig,
}: GET_ALL_PROPS & { apiConfig?: ApiConfig }) => {
  const allApi = generateAllApiInstances(urls, apiPath, apiConfig);
  const limit = 5;
  const offset = 0;
  return allApi.map((api) =>
    api
      .getInstance()
      .get(`/v2/api/matured_blocks?limit=${limit}&offset=${offset}`)
  ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
