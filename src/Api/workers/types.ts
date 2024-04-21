export type WORKER_BY_WALLET_ADDRESS_RESPONSE = {
  workers: {
    [key in string]: {
      lastBeat: number;
      hr: number;
      offline: boolean;
      hr2: number;
    };
  };
  workersTotal: number;
};
