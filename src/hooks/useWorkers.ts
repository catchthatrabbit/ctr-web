import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_VALUES } from '../Api/types';
import { fetchWorkersByWalletAddress } from '../Api/workers/fetchWorkers';


export const useFetchWorkersByWalletAddress = (region:STANDARD_REGIONS_API_VALUES, walletAddress:string, limit?:number, offset?:number) =>{
    return useQuery({queryKey:[QUERY_KEYS.WORKER, walletAddress, limit, offset], queryFn: () => fetchWorkersByWalletAddress(region, walletAddress, limit, offset), 
        enabled:walletAddress !== undefined});
}