import {
  STANDARD_REGIONS_API_KEYS,
  STANDARD_REGIONS_API_VALUES,
} from "./types";

export const STANDARD_REGIONS_API: {
  [key in STANDARD_REGIONS_API_KEYS]: STANDARD_REGIONS_API_VALUES;
} = {
  DE: "de",
  FI: "fi",
  SG: "sg",
  HK: "hk",
  BR: "br",
  JP: "jp",
};

export const EXCHANGE_RATES_API = "https://coreport.pages.dev/api/v1";
