import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from "@site/src/constants/queryKeys";
import { STANDARD_REGIONS_API_VALUES } from '@site/src/Api/types';
import { fetchSettings } from '../Api/settings/fetchSettings';

export const useFetchSettings = (region:STANDARD_REGIONS_API_VALUES) =>{
    return useQuery({queryKey:[QUERY_KEYS.MINERS, region], 
        queryFn: () => fetchSettings(region)});
}
