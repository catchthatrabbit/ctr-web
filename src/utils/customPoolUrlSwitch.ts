import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

export const customPoolAndApiUrlSwitch = (
  region: STANDARD_REGIONS_API_KEYS,
  poolUrl: POOLS_API_CONFIG_TYPE,
  apiPath?: string,
): string => {
  let resultUrl;
  switch (region) {
    case "US":
      resultUrl = poolUrl["US_PRIMARY_API_ENDPOINT"]
        ? poolUrl["US_PRIMARY_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_US_PRIMARY_API_ENDPOINT"];
      break;
    case "US_BACKUP":
      resultUrl = poolUrl["US_BACKUP_API_ENDPOINT"]
        ? poolUrl["US_BACKUP_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_US_BACKUP_API_ENDPOINT"];
      break;
    case "EU":
      resultUrl = poolUrl["EU_PRIMARY_API_ENDPOINT"]
        ? poolUrl["EU_PRIMARY_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_EU_PRIMARY_API_ENDPOINT"];
      break;
    case "EU_BACKUP":
      resultUrl = poolUrl["EU_BACKUP_API_ENDPOINT"]
        ? poolUrl["EU_BACKUP_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_EU_BACKUP_API_ENDPOINT"];
      break;
    case "AS":
      resultUrl = poolUrl["AS_PRIMARY_API_ENDPOINT"]
        ? poolUrl["AS_PRIMARY_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_AS_PRIMARY_API_ENDPOINT"];
      break;
    case "AS_BACKUP":
      resultUrl = poolUrl["AS_BACKUP_API_ENDPOINT"]
        ? poolUrl["AS_BACKUP_API_ENDPOINT"]
        : poolUrl["NEXT_PUBLIC_AS_BACKUP_API_ENDPOINT"];
      break;
  }
  if (apiPath) return `${resultUrl}${apiPath}`;
  return resultUrl;
};
