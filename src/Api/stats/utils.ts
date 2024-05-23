import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { AxiosInstance } from "../api";
import { GET_ALL_PROPS, STATS_CHARTS_RESPONSE, STATS_RESPONSE } from "./types";
import { MATURED_RESPONSE } from "../blocks/types";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

const generateAllApiInstances = ({
  urls,
  apiPath,
}: {
  urls?: POOLS_API_CONFIG_TYPE;
  apiPath?: string;
}): Record<"instances", Record<string, AxiosInstance>> => {
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

const concatApiPath = (url: string, apiPath: string) => {
  if (apiPath) return `${url}${apiPath}`;
  return url;
};

export const getAllStats = ({ apiPath, urls }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats"),
  ) as Array<Promise<{ data: STATS_RESPONSE }>>;
};

export const getAllStatsCharts = ({ apiPath, urls }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats/chart"),
  ) as Array<Promise<{ data: STATS_CHARTS_RESPONSE }>>;
};

export const getAllRegionsMaturedBlocks = ({
  apiPath,
  urls,
}: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  const limit = 5;
  const offset = 0;
  return Object.keys(allApi.instances)
    .map((key) =>
      allApi.instances[key]
        .getInstance()
        .get(`/matured_blocks?limit=${limit}&offset=${offset}`),
    ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
