import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import {
  PAYMENTS_BY_WALLET_ADDRESS_RESPONSE,
  PAYMENTS_RESPONSE,
  PAYMENTS_STATE,
} from './types';

export const fetchPaymentsByWalletAddress = async ({
  region,
  walletAddress,
  limit = 10,
  offset = 0,
  url,
}: {
  region: string;
  walletAddress: string;
  limit: number;
  offset: number;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    const response = instance.get(
      `/payments/${walletAddress}?limit=${limit}&offset=${offset}`
    ) as Promise<AxiosResponse<PAYMENTS_BY_WALLET_ADDRESS_RESPONSE>>;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};

export const fetchPayments = async ({
  region,
  limit = 10,
  offset = 0,
  url,
}: {
  region: string;
  limit: number;
  offset: number;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    const response = instance.get(
      `/payments?limit=${limit}&offset=${offset}`
    ) as Promise<AxiosResponse<PAYMENTS_RESPONSE>>;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};

export const fetchPaymentsState = async ({
  region,
  url,
}: {
  region: string;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();
    const response = instance.get(`/payments_stats`) as Promise<
      AxiosResponse<PAYMENTS_STATE>
    >;
    return (await response).data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};
