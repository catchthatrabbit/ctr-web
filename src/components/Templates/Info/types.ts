export type WALLET_INFO = {
  pageProps: {
    address: string;
    dehydratedState: {
      mutations: [];
      queries: [
        {
          state: {
            data: [
              {
                title: string;
                data: [
                  {
                    key: number;
                    value: number;
                    type: string;
                  },
                ];
              },
            ];
            dataUpdateCount: number;
            dataUpdatedAt: number;
            error: string;
            errorUpdateCount: number;
            errorUpdatedAt: number;
            fetchFailureCount: number;
            fetchMeta: string;
            isFetching: boolean;
            isInvalidated: boolean;
            isPaused: boolean;
            status: string;
          };
          queryKey: string[];
          queryHash: string;
        },
      ];
    };
  };
  __N_SSP: boolean;
};
