import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { MINERS_RESPONSE, MINERS_STATES } from "./types";
import {STANDARD_REGIONS_API_VALUES} from '../types';

export const fetchMiners = async (region:STANDARD_REGIONS_API_VALUES, limit = 10, offset = 0) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = await (instance.get(`/miners?limit=${limit}&offset=${offset}`) as AxiosResponse<MINERS_RESPONSE>);
        return response.data;
    }
    catch(e){
        console.error(e)
        return {} as MINERS_RESPONSE;
    }

}

export const fetchMinersState = async (region:STANDARD_REGIONS_API_VALUES) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get('/miners_stats') as AxiosResponse<MINERS_STATES>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as MINERS_STATES;
    }

}