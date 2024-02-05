import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { CANDIDATES_RESPONSE, IM_MATURED_RESPONSE, MATURED_RESPONSE } from "./types";
import {STANDARD_REGIONS_API_VALUES} from '../types';

export const fetchMatured = async (region:STANDARD_REGIONS_API_VALUES, limit = 10, offset = 0) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = await (instance.get(`/matured_blocks?limit=${limit}&offset=${offset}`) as AxiosResponse<MATURED_RESPONSE>);
        return response.data;
    }
    catch(e){
        console.error(e)
        return {} as MATURED_RESPONSE;
    }

}

export const fetchImMatured = async (region:STANDARD_REGIONS_API_VALUES, limit = 10, offset = 0) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = await (instance.get(`/immature_blocks?limit=${limit}&offset=${offset}`) as AxiosResponse<IM_MATURED_RESPONSE>);
        return response.data;
    }
    catch(e){
        console.error(e)
        return {} as IM_MATURED_RESPONSE;
    }

}


export const fetchCandidates = async (region:STANDARD_REGIONS_API_VALUES, limit = 10, offset = 0) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = await (instance.get(`/candidates_blocks?limit=${limit}&offset=${offset}`) as AxiosResponse<CANDIDATES_RESPONSE>);
        return response.data;
    }
    catch(e){
        console.error(e)
        return {} as CANDIDATES_RESPONSE;
    }

}

