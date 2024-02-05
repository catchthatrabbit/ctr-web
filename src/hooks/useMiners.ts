import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { fetchMinersState } from "../Api/miners/fetchMiners";
import { STANDARD_REGIONS_API_VALUES } from '../Api/types';
import { fetchMiners } from '../Api/miners/fetchMiners';

export const useFetchMinersState = (region:STANDARD_REGIONS_API_VALUES) =>{
    return useQuery({queryKey:[QUERY_KEYS.STATE, region], queryFn: () => fetchMinersState(region)});
}

export const useFetchMiners = (region:STANDARD_REGIONS_API_VALUES, limit?:number, offset?:number) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region, limit, offset], queryFn: () => fetchMiners(region, limit, offset)});
}
