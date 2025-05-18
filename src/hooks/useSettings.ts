import { QUERY_KEYS } from '@site/src/constants/queryKeys';
import { fetchSettings } from '../Api/settings/fetchSettings';
import { useQueryConfigured } from './useQueryConfigured';
import { SETTINGS_RESPONSE } from '../Api/settings/types';
import { useConfigUrlBasedRegion } from './useConfigUrlBasedRegion';

export const useFetchSettings = (region: string) => {
  const { url } = useConfigUrlBasedRegion(region);
  return useQueryConfigured<SETTINGS_RESPONSE>(
    { region, url },
    QUERY_KEYS.MINERS,
    fetchSettings
  );
};
