import { fetchStats } from "./fetchStats";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

export const fetchNetworkDifficulty = async (urls: POOLS_API_CONFIG_TYPE, apiPath: string): Promise<number> => {
  try {
    const stats = await fetchStats({ urls, apiPath });
    if (!stats || !stats.length || !stats[0].nodes || !stats[0].nodes.length) {
      throw new Error("No node data available");
    }
    return Number(stats[0].nodes[0].difficulty);
  } catch (error) {
    console.error("Error fetching network difficulty:", error);
    throw error;
  }
};
