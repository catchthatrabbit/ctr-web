import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import { STANDARD_REGIONS_API_KEYS } from '../types';
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from './types';

export const fetchWorkersByWalletAddress = async ({
  region,
  walletAddress,
  limit = 10,
  offset = 0,
  url,
  status, // 'active' | 'inactive' | undefined
}: {
  region: STANDARD_REGIONS_API_KEYS;
  walletAddress: string;
  limit?: number;
  offset?: number;
  url?: string;
  status?: 'active' | 'inactive';
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    // Build query string
    let query = `/workers/${walletAddress}?limit=${limit}&offset=${offset}`;
    if (status === 'active') {
      query += `&online=true`;
    } else if (status === 'inactive') {
      query += `&offline=true`;
    }
    const response = instance.get(query) as Promise<
      AxiosResponse<WORKER_BY_WALLET_ADDRESS_RESPONSE>
    >;

    return (await response).data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};

export const fetchWorkerCounts = async ({
  region,
  walletAddress,
  url,
}: {
  region: STANDARD_REGIONS_API_KEYS;
  walletAddress: string;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    const response = instance.get(`/accounts/${walletAddress}`) as Promise<
      AxiosResponse<any>
    >;

    return (await response).data; // contains workersOnline, workersOffline, etc.
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};
