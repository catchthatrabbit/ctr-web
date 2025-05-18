import { fetchWalletInfo } from '../Api/wallet/fetchWalletInfo';
import { QUERY_KEYS } from '@site/src/constants/queryKeys';
import { useState } from 'react';
import {
  fetchWorkerCounts,
  fetchWorkersByWalletAddress,
} from '@site/src/Api/workers/fetchWorkers';
import { useQueryConfigured } from './useQueryConfigured';
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from '../Api/workers/types';
import { WALLET_INFO_RESPONSE } from '../Api/wallet/types';
import { useConfigUrlBasedRegion } from './useConfigUrlBasedRegion';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface CustomFields {
  DEFAULT_REGION: string;
}

export const useFetchWallet = (
  region: string,
  walletAddress: string
) => {
  return useQueryConfigured<WALLET_INFO_RESPONSE>(
    { region, walletAddress },
    QUERY_KEYS.WALLET_INFO,
    fetchWalletInfo,
    walletAddress !== undefined
  );
};

export const useWalletPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const { DEFAULT_REGION } = siteConfig.customFields as unknown as CustomFields;
  const defaultRegion = DEFAULT_REGION?.toString() || 'DE';

  const [walletAddress, setWalletAddress] = useState<string>();
  const [region, setRegion] = useState<string>(defaultRegion.toUpperCase());
  const [selectedPool, setSelectedPool] = useState<string>(defaultRegion.toLowerCase());

  const handleWalletAddress = (walletAddress: string) => {
    setWalletAddress(walletAddress);
  };

  const handleSelectedPool = (selectedPool: string) => {
    setSelectedPool(selectedPool);
  };

  const handleChangeRegion = (selectedRegion: string) => {
    setRegion(selectedRegion);
  };

  const handleClearWalletAddress = () => {
    setWalletAddress(null);
  };

  return {
    walletAddress,
    region,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    selectedPool,
    handleSelectedPool,
  };
};

export const useFetchWorkersByWalletAddress = (
  region: string,
  walletAddress: string,
  limit?: number,
  offset?: number,
  status?: 'active' | 'inactive'
) => {
  const { url } = useConfigUrlBasedRegion(region);
  return useQueryConfigured<WORKER_BY_WALLET_ADDRESS_RESPONSE>(
    { region, walletAddress, limit, offset, url, status },
    QUERY_KEYS.WORKER,
    fetchWorkersByWalletAddress,
    walletAddress !== undefined
  );
};

export const useFetchWorkerCounts = (
  region: string,
  walletAddress: string
) => {
  const { url } = useConfigUrlBasedRegion(region);
  return useQueryConfigured<any>(
    { region, walletAddress, url },
    QUERY_KEYS.WORKER_COUNTS,
    fetchWorkerCounts,
    walletAddress !== undefined
  );
};
