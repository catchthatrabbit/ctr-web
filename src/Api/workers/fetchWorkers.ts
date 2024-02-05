import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { STANDARD_REGIONS_API_VALUES } from "../types";
import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from "./types";

export const fetchWorkersByWalletAddress = async (region:STANDARD_REGIONS_API_VALUES, walletAddress:string, limit = 10, offset = 0) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get(`/workers/${walletAddress}?limit=${limit}&offset=${offset}`) as AxiosResponse<WORKER_BY_WALLET_ADDRESS_RESPONSE>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as WORKER_BY_WALLET_ADDRESS_RESPONSE;
    }

}