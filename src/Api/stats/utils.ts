import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { AxiosInstance } from "../api";
import { GET_ALL_PROPS, STATS_CHARTS_RESPONSE, STATS_RESPONSE } from "./types";
import { MATURED_RESPONSE } from "../blocks/types";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

const generateAllApiInstances = ({
  urls,
  apiPath,
}: {
  urls: POOLS_API_CONFIG_TYPE;
  apiPath: string;
}): Record<"instances", Record<string, AxiosInstance>> => {
  return {
    instances: {
      [POOL_NAME_ENUM.DE]: new AxiosInstance({
        region: POOL_NAME_ENUM.DE,
        url: concatApiPath(urls.DE_API_ENDPOINT, apiPath)
      }),
      [POOL_NAME_ENUM.FI]: new AxiosInstance({
        region: POOL_NAME_ENUM.FI,
        url: concatApiPath(urls.FI_API_ENDPOINT, apiPath)
      }),
      [POOL_NAME_ENUM.SG]: new AxiosInstance({
        region: POOL_NAME_ENUM.SG,
        url: concatApiPath(urls.SG_API_ENDPOINT, apiPath)
      }),
      [POOL_NAME_ENUM.HK]: new AxiosInstance({
        region: POOL_NAME_ENUM.HK,
        url: concatApiPath(urls.HK_API_ENDPOINT, apiPath)
      }),
      [POOL_NAME_ENUM.BR]: new AxiosInstance({
        region: POOL_NAME_ENUM.BR,
        url: concatApiPath(urls.BR_API_ENDPOINT, apiPath)
      }),
      [POOL_NAME_ENUM.JP]: new AxiosInstance({
        region: POOL_NAME_ENUM.JP,
        url: concatApiPath(urls.JP_API_ENDPOINT, apiPath)
      }),
    },
  };
};

const concatApiPath = (url: string, apiPath: string) => {
  if (url.endsWith("/")) return `${url}${apiPath}`;
  return `${url}/${apiPath}`;
};

export const getAllStats = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats"),
  ) as Array<Promise<{ data: STATS_RESPONSE }>>;
};

export const getAllStatsCharts = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key].getInstance().get("/stats/chart"),
  ) as Array<Promise<{ data: STATS_CHARTS_RESPONSE }>>;
};

export const getAllRegionsMaturedBlocks = ({ urls, apiPath }: GET_ALL_PROPS) => {
  const allApi = generateAllApiInstances({ urls, apiPath });
  const limit = 5;
  const offset = 0;
  return Object.keys(allApi.instances).map((key) =>
    allApi.instances[key]
      .getInstance()
      .get(`/matured_blocks?limit=${limit}&offset=${offset}`),
  ) as Array<Promise<{ data: MATURED_RESPONSE }>>;
};
