import axios from "axios";
import { STANDARD_REGIONS_API_VALUES } from "./types";

class AxiosInstance {

    _axiosInstance;

    constructor(region?: STANDARD_REGIONS_API_VALUES){

        this._axiosInstance = axios.create({
            baseURL: `https://${region}-api.catchthatrabbit.com/v2/api/`,
            timeout: 1000,
          });
    }

    getInstance = () => {
        return this._axiosInstance;
    }

}

export {AxiosInstance};