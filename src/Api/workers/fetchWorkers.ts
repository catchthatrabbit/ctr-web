import { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "../api";
import { STANDARD_REGIONS_API_KEYS } from "../types";
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from "./types";

export const fetchWorkersByWalletAddress = async ({
  region,
  walletAddress,
  limit = 10,
  offset = 0,
}: {
  region: STANDARD_REGIONS_API_KEYS;
  walletAddress: string;
  limit: number;
  offset: number;
}) => {
  try {
    const instance = new AxiosInstance(region).getInstance();

    const response = instance.get(
      `/workers/${walletAddress}?limit=${limit}&offset=${offset}`,
    ) as Promise<AxiosResponse<WORKER_BY_WALLET_ADDRESS_RESPONSE>>;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
