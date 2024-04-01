import { STATS_RESPONSE } from "./types";
import { filterAllSettled } from "@site/src/utils/filterAllSettled";
import { getAllStats } from "./utils";
import { AxiosError } from "axios";

export const fetchStats = async () => {

    try{

        const instanceArray = getAllStats();
        const statsResponses = await filterAllSettled<{data:STATS_RESPONSE}>(instanceArray)
        return statsResponses?.map(statsResp => statsResp.data);
    }catch(e){
        console.error(e);

        return e as AxiosError;
    }

}
