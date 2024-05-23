import { STANDARD_REGIONS_API_KEYS } from "../Api/types";

const POOL_CATCH_THE_RABBIT_SUB_DOMAINS: Record<
  STANDARD_REGIONS_API_KEYS,
  string
> = {
  DE: poolConfig.pools.DE.server,
  FI: poolConfig.pools.FI.server,
  SG: poolConfig.pools.SG.server,
  HK: poolConfig.pools.HK.server,
  AM: poolConfig.pools.AM.server,
  AM1: poolConfig.pools.AM1.server,
};

const API_BASE_PATH = "v2/api/";

export const DEFAULT_API_URL: Record<STANDARD_REGIONS_API_KEYS, string> = {
  DE: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.DE}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.DE}/${poolConfig.apiBasePath}`,
  FI: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.FI}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.FI}/${poolConfig.apiBasePath}`,
  SG: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.SG}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.SG}/${poolConfig.apiBasePath}`,
  HK: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.HK}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.HK}/${poolConfig.apiBasePath}`,
  AM: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AM}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AM}/${poolConfig.apiBasePath}`,
  AM1: poolConfig.useHTTPS
    ? `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AM1}/${poolConfig.apiBasePath}`
    : `http://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.AM1}/${poolConfig.apiBasePath}`,
};

export const EXTERNAL_URL: Record<EXTERNAL_URL_ENUM, string> = {
  TRANSACTION_DETAILS: "https://blockindex.net/tx",
  BLOCK_DETAILS: "https://blockindex.net/block",
};
