import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import { REGIONS } from "@site/src/constants/regions";

export const covertRegionValue2Label = (
  apiKeys: STANDARD_REGIONS_API_KEYS,
): string => {
  switch (apiKeys) {
    case "DE":
      return REGIONS.DE.label;
    case "FI":
      return REGIONS.FI.label;
    case "SG":
      return REGIONS.SG.label;
    case "HK":
      return REGIONS.HK.label;
    case "AM":
      return REGIONS.AM.label;
    case "AM1":
      return REGIONS.AM1.label;
    default:
      return REGIONS.DE.label;
  }
};
