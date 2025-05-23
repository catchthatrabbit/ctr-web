import { POOLS_API_CONFIG_TYPE } from '@site/src/configs/types';

/**
 * Constructs an API URL based on region and pool configuration
 * @param region - The region code to determine which endpoint to use
 * @param poolUrl - The pool configuration object containing API endpoints
 * @param apiPath - Optional path to append to the API URL
 * @returns {string} The constructed API URL for the specified region
 */
export const customPoolAndApiUrlSwitch = (
  region: string,
  poolUrl: POOLS_API_CONFIG_TYPE,
  apiPath?: string
): string => {
  const resultUrl: string = poolUrl[`${region}_API_ENDPOINT`] || '';
  return resultUrl ? `${resultUrl}${apiPath || ''}` : '';
};
