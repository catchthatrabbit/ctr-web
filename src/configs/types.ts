export type URLS_CONFIG_TYPE = {
  TRANSACTION_DETAILS_URL: string;
  BLOCK_DETAILS_URL: string;
  CORE_CLIENT_URL: string;
  CORE_TALK_SPACE_URL: string;
  ICAN_WALLET_URL: string;
  GITHUB_RELEASE_DOWNLOAD_URL: string;
  GITHUB_RAW_MINE_SH: string;
};

export type POOLS_API_CONFIG_TYPE = Record<
  "DE_API_ENDPOINT" | "FI_API_ENDPOINT" | "SG_API_ENDPOINT" | "HK_API_ENDPOINT" | "BR_API_ENDPOINT" | "JP_API_ENDPOINT",
  string
>;

export type POOLS_LIST = Record<
  "DE" | "FI" | "SG" | "HK" | "BR" | "JP",
  Record<
    | "DESCRIPTION"
    | "NAME"
    | "SERVER"
    | "PORT"
    | "USERNAME"
    | "WORKER_NAME"
    | "PASSWORD",
    string
  >
>;
