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
  AM: "am",
  AM1: "am1",
};
