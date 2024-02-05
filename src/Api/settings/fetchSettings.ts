import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { STANDARD_REGIONS_API_VALUES } from "../types";
import {SETTINGS_RESPONSE } from "./types";

export const fetchSettings = async (region:STANDARD_REGIONS_API_VALUES) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get(`/settings`) as AxiosResponse<SETTINGS_RESPONSE>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as SETTINGS_RESPONSE;
    }

}