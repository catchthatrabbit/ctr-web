import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { fetchMinersState } from "../Api/miners/fetchMiners";
import { STANDARD_REGIONS_API_KEYS } from '../Api/types';
import { fetchMiners } from '../Api/miners/fetchMiners';
import { useMessage } from './useMessage';

export const useFetchMinersState = (region:STANDARD_REGIONS_API_KEYS) =>{
    const {data, isError, error} = useQuery({queryKey:[QUERY_KEYS.STATE, region], queryFn: () => fetchMinersState(region)});

    return {data}
}

export const useFetchMiners = (region:STANDARD_REGIONS_API_KEYS, limit?:number, offset?:number) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region, limit, offset], queryFn: () => fetchMiners(region, limit, offset)});
}
