import { GET_ALL_PROPS, STATS_CHARTS_RESPONSE } from "./types";
import { filterAllSettled } from "@site/src/utils/filterAllSettled";
import { getAllStatsCharts } from "./utils";
import { AxiosError } from "axios";

export const fetchStatsCharts = async ({ apiPath, urls }: GET_ALL_PROPS) => {
  try {
    const instanceArray = getAllStatsCharts({ urls, apiPath });
    const statsResponses = await filterAllSettled<{
      data: STATS_CHARTS_RESPONSE;
    }>(instanceArray);
    return statsResponses?.map((statsResp) => statsResp.data);
  } catch (e) {
    console.error(e);

    return Promise.reject(e as AxiosError);
  }
};
