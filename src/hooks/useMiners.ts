import { QUERY_KEYS } from '@site/src/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { fetchMinersState, fetchMiners } from '../Api/miners/fetchMiners';
import { STANDARD_REGIONS_API_KEYS } from '../Api/types';
import { useQueryConfigured } from './useQueryConfigured';
import { MINERS_RESPONSE, MINERS_STATES } from '../Api/miners/types';
import { useConfigUrlBasedRegion } from './useConfigUrlBasedRegion';

export const useFetchMinersState = (region: STANDARD_REGIONS_API_KEYS) => {
  const { url } = useConfigUrlBasedRegion(region);

  return useQuery<MINERS_STATES>({
    queryKey: [QUERY_KEYS.MINERS, region],
    queryFn: () => fetchMinersState({ region, url }),
  });
};

export const useFetchMiners = (
  region: STANDARD_REGIONS_API_KEYS,
  limit?: number,
  offset?: number
) => {
  const { url } = useConfigUrlBasedRegion(region);
  return useQueryConfigured<MINERS_RESPONSE>(
    { region, limit, offset, url },
    QUERY_KEYS.MINERS,
    fetchMiners
  );
};
