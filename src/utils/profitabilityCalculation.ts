import { BLOCK_TIME, BLOCK_REWARD_XCB, SECONDS_PER_DAY } from "../components/Pages/Dashboard/constants";
import { fetchNetworkDifficulty } from "../Api/stats/fetchDifficulty";
import { fetchXcbPrice } from "../Api/price/fetchPrice";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";

/**
 * Calculate estimated mining profitability for Core Blockchain.
 *
 * @param {number} userHashrate - User's hashrate in H/s.
 * @param {POOLS_API_CONFIG_TYPE} urls - Pool API endpoints configuration.
 * @param {string} apiPath - API path for the endpoints.
 * @param {string} [currency="usd"] - Currency symbol or code (e.g., "usd", "eur").
 * @param {string} [period] - Period to calculate profitability for (e.g., "daily", "weekly", "monthly", "yearly").
 * @param {number} [powerConsumption] - Optional power usage in Watts.
 * @param {number} [electricityRate] - Optional electricity rate per kWh in the given currency.
 * @returns Object with profitability data for the specified period in XCB and the chosen currency.
 */
export const profitabilityCalculation = async (
  userHashrate: number,
  urls: POOLS_API_CONFIG_TYPE,
  apiPath: string,
  currency: string = "usd",
  period: string,
  powerConsumption?: number,
  electricityRate?: number
) => {
  if (typeof currency !== 'string') {
    console.warn('Currency is not valid, using default currency: usd');
    currency = 'usd';
  }

  // Fetch XCB price in the specified currency
  let xcbPrice: number;
  try {
    xcbPrice = await fetchXcbPrice(currency.toString());
  } catch (error) {
    console.error('Error fetching XCB price');
    return false;
  }

  // Fetch network difficulty
  let networkDifficulty: number;
  try {
    const difficulty = await fetchNetworkDifficulty(urls, apiPath);
    networkDifficulty = difficulty || 0;
  } catch (error) {
    console.error('Error fetching network difficulty');
    return false;
  }

  // Calculate network hashrate from difficulty
  const networkHashrate = networkDifficulty / BLOCK_TIME;

  // Prevent division by zero
  if (networkHashrate === 0) {
    console.error('Network hashrate is zero in profitabilityCalculation');
    return false;
  }

  const blocksPerDay = SECONDS_PER_DAY / BLOCK_TIME;
  const userShare = userHashrate / networkHashrate;

  const dailyRewardXCB = blocksPerDay * BLOCK_REWARD_XCB * userShare;
  const dailyRevenue = dailyRewardXCB * xcbPrice;

  // Calculate period multiplier
  const periodMultiplier = getPeriodMultiplier(period);

  // Calculate period values
  const periodRewardXCB = dailyRewardXCB * periodMultiplier;
  const periodRevenue = dailyRevenue * periodMultiplier;

  let periodElectricityCost: number | undefined = undefined;
  let periodProfit: number | undefined = undefined;

  if (powerConsumption !== undefined && electricityRate !== undefined) {
    periodElectricityCost = calculatePeriodCost(powerConsumption, electricityRate, period);
    periodProfit = periodRevenue - periodElectricityCost;
  }

  const result = {
    currency,
    period,
    rewardXCB: periodRewardXCB,
    revenue: periodRevenue,
    electricityCost: periodElectricityCost,
    profit: periodProfit,
    xcbPrice,
  };

  // If no specific period was provided (using the default), add all period calculations
  if (!period) {
    return {
      ...result,
      rewardXCBDaily: dailyRewardXCB,
      rewardXCBWeekly: dailyRewardXCB * 7,
      rewardXCBMonthly: dailyRewardXCB * 30,
      rewardXCBYearly: dailyRewardXCB * 365,
      revenueDaily: dailyRevenue,
      revenueWeekly: dailyRevenue * 7,
      revenueMonthly: dailyRevenue * 30,
      revenueYearly: dailyRevenue * 365,
    };
  }

  return result;
};

/**
 * Get multiplier for converting daily values to the specified period.
 *
 * @param {string} period - Period to calculate for (daily, weekly, monthly, yearly).
 * @returns {number} - Multiplier for the specified period.
 */
const getPeriodMultiplier = (period: string): number => {
  switch (period.toLowerCase()) {
    case "daily":
      return 1;
    case "weekly":
      return 7;
    case "monthly":
      return 30;
    case "yearly":
      return 365;
    default:
      return 1;
  }
};

/**
 * Calculate electricity cost for the specified period.
 *
 * @param {number} powerConsumption - Power consumption in Watts.
 * @param {number} electricityRate - Electricity rate per kWh.
 * @param {string} period - Period to calculate for.
 * @returns {number} - Electricity cost for the specified period.
 */
const calculatePeriodCost = (
  powerConsumption: number,
  electricityRate: number,
  period: string
): number => {
  const dailyPowerKWh = (powerConsumption * 24) / 1000;
  const dailyCost = dailyPowerKWh * electricityRate;
  const periodMultiplier = getPeriodMultiplier(period);

  return dailyCost * periodMultiplier;
};
