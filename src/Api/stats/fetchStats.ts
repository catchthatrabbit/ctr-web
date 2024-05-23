import { GET_ALL_PROPS, STATS_RESPONSE } from "./types";
import { filterAllSettled } from "@site/src/utils/filterAllSettled";
import { getAllStats } from "./utils";
import { AxiosError } from "axios";

export const fetchStats = async ({ urls, apiPath }: GET_ALL_PROPS) => {
  try {
    const instanceArray = getAllStats({ urls, apiPath });
    const statsResponses = await filterAllSettled<{ data: STATS_RESPONSE }>(
      instanceArray,
    );
    return statsResponses?.map((statsResp) => statsResp.data);
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
