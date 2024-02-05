import { AxiosResponse } from "axios";
import { AxiosInstance } from "../api"
import { STANDARD_REGIONS_API_VALUES } from "../types";
import { PAYMENTS_BY_WALLET_ADDRESS_RESPONSE, PAYMENTS_RESPONSE, PAYMENTS_STATE } from "./types";

export const fetchPaymentsByWalletAddress = async (region:STANDARD_REGIONS_API_VALUES, walletAddress:string, limit = 10, offset = 0) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get(`/payments/${walletAddress}?limit=${limit}&offset=${offset}`) as AxiosResponse<PAYMENTS_BY_WALLET_ADDRESS_RESPONSE>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as PAYMENTS_BY_WALLET_ADDRESS_RESPONSE;
    }

}

export const fetchPayments = async (region:STANDARD_REGIONS_API_VALUES, limit = 10, offset = 0) => {

    try{
        const instance = new AxiosInstance(region).getInstance();
    
        const response = await (instance.get(`/payments?limit=${limit}&offset=${offset}`) as AxiosResponse<PAYMENTS_RESPONSE>);
    
        return response.data;
    }catch(e){
        console.error(e);

        return {} as PAYMENTS_RESPONSE;
    }

}

export const fetchPaymentsState = async (region:STANDARD_REGIONS_API_VALUES) => {
    try{
        const instance = new AxiosInstance(region).getInstance();
        const response = await (instance.get(`/payments_stats`) as AxiosResponse<PAYMENTS_STATE>);
        return response.data;
    }
    catch(e){
        console.error(e)
        return {} as PAYMENTS_STATE;
    }

}