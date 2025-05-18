export type URLS_CONFIG_TYPE = {
  TRANSACTION_DETAILS: string;
  BLOCK_DETAILS: string;
};

export type POOLS_API_CONFIG_TYPE = Record<
  string,
  string
>;

export type POOLS_LIST = Record<
  string,
  Record<
    | 'DESCRIPTION'
    | 'NAME'
    | 'SERVER'
    | 'PORT'
    | 'USERNAME'
    | 'WORKER_NAME'
    | 'PASSWORD'
    | 'PAYOUT',
    string
  >
>;
