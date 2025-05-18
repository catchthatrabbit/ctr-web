import { AxiosError, AxiosResponse } from 'axios';
import { AxiosInstance } from '../api';
import { SETTINGS_RESPONSE } from './types';

export const fetchSettings = async ({
  region,
  url,
}: {
  region: string;
  url?: string;
}) => {
  try {
    const instance = new AxiosInstance({ region, url }).getInstance();

    const response = instance.get(`/settings`) as Promise<
      AxiosResponse<SETTINGS_RESPONSE>
    >;

    return (await response).data;
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
