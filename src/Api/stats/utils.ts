import { AxiosInstance } from '../api';
import { getApiConfig } from '../../utils/getApiConfig';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_API_CONFIG_TYPE } from '../../configs/types';
import { GET_ALL_PROPS, STATS_CHARTS_RESPONSE, STATS_RESPONSE } from './types';
import { MATURED_RESPONSE } from '../blocks/types';

export const generateAllApiInstances = (urls: POOLS_API_CONFIG_TYPE, apiPath: string) => {
  const { siteConfig } = useDocusaurusContext();
  const apiConfig = getApiConfig(siteConfig.customFields);

  return Object.entries(urls).map(([region, url]) => {
    if (url === '') {
      return new AxiosInstance({ region, apiConfig });
    }
    return new AxiosInstance({ url });
  });
};

export const getAllStats = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances(urls, apiPath);
  return allApi.map((api) =>
    api.getInstance().get('/stats')
  ) as Array<Promise<{ data: STATS_RESPONSE }>>;
};

export const getAllStatsCharts = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances(urls, apiPath);
  return allApi.map((api) =>
    api.getInstance().get('/stats/chart')
  ) as Array<Promise<{ data: STATS_CHARTS_RESPONSE }>>;
};

export const getAllRegionsMaturedBlocks = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances(urls, apiPath);
  const limit = 5;
  const offset = 0;
  return allApi.map((api) =>
    api.getInstance()
      .get(`/matured_blocks?limit=${limit}&offset=${offset}`)
  ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
