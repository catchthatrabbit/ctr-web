export type WALLET_INFO_RESPONSE = {
  currentHashrate: number;
  hashrate: number;
  lastMonth: number;
  paidLastMonth: number;
  paidThisMonth: number;
  paymentsTotal: number;
  roundShares: number;
  stats: {
    balance: number;
    blocksFound: number;
    immature: number;
    lastShare: number;
    paid: number;
    pending: number;
  };
  thisMonth: number;
  workersOffline: number;
  workersOnline: number;
};
