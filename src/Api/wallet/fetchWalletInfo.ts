import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import { WALLET_INFO_RESPONSE } from './types';

export const fetchWalletInfo = async ({
  region,
  walletAddress,
  url,
  apiConfig,
}: {
  region: string;
  walletAddress: string;
  apiConfig?: ApiConfig;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({
      region,
      url,
      apiConfig,
    }).getInstance();

    const response = instance.get(`/accounts/${walletAddress}`) as Promise<
      AxiosResponse<WALLET_INFO_RESPONSE>
    >;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
