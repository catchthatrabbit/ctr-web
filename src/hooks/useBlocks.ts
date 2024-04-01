import {useQueries} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_KEYS } from '../Api/types';
import { fetchMatured, fetchImMatured, fetchCandidates, fetchAllRegionsMatured} from '@site/src/Api/blocks/fetchBlocks';

export const useFetchAllBlocks = (region:STANDARD_REGIONS_API_KEYS, limit?:number, offset?:number) =>{
    return useQueries({queries:[
            {queryKey:[QUERY_KEYS.MATURED, region, limit, offset], queryFn: () => fetchMatured(region, limit, offset)},
            {queryKey:[QUERY_KEYS.IM_MATURED, region, limit, offset], queryFn: () => fetchImMatured(region, limit, offset)},
            {queryKey:[QUERY_KEYS.CANDIDATES, region, limit, offset], queryFn: () => fetchCandidates(region, limit, offset)}
        ]});
}


export const useFetchAllRegionsMaturedBlocks = () =>{
    return useQueries({queries:[
            {queryKey:[QUERY_KEYS.ALL_REGIONS_MATURED], queryFn: () => fetchAllRegionsMatured()}
        ]});
}

