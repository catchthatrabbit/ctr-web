import { QUERY_KEYS } from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import { fetchSettings } from "../Api/settings/fetchSettings";
import { useQueryConfigured } from "./useQueryConfigured";
import { SETTINGS_RESPONSE } from "../Api/settings/types";

export const useFetchSettings = (region: STANDARD_REGIONS_API_KEYS) => {
  return useQueryConfigured<SETTINGS_RESPONSE>(
    { region },
    QUERY_KEYS.MINERS,
    fetchSettings,
  );
};
