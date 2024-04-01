import { AxiosError, AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { STANDARD_REGIONS_API_KEYS } from "../types";
import {SETTINGS_RESPONSE } from "./types";

export const fetchSettings = async ({region}:{region:STANDARD_REGIONS_API_KEYS}) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = instance.get(`/settings`) as Promise<AxiosResponse<SETTINGS_RESPONSE>>;
    
        return (await response).data;
    }catch(e){
        console.error(e);

        return Promise.reject(e as AxiosError);
    }

}