import { STATS_CHARTS_RESPONSE, STATS_RESPONSE } from "./types";
import { filterAllSettled } from "@site/src/utils/filterAllSettled";
import { getAllStatsCharts } from "./utils";
import { AxiosError } from "axios";

export const fetchStatsCharts = async () => {
    try{
        const instanceArray = getAllStatsCharts();
        const statsResponses = await filterAllSettled<{data:STATS_CHARTS_RESPONSE}>(instanceArray)
        return statsResponses?.map(statsResp => statsResp.data);
    }catch(e){
        console.error(e);

        return e as AxiosError;
    }

}
