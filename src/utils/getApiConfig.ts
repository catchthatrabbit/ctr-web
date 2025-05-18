import { POOLS_API_CONFIG_TYPE } from '../configs/types';
import { ApiConfig } from '../Api/api';

export const getApiConfig = (customFields: any): ApiConfig => {
  const apiEndpoints = customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE;
  const apiPath = customFields.API_PATH as string;

  if (!apiEndpoints || !apiPath) {
    throw new Error('API configuration not found in Docusaurus config');
  }

  return {
    apiEndpoints,
    apiPath,
  };
};
