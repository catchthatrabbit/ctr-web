import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

export const customPoolAndApiUrlSwitch = (
  region: STANDARD_REGIONS_API_KEYS,
  poolUrl: POOLS_API_CONFIG_TYPE,
  apiPath?: string,
): string => {
  let resultUrl;
  switch (region) {
    case "DE":
      resultUrl = poolUrl["DE_API_ENDPOINT"]
        ? poolUrl["DE_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_DE_API_ENDPOINT"];
      break;
    case "FI":
      resultUrl = poolUrl["FI_API_ENDPOINT"]
        ? poolUrl["FI_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_FI_API_ENDPOINT"];
      break;
    case "SG":
      resultUrl = poolUrl["SG_API_ENDPOINT"]
        ? poolUrl["SG_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_SG_API_ENDPOINT"];
      break;
    case "HK":
      resultUrl = poolUrl["HK_API_ENDPOINT"]
        ? poolUrl["HK_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_HK_API_ENDPOINT"];
      break;
    case "AM":
      resultUrl = poolUrl["AM_API_ENDPOINT"]
        ? poolUrl["JP_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_AM_API_ENDPOINT"];
      break;
    case "JP":
      resultUrl = poolUrl["JP_API_ENDPOINT"]
        ? poolUrl["JP_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_JP_API_ENDPOINT"];
      break;
  }
  if (apiPath) return `${resultUrl}${apiPath}`;
  return resultUrl;
};
