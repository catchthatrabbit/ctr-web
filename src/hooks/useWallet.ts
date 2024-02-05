import {useQuery} from '@tanstack/react-query';
import { fetchWalletInfo } from '../Api/wallet/fetchWalletInfo';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_VALUES } from '../Api/types';


export const useFetchWallet = (region:STANDARD_REGIONS_API_VALUES, walletAddress:string) =>{
    return useQuery({queryKey:[QUERY_KEYS.WALLET_INFO, walletAddress], queryFn: () => fetchWalletInfo(region, walletAddress), 
        enabled:walletAddress !== undefined});
}