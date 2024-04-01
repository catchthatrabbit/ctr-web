import {useQuery} from '@tanstack/react-query';
import { fetchWalletInfo} from '../Api/wallet/fetchWalletInfo';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_KEYS } from '../Api/types';
import { useState } from "react";
import { POOL_NAME_ENUM } from '@site/src/enums/poolName.enum';
import { fetchWorkersByWalletAddress } from '@site/src/Api/workers/fetchWorkers';
import { useQueryConfigured } from './useQueryConfigured';
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from '../Api/workers/types';



export const useFetchWallet = (region:STANDARD_REGIONS_API_KEYS, walletAddress:string) =>{
    return useQuery({queryKey:[QUERY_KEYS.WALLET_INFO, walletAddress], queryFn: () => fetchWalletInfo(region, walletAddress), 
        enabled:walletAddress !== undefined});
}


export const useWalletPage = () => {
    const [walletAddress, setWalletAddress] = useState<string>()
    const [region, setRegion] = useState<STANDARD_REGIONS_API_KEYS>(POOL_NAME_ENUM.EU)

    const handleWalletAddress = (walletAddress:string) => {
        setWalletAddress(walletAddress);
    }

    const handleChangeRegion = (selectedRegion:STANDARD_REGIONS_API_KEYS) => {
        setRegion(selectedRegion);
    }

    const handleClearWalletAddress = () => {
        setWalletAddress(null);
    }

    return {
        walletAddress,
        region, 
        handleChangeRegion,
        handleClearWalletAddress,
        handleWalletAddress
    }

}


export const useFetchWorkersByWalletAddress = (region:STANDARD_REGIONS_API_KEYS, walletAddress:string, limit?:number, offset?:number) =>{

    return useQueryConfigured<WORKER_BY_WALLET_ADDRESS_RESPONSE>({region, walletAddress, limit, offset},QUERY_KEYS.WORKER, fetchWorkersByWalletAddress, 
        walletAddress !== undefined);
}