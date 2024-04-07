import { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { MINERS_RESPONSE, MINERS_STATES } from "./types";
import {STANDARD_REGIONS_API_KEYS} from '../types';

export const fetchMiners = async ({region, limit = 10, offset = 0}:{region:STANDARD_REGIONS_API_KEYS, limit:number, offset:number}) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = instance.get(`/miners?limit=${limit}&offset=${offset}`) as Promise<AxiosResponse<MINERS_RESPONSE, any>>;
        return (await response).data;
    }
    catch(e){
        console.error(e)
        return Promise.reject(e as AxiosError);
    }

}

export const fetchMinersState = async ({region}:{region:STANDARD_REGIONS_API_KEYS}) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        
        const response = instance.get('/miners_stats') as Promise<AxiosResponse<MINERS_STATES, any>>;
    
        return (await response).data;
    }catch(e){
        console.error(e);

        return Promise.reject(e as AxiosError);
    }

}