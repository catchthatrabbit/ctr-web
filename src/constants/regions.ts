import poolConfig from "@site/pool.config.json";
import {
  STANDARD_REGIONS_API_KEYS,
  STANDARD_REGIONS_API_VALUES,
} from "@site/src/Api/types";

export const REGIONS_FULL_NAME: Record<STANDARD_REGIONS_API_KEYS, string> = {
  EU: poolConfig.pools.EU.fullName,
  EU_BACKUP: poolConfig.pools.EU_BACKUP.fullName,
  AS: poolConfig.pools.AS.fullName,
  AS_BACKUP: poolConfig.pools.AS_BACKUP.fullName,
  US: poolConfig.pools.US.fullName,
  US_BACKUP: poolConfig.pools.US_BACKUP.fullName,
};

export const REGIONS_SHORT_NAME: Record<STANDARD_REGIONS_API_KEYS, string> = {
  EU: poolConfig.pools.EU.name,
  EU_BACKUP: poolConfig.pools.EU_BACKUP.name,
  AS: poolConfig.pools.AS.name,
  AS_BACKUP: poolConfig.pools.AS_BACKUP.name,
  US: poolConfig.pools.US.name,
  US_BACKUP: poolConfig.pools.US_BACKUP.name,
};

export const REGIONS: Record<
  STANDARD_REGIONS_API_KEYS,
  {
    label: string;
    value: STANDARD_REGIONS_API_VALUES;
    summary: string;
    url: string;
  }
> = {
  EU: {
    label: "Primary European Pool",
    value: "eu",
    summary: "European Pool",
    url: "eu.catchthatrabbit.com",
  },
  EU_BACKUP: {
    label: "Backup European Pool",
    value: "eu1",
    summary: "Backup European Pool",
    url: "eu1.catchthatrabbit.com",
  },
  AS: {
    label: "Primary Asian Pool",
    value: "as",
    summary: "Asian Pool",
    url: "as.catchthatrabbit.com",
  },
  AS_BACKUP: {
    label: "Backup Asian Pool",
    value: "as1",
    summary: "Backup Asian Pool",
    url: "as1.catchthatrabbit.com",
  },
  US: {
    label: "Primary US Pool",
    value: "us",
    summary: "US Pool",
    url: "us.catchthatrabbit.com",
  },
  US_BACKUP: {
    label: "Backup US Pool",
    value: "us1",
    summary: "Backup US Pool",
    url: "us1.catchthatrabbit.com",
  },
};
