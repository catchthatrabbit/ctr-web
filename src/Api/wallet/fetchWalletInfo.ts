import { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "../api";
import { STANDARD_REGIONS_API_KEYS } from "../types";
import { WALLET_INFO_RESPONSE } from "./types";

export const fetchWalletInfo = async ({
  region,
  walletAddress,
}: {
  region: STANDARD_REGIONS_API_KEYS;
  walletAddress: string;
}) => {
  try {
    const instance = new AxiosInstance(region).getInstance();

    const response = instance.get(`/accounts/${walletAddress}`) as Promise<
      AxiosResponse<WALLET_INFO_RESPONSE>
    >;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
