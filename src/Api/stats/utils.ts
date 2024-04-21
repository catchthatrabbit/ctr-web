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
      [POOL_NAME_ENUM.EU]: new AxiosInstance(POOL_NAME_ENUM.EU),
      [POOL_NAME_ENUM.EU_BACKUP]: new AxiosInstance(POOL_NAME_ENUM.EU_BACKUP),
      [POOL_NAME_ENUM.AS]: new AxiosInstance(POOL_NAME_ENUM.AS),
      [POOL_NAME_ENUM.AS_BACKUP]: new AxiosInstance(POOL_NAME_ENUM.AS_BACKUP),
      [POOL_NAME_ENUM.US]: new AxiosInstance(POOL_NAME_ENUM.US),
      [POOL_NAME_ENUM.US_BACKUP]: new AxiosInstance(POOL_NAME_ENUM.US_BACKUP),
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
    .filter(
      (key) => key !== POOL_NAME_ENUM.US && key !== POOL_NAME_ENUM.US_BACKUP,
    )
    .map((key) =>
      allApi.instances[key]
        .getInstance()
        .get(`/matured_blocks?limit=${limit}&offset=${offset}`),
    ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
