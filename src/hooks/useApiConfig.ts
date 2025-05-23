import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_API_CONFIG_TYPE } from '../configs/types';
import { ApiConfig } from '../Api/api';

export const useApiConfig = (): ApiConfig => {
  const { siteConfig } = useDocusaurusContext();
  const apiEndpoints = siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE;
  const apiPath = siteConfig.customFields.API_PATH as string;

  if (!apiEndpoints || !apiPath) {
    throw new Error('API configuration not found in docusaurus config');
  }

  return {
    apiEndpoints,
    apiPath,
  };
};
