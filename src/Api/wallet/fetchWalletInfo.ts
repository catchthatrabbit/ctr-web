import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { STANDARD_REGIONS_API_VALUES } from "../types";
import { WALLET_INFO_RESPONSE } from "./types";

export const fetchWalletInfo = async (region:STANDARD_REGIONS_API_VALUES, walletAddress:string) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get(`/accounts/${walletAddress}`) as AxiosResponse<WALLET_INFO_RESPONSE>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as WALLET_INFO_RESPONSE;
    }

}