import { isNumberString } from "@site/src/utils/isNumber";
import {
  STATS_CHARTS_RESPONSE,
  STATS_RESPONSE,
} from "@site/src/Api/stats/types";
import { TextFormat } from "@site/src/utils/textFormat";
import { convertTime2Date } from "@site/src/utils/convertTime2Date";
import { UNITS } from "@site/src/constants/units";
import { ChartItem } from "./types";
import { BLOCK_TIME } from "./constants";
import { SETTINGS_RESPONSE } from "@site/src/Api/settings/types";
import { MATURED_RESPONSE } from "@site/src/Api/blocks/types";
import { summarizedText } from "@site/src/utils/summarizedText";
import { profitabilityCalculation } from "@site/src/utils/profitabilityCalculation";

/**
 * Given a list of items, and a function that takes two items and returns a single item, return the
 * single item that is the result of applying the function to each item in the list
 * @param {T[]} list - The list of items to aggregate.
 * @param by - A reducer function that takes two parameters and returns a single value.
 * @returns The result of the reduce function.
 */
export const reduceList = <T>(list: T[], by: (x: T, y: T) => T): T => {
  if (!Array.isArray(list)) throw new Error("list must be an array");

  const [first, ...rest] = list;
  return rest.reduce(by, first);
};

const AGGREGATE_MAPPER: Record<
  string,
  (
    x: unknown,
    y: unknown,
    whitelist?: string[],
    blacklist?: string[],
  ) => unknown
> = {
  "number:true|object:false|array:false": (x: number, y: number) => +x + +y,
  "number:false|object:true|array:false": (
    x: object,
    y: object,
    whitelist,
    blacklist,
  ) => aggregateNumbers(whitelist, blacklist)(x, y),
  "number:false|object:true|array:true": (x: [], y: [], whitelist, blacklist) =>
    x.map((item, index) =>
      aggregateNumbers(whitelist, blacklist)(item, y[index]),
    ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  "number:false|object:false|array:false": (x: unknown, _) => x,
};

/**
 * It creates a function based on "whitelist" and "blacklist" which takes two objects and returns a new object that is the result of adding the values of the same
 * keys in both objects
 * @param {string[]} whitelist - an array of strings that are the keys of the object you want to
 * aggregate.
 * - pass a string array to utilize the "whitelist"
 * - pass an empty array to accept all keys
 * - pass null to utilize the "blacklist"
 * @param {string[]} blacklist - an array of strings that are the keys of the object you do not want to
 * aggregate.
 * - must pass null for "whitelist" to utilize the "blacklist"
 * @returns The result of the aggregation.
 */
export const aggregateNumbers =
  (whitelist?: string[], blacklist?: string[]) =>
  <T>(source: T, target: T): T => {
    if (
      source === undefined ||
      source === null ||
      target === undefined ||
      target === null
    )
      return source;

    const result = {} as T;
    Object.entries(source).forEach(([key, value]) => {
      result[key] = value;

      if (
        !whitelist?.length ||
        whitelist?.includes(key) ||
        (!!blacklist?.length && !blacklist?.includes(key))
      ) {
        const isNumber = typeof value === "number" || isNumberString(value);
        const isObject = typeof value === "object";
        const isArray = Array.isArray(value);
        const type = `number:${isNumber}|object:${isObject}|array:${isArray}`;

        result[key] = AGGREGATE_MAPPER[type](
          value,
          target[key],
          whitelist,
          blacklist,
        );
      }
    });

    return result;
  };

export const convertPoolChartDataToMapChartInfoBox = async (
  data: STATS_RESPONSE,
  settings: SETTINGS_RESPONSE,
  profitabilityData?: { revenue: number }
) => {
  if (!data || !settings) {
    return {
      poolFee: "",
      infoBoxItems: [],
    };
  }

  const [node] = data.nodes;
  const { roundShares } = data.stats;

  return {
    poolFee: settings.PoolFee,
    infoBoxItems: [
      {
        title: "CTR hashrate:",
        value: data.hashrate ? TextFormat.getHashText(data.hashrate) : TextFormat.getDefaultText("×"),
      },
      {
        title: "XCB hashrate:",
        value: node.difficulty ? TextFormat.getHashText(Number(node.difficulty) / BLOCK_TIME) : TextFormat.getDefaultText("×"),
      },
      {
        title: "Difficulty:",
        value: node.difficulty ? TextFormat.getHashText(Number(node.difficulty), "") : TextFormat.getDefaultText("×"),
      },
      {
        title: "Miners:",
        value: data.minersTotal ? TextFormat.getNumberText(data.minersTotal) : TextFormat.getDefaultText("×"),
      },
      {
        title: "Variance:",
        value: roundShares && node.difficulty ? TextFormat.getPercentText(
          ((100 * Number(roundShares)) / Number(node.difficulty)).toFixed(2),
        ) : TextFormat.getDefaultText("×"),
      },
      {
        title: "Profit:",
        value: profitabilityData?.revenue !== undefined ? TextFormat.getProfitabilityText(profitabilityData.revenue.toFixed(2), "1kh/s", "monthly", false) : TextFormat.getDefaultText("×"),
      },
    ],
  };
};

export const convertPoolChartDataToRadialInfoBox = (
  data: STATS_CHARTS_RESPONSE & { lastBlockFound: number },
) => {
  if (!data?.nodes) return [];

  const [node] = data.nodes;

  return [
    {
      title: "Network difficulty",
      value: TextFormat.getHashText(Number(node.difficulty || 0)),
    },
    {
      title: "Blockchain Height",
      value: TextFormat.getNumberText(node.height),
    },
    {
      title: "Round Shares",
      value: TextFormat.getNumberText(data.stats.roundShares),
    },
    {
      title: "Last block found",
      value: TextFormat.getAgoText(convertTime2Date(data.stats.lastBlockFound)),
    },
    {
      title: "Block reward",
      value: TextFormat.getXCBText(Number(data.blockReward || 0) / UNITS.CORE),
    },
  ];
};

export const convertPoolChartDataToChartData = (
  poolCharts: Array<{ x: unknown; y: unknown }>,
): ChartItem[] => {
  if (!poolCharts) return [];
  //
  // map chart items to proper shape for the chart
  const chartItemMapper = (item) => ({
    value: item.y,
    time: convertTime2Date(item.x),
    hour: convertTime2Date(item.x, { hour: "2-digit", hour12: false }),
  });

  //
  // reduce the amount of data by calculating their averages per an hour
  // it preserves latest chart item date of an average group as "time" field to show on chart by hovering
  const chartItemAverageReducer = (
    averages: Map<string, ChartItem>,
    chartItem: ChartItem,
  ) => {
    if (!averages.has(chartItem.hour)) {
      averages.set(chartItem.hour, chartItem);
    } else {
      const chartItemAvg = averages.get(chartItem.hour) as ChartItem;
      chartItemAvg.value += chartItem.value;
      chartItemAvg.value /= 2;
      averages.set(chartItemAvg.hour, chartItemAvg);
    }

    return averages;
  };

  const averagePerHours = poolCharts
    .sort((first, second) => (first.x < second.x ? 1 : -1)) // sort chart items based on their timestamp which is filed "x"
    .map(chartItemMapper)
    .reduce(chartItemAverageReducer, new Map<string, ChartItem>());

  return [...averagePerHours.values()];
};

export const convertMaturedResponseToRecentBlocksInfo = (
  data: MATURED_RESPONSE[] = [],
): Array<{
  height: string;
  type: string;
  minedOn: string;
  blockHash: string;
  reward: string;
  variance: string;
}> => {
  // Ensure data is an array
  if (!Array.isArray(data)) {
    console.warn("Matured blocks data is not an array. Returning empty array.");
    return [];
  }

  try {
    const result = data.map((items) =>
      Array.isArray(items.matured)
        ? items.matured.map((item) => ({
            height_summarized: String(item.height || "N/A"),
            height: String(item.height || "N/A"),
            type: item.uncle ? "Uncle" : item.orphan ? "Orphan" : "Block",
            minedOn: item.timestamp
              ? convertTime2Date(item.timestamp)
              : "Unknown",
            blockHash: item.hash || "N/A",
            blockHash_summarized:
              item.hash === "0x0"
                ? "❌"
                : summarizedText(
                    item.hash || "N/A",
                    10,
                    (item.hash || "").length - 6,
                  ),
            reward: TextFormat.getXCBText(Number(item.reward || 0) / UNITS.CORE)
              .text,
            variance:
              item.shares && item.difficulty
                ? `${(
                    (100 * Number(item.shares)) /
                    Number(item.difficulty)
                  ).toFixed(2)}%`
                : "N/A",
          }))
        : [],
    );

    // Flatten the result and sort by minedOn
    return []
      .concat(...result)
      .sort((a, b) => (a["minedOn"] < b["minedOn"] ? 1 : -1));
  } catch (error) {
    console.error(
      "Error processing matured blocks data. Returning empty array:",
      error,
    );
    return [];
  }
};
