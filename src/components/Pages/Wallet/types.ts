export type WORKER_INFO_BY_WALLET_ADDRESS = Array<{
  rabbit: string;
  rabbit_summarized?: string;
  lastBeat: string;
  hr: string;
  hr2: string;
  offline: string;
  status?: string;
  workerId?: string;
  workerName?: string;
}>;

export type PAYMENT_INFO_BY_WALLET_ADDRESS = Array<{
  amount: string;
  amountRaw?: number;
  timestamp: string;
  tx: string;
}>;
