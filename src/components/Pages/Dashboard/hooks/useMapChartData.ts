import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useFetchStats } from "@site/src/hooks/useStats";
import {
  aggregateNumbers,
  convertPoolChartDataToMapChartInfoBox,
  reduceList,
} from "../utils";
import { WHITELIST_AGGREGATE_KEYS } from "@site/src/configs/aggregate-keys.config";
import { STATS_RESPONSE } from "@site/src/Api/stats/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect, useState } from "react";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { profitabilityCalculation } from "@site/src/utils/profitabilityCalculation";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

interface MapChartData {
  poolFee: string | number;
  infoBoxItems: Array<{ title: string; value: TextFormatOutputType }>;
}

const useMapChartData = () => {
  const { siteConfig } = useDocusaurusContext();
  const [chartData, setChartData] = useState<MapChartData>({
    poolFee: "",
    infoBoxItems: [],
  });

  const { data: statsResponse, isLoading } = useFetchStats({
    urls: siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
    apiPath: String(siteConfig.customFields.API_PATH),
  });

  const { data: settingsResponse } = useFetchSettings(POOL_NAME_ENUM.DE);

  useEffect(() => {
    const fetchData = async () => {
      const aggregator = aggregateNumbers(WHITELIST_AGGREGATE_KEYS.home.jumbotron);
      let stats: STATS_RESPONSE = null;

      if (statsResponse?.length > 0) {
        stats = reduceList(statsResponse, aggregator);
      }

      const profitability = await profitabilityCalculation(
        1000,
        siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
        siteConfig.customFields.API_PATH as string,
        "usd",
        "monthly"
      );
      const data = await convertPoolChartDataToMapChartInfoBox(
        stats,
        settingsResponse,
        profitability === false ? undefined : { revenue: profitability.revenue }
      );
      setChartData(data);
    };

    fetchData();
  }, [statsResponse, settingsResponse, siteConfig.customFields.API_ENDPOINTS, siteConfig.customFields.API_PATH]);

  return {
    ...chartData,
    isLoading,
  };
};

export default useMapChartData;
