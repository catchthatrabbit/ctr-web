import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from './types';

export const fetchWorkersByWalletAddress = async ({
  region,
  walletAddress,
  limit = 10,
  offset = 0,
  url,
  status, // 'active' | 'inactive' | undefined
}: {
  region: string;
  walletAddress: string;
  limit?: number;
  offset?: number;
  url?: string;
  status?: 'active' | 'inactive';
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    const realOffset = offset * limit;
    let query = `/workers/${walletAddress}?limit=${limit}&offset=${realOffset}`;
    if (status === 'active') {
      query += `&online=true`;
    } else if (status === 'inactive') {
      query += `&offline=true`;
    }
    const response = instance.get(query) as Promise<
      AxiosResponse<WORKER_BY_WALLET_ADDRESS_RESPONSE>
    >;

    const data = (await response).data;

    const sortedWorkers = Object.entries(data.workers)
      .sort(([, a], [, b]) => b.lastBeat - a.lastBeat) // descending by lastBeat
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as typeof data.workers
      );

    return {
      ...data,
      workers: sortedWorkers,
    };
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
  region: string;
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
