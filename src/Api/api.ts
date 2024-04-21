import axios from "axios";
import { STANDARD_REGIONS_API_KEYS } from "./types";
import { API_SWITCH } from "../configs/pool-endpoints.config";

class AxiosInstance {
  _axiosInstance;

  constructor(region?: STANDARD_REGIONS_API_KEYS) {
    this._axiosInstance = axios.create({
      baseURL: API_SWITCH[region],
    });
  }

  getInstance = () => {
    return this._axiosInstance;
  };
}

export { AxiosInstance };
