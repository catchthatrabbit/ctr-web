import { DEFAULT_API_URL } from "@site/src/constants/links";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";

export const DE_API = DEFAULT_API_URL.DE;
export const FI_API = DEFAULT_API_URL.FI;
export const SG_API = DEFAULT_API_URL.SG;
export const HK_API = DEFAULT_API_URL.HK;
export const AM_API = DEFAULT_API_URL.AM;
export const AM1_API = DEFAULT_API_URL.AM1;

export const API_SWITCH: Record<STANDARD_REGIONS_API_KEYS, string> = {
  DE: DE_API,
  FI: FI_API,
  SG: SG_API,
  HK: HK_API,
  AM: AM_API,
  AM1: AM1_API,
};

export const AGGREGATION_APIS = [
  DE_API,
  FI_API,
  SG_API,
  HK_API,
  AM_API,
  AM1_API,
];
