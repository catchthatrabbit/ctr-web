import {useQueries, UseQueryResult} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_KEYS } from '../Api/types';
import { fetchMatured, fetchImMatured, fetchCandidates, fetchAllRegionsMatured} from '@site/src/Api/blocks/fetchBlocks';
import { useMessage } from './useMessage';
import { DEFAULT_REACT_QUERY_OPTIONS } from '../configs/reactQuery.config';
import { CANDIDATES_RESPONSE, IM_MATURED_RESPONSE, MATURED_RESPONSE } from '../Api/blocks/types';
import { useQueryConfigured } from './useQueryConfigured';

export const useFetchAllBlocks = (region:STANDARD_REGIONS_API_KEYS, limit?:number, offset?:number) =>{

    const {setMessage, message} = useMessage();

    const resultArray = useQueries({queries:[
            {queryKey:[QUERY_KEYS.MATURED, region, limit, offset], queryFn: () => fetchMatured(region, limit, offset),
                 ...DEFAULT_REACT_QUERY_OPTIONS},
            {queryKey:[QUERY_KEYS.IM_MATURED, region, limit, offset], queryFn: () => fetchImMatured(region, limit, offset), 
                ...DEFAULT_REACT_QUERY_OPTIONS},
            {queryKey:[QUERY_KEYS.CANDIDATES, region, limit, offset], queryFn: () => fetchCandidates(region, limit, offset),
                 ...DEFAULT_REACT_QUERY_OPTIONS}
     ]});

    const isErrorMatured = resultArray[0]?.isError;
    const isErrorImMatured = resultArray[1]?.isError;
    const isErrorCandidates = resultArray[2]?.isError;

    if(isErrorMatured && !message?.text)
        setMessage({text:resultArray[0].error.message, type:"error"});
    if(isErrorImMatured && !message?.text)
        setMessage({text:resultArray[1].error.message, type:"error"});
    if(isErrorCandidates && !message?.text)
        setMessage({text:resultArray[2].error.message, type:"error"});

    return resultArray as [UseQueryResult<MATURED_RESPONSE, Error>, UseQueryResult<IM_MATURED_RESPONSE, Error>, UseQueryResult<CANDIDATES_RESPONSE, Error>];
}


export const useFetchAllRegionsMaturedBlocks = () =>{
    return useQueryConfigured<MATURED_RESPONSE[]>({} ,QUERY_KEYS.ALL_REGIONS_MATURED, fetchAllRegionsMatured);
}

