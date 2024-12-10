import { STANDARD_REGIONS_API_KEYS } from "../Api/types";

const POOL_CATCH_THE_RABBIT_SUB_DOMAINS: Record<
  STANDARD_REGIONS_API_KEYS,
  string
> = {
  DE: "eu-api.catchthatrabbit.com",
  FI: "eu1-api.catchthatrabbit.com",
  SG: "as-api.catchthatrabbit.com",
  HK: "as1-api.catchthatrabbit.com",
  BR: "us-api.catchthatrabbit.com",
  JP: "us1-api.catchthatrabbit.com",
};

const API_BASE_PATH = "v2/api/";

export const DEFAULT_API_URL: Record<STANDARD_REGIONS_API_KEYS, string> = {
  DE: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.DE}/${API_BASE_PATH}`,
  FI: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.FI}/${API_BASE_PATH}`,
  SG: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.SG}/${API_BASE_PATH}`,
  HK: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.HK}/${API_BASE_PATH}`,
  BR: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.BR}/${API_BASE_PATH}`,
  JP: `https://${POOL_CATCH_THE_RABBIT_SUB_DOMAINS.JP}/${API_BASE_PATH}`,
};
