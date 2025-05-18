import { QUERY_KEYS } from '@site/src/constants/queryKeys';
import {
  fetchPayments,
  fetchPaymentsByWalletAddress,
  fetchPaymentsState,
} from '@site/src/Api/payments/fetchPayments';
import { useQueryConfigured } from './useQueryConfigured';
import {
  PAYMENTS_BY_WALLET_ADDRESS_RESPONSE,
  PAYMENTS_RESPONSE,
  PAYMENTS_STATE,
} from '../Api/payments/types';
import { useConfigUrlBasedRegion } from './useConfigUrlBasedRegion';

export const useFetchPaymentByWalletAddress = (
  region: string,
  walletAddress: string,
  limit?: number,
  offset?: number
) => {
  const { url } = useConfigUrlBasedRegion(region);

  return useQueryConfigured<PAYMENTS_BY_WALLET_ADDRESS_RESPONSE>(
    { region, walletAddress, limit, offset, url },
    QUERY_KEYS.PAYMENTS,
    fetchPaymentsByWalletAddress
  );
};

export const useFetchPayments = (
  region: string,
  limit?: number,
  offset?: number
) => {
  const { url } = useConfigUrlBasedRegion(region);

  return useQueryConfigured<PAYMENTS_RESPONSE>(
    { region, limit, offset, url },
    QUERY_KEYS.PAYMENTS,
    fetchPayments
  );
};

export const useFetchPaymentsState = (region: string) => {
  const { url } = useConfigUrlBasedRegion(region);

  return useQueryConfigured<PAYMENTS_STATE>(
    { region, url },
    QUERY_KEYS.PAYMENTS,
    fetchPaymentsState
  );
};
