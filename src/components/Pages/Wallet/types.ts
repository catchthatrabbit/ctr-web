export type WORKER_INFO_BY_WALLET_ADDRESS = Array<{
  rabbit: string;
  lastBeat: string;
  hr: string;
  hr2: string;
  offline: string;
}>;

export type PAYMENT_INFO_BY_WALLET_ADDRESS = Array<{
  amount: string;
  timestamp: string;
  tx: string;
}>;
