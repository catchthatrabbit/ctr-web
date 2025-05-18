import axios, { AxiosInstance as AxiosInstanceType } from 'axios';
import { POOLS_API_CONFIG_TYPE } from '../configs/types';

interface ApiConfig {
  apiEndpoints: POOLS_API_CONFIG_TYPE;
  apiPath: string;
}

class AxiosInstance {
  _axiosInstance: AxiosInstanceType;
  constructor({
    region,
    url,
    apiConfig,
  }: {
    region?: string;
    url?: string;
    apiConfig?: ApiConfig;
  }) {
    if (url !== '' && url !== undefined) {
      this._axiosInstance = axios.create({
        baseURL: url,
      });
    } else if (apiConfig?.apiEndpoints && apiConfig?.apiPath && region) {
      const baseUrl = apiConfig.apiEndpoints[region];
      if (!baseUrl) {
        throw new Error(`No API endpoint found for region: ${region}`);
      }
      this._axiosInstance = axios.create({
        baseURL: baseUrl + apiConfig.apiPath,
      });
    } else {
      throw new Error('Invalid API configuration');
    }
  }

  getInstance = () => {
    return this._axiosInstance;
  };
}

export { AxiosInstance };
export type { ApiConfig };
