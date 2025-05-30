import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import {
  CANDIDATES_RESPONSE,
  IM_MATURED_RESPONSE,
  MATURED_RESPONSE,
} from './types';
import { getAllRegionsMaturedBlocks } from '../stats/utils';
import { filterAllSettled } from '@site/src/utils/filterAllSettled';

export const fetchMatured = async (
  region: string,
  limit = 10,
  offset = 0,
  url?: string
) => {
  try {
    const realOffset = offset * limit;
    const instance = new AxiosInstance({ region, url }).getInstance();
    const response = instance.get(
      `matured_blocks?limit=${limit}&offset=${realOffset}`
    ) as Promise<AxiosResponse<MATURED_RESPONSE, unknown>>;
    return (await response).data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};

export const fetchAllRegionsMatured = async ({
  urls,
  apiPath,
  apiConfig,
}: Parameters<typeof getAllRegionsMaturedBlocks>[0]) => {
  try {
    const instanceArray = getAllRegionsMaturedBlocks({
      urls,
      apiPath,
      apiConfig,
    });
    const statsResponses = await filterAllSettled<{ data: MATURED_RESPONSE }>(
      instanceArray
    );
    return statsResponses?.map((statsResp) => statsResp.data);
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};

export const fetchImMatured = async (
  region: string,
  limit = 10,
  offset = 0,
  url?: string
) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();
    const response = instance.get(
      `/immature_blocks?limit=${limit}&offset=${offset}`
    ) as Promise<AxiosResponse<IM_MATURED_RESPONSE, unknown>>;
    return (await response).data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};

export const fetchCandidates = async (
  region: string,
  limit = 10,
  offset = 0,
  url?: string
) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();
    const response = instance.get(
      `/candidates_blocks?limit=${limit}&offset=${offset}`
    ) as Promise<AxiosResponse<CANDIDATES_RESPONSE, unknown>>;
    return (await response).data;
  } catch (e) {
    console.error(e);
    return Promise.reject(e as AxiosError);
  }
};
