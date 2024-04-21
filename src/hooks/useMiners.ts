import { QUERY_KEYS } from "@site/src/constants/queryKeys";
import { fetchMinersState, fetchMiners } from "../Api/miners/fetchMiners";
import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
import { useQueryConfigured } from "./useQueryConfigured";
import { MINERS_RESPONSE, MINERS_STATES } from "../Api/miners/types";

export const useFetchMinersState = (region: STANDARD_REGIONS_API_KEYS) => {
  return useQueryConfigured<MINERS_STATES>(
    { region },
    QUERY_KEYS.MINERS,
    fetchMinersState,
  );
};

export const useFetchMiners = (
  region: STANDARD_REGIONS_API_KEYS,
  limit?: number,
  offset?: number,
) => {
  return useQueryConfigured<MINERS_RESPONSE>(
    { region, limit, offset },
    QUERY_KEYS.MINERS,
    fetchMiners,
  );
};
