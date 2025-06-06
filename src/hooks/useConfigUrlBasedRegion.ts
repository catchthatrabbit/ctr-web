import siteContext from '@docusaurus/useDocusaurusContext';
import { useCallback } from 'react';
import { customPoolAndApiUrlSwitch } from '../utils/customPoolUrlSwitch';
import { POOLS_API_CONFIG_TYPE } from '../configs/types';

export const useConfigUrlBasedRegion = (region: string) => {
  const { siteConfig } = siteContext();

  const url = useCallback(
    () =>
      customPoolAndApiUrlSwitch(
        region,
        siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
        String(siteConfig.customFields.API_PATH)
      ),
    [
      region,
      siteConfig.customFields.API_ENDPOINTS,
      siteConfig.customFields.API_PATH,
    ]
  );

  return {
    url: url(),
  };
};
