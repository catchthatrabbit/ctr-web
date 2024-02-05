import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_VALUES } from '@site/src/Api/types';
import { fetchPayments, fetchPaymentsByWalletAddress, fetchPaymentsState } from '@site/src/Api/payments/fetchPayments';

export const useFetchPaymentByWalletAddress = (region:STANDARD_REGIONS_API_VALUES, walletAddress:string, limit?:number, offset?:number) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region, walletAddress, limit, offset], 
        queryFn: () => fetchPaymentsByWalletAddress(region, walletAddress, limit, offset)});
}


export const useFetchPayments = (region:STANDARD_REGIONS_API_VALUES, limit?:number, offset?:number) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region, limit, offset], 
        queryFn: () => fetchPayments(region, limit, offset)});
}


export const useFetchPaymentsState = (region:STANDARD_REGIONS_API_VALUES) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region], 
        queryFn: () => fetchPaymentsState(region)});
}
