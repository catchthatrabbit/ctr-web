import poolConfig from "@site/pool.config.json";
import {
  STANDARD_REGIONS_API_KEYS,
  STANDARD_REGIONS_API_VALUES,
} from "@site/src/Api/types";

export const REGIONS_FULL_NAME: Record<STANDARD_REGIONS_API_KEYS, string> = {
  DE: poolConfig.pools.DE.fullName,
  FI: poolConfig.pools.FI.fullName,
  SG: poolConfig.pools.SG.fullName,
  HK: poolConfig.pools.HK.fullName,
  AM: poolConfig.pools.AM.fullName,
  AM1: poolConfig.pools.AM1.fullName,
};

export const REGIONS_SHORT_NAME: Record<STANDARD_REGIONS_API_KEYS, string> = {
  DE: poolConfig.pools.DE.name,
  FI: poolConfig.pools.FI.name,
  SG: poolConfig.pools.SG.name,
  HK: poolConfig.pools.HK.name,
  AM: poolConfig.pools.AM.name,
  AM1: poolConfig.pools.AM1.name,
};

export const REGIONS: Record<
  STANDARD_REGIONS_API_KEYS,
  STANDARD_REGIONS_API_KEYS
> = {
  DE: "DE",
  FI: "FI",
  SG: "SG",
  HK: "HK",
  AM: "AM",
  AM1: "AM1",
};
