import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
import poolConfig from '@site/pool.config.json';
import { EXTERNAL_URL_ENUM } from "../enums/externalUrls.enum";

export const POOL_CATCH_THE_RABBIT_SUB_DOMAINS:Record<STANDARD_REGIONS_API_KEYS, string> = {
    EU: poolConfig.pools.EU.server,
    EU_BACKUP: poolConfig.pools.EU_BACKUP.server,
    AS: poolConfig.pools.AS.server,
    AS_BACKUP: poolConfig.pools.AS_BACKUP.server,
    US: poolConfig.pools.US.server,
    US_BACKUP: poolConfig.pools.US_BACKUP.server
}

export const DEFAULT_API_URL:Record<STANDARD_REGIONS_API_KEYS, string> = {
   EU: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.EU}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.EU}/${poolConfig.apiBasePath}`,
   EU_BACKUP: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.EU_BACKUP}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.EU_BACKUP}/${poolConfig.apiBasePath}`,
   AS: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AS}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AS}/${poolConfig.apiBasePath}`,
   AS_BACKUP: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AS_BACKUP}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AS_BACKUP}/${poolConfig.apiBasePath}`,
   US: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.US}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.US}/${poolConfig.apiBasePath}`,
   US_BACKUP: poolConfig.useHTTPS? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.US_BACKUP}/${poolConfig.apiBasePath}` : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.US_BACKUP}/${poolConfig.apiBasePath}`
}

export const EXTERNAL_URL:Record<EXTERNAL_URL_ENUM, string> = {
    TRANSACTION_DETAILS:"https://blockindex.net/tx",
    BLOCK_DETAILS: "https://blockindex.net/block",
    CORE_TALK_SPACE_URL:"https://coretalk.space"
}