import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { AxiosInstance } from "../api";
import { STATS_CHARTS_RESPONSE, STATS_RESPONSE } from "./types";
import { MATURED_RESPONSE } from "../blocks/types";

const generateAllApiInstances = (): Record<
  "instances",
  Record<string, AxiosInstance>
> => {
  return {
    instances: {
      [POOL_NAME_ENUM.DE]: new AxiosInstance(POOL_NAME_ENUM.DE),
      [POOL_NAME_ENUM.FI]: new AxiosInstance(POOL_NAME_ENUM.FI),
      [POOL_NAME_ENUM.SG]: new AxiosInstance(POOL_NAME_ENUM.SG),
      [POOL_NAME_ENUM.HK]: new AxiosInstance(POOL_NAME_ENUM.HK),
      [POOL_NAME_ENUM.AM]: new AxiosInstance(POOL_NAME_ENUM.AM),
      [POOL_NAME_ENUM.AM1]: new AxiosInstance(POOL_NAME_ENUM.AM1),
    },
  };
};

export const getAllStats = () => {
  const allApi = generateAllApiInstances();
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats"),
  ) as Array<Promise<{ data: STATS_RESPONSE }>>;
};

export const getAllStatsCharts = () => {
  const allApi = generateAllApiInstances();
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats/chart"),
  ) as Array<Promise<{ data: STATS_CHARTS_RESPONSE }>>;
};

export const getAllRegionsMaturedBlocks = (limit = 5, offset = 0) => {
  const allApi = generateAllApiInstances();
  return Object.keys(allApi.instances)
    .map((key) =>
      allApi.instances[key]
        .getInstance()
        .get(`/matured_blocks?limit=${limit}&offset=${offset}`),
    ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
