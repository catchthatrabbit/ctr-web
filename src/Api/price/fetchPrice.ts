import { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import { XCB_PRICE_RESPONSE } from "./types";

/**
 * Fetches the current XCB price in the specified currency
 *
 * @param {string} currency - The currency to get the XCB price in (e.g., "usd", "eur")
 * @returns {Promise<number>} - The XCB price in the specified currency
 */
export const fetchXcbPrice = async (currency: string = "usd", providerUrl: string): Promise<number> => {
  try {
    const normalizedCurrency = currency.toLowerCase();
    const response = await axios.get(
      `${providerUrl}/rates/xcb/${normalizedCurrency}`
    ) as AxiosResponse<XCB_PRICE_RESPONSE>;

    if (response.data && typeof response.data.rate === 'number') {
      return response.data.rate;
    } else {
      console.error('Invalid response format from XCB price API:', response.data);
      return 0;
    }
  } catch (e) {
    console.error('Error fetching XCB price:', e);
    return Promise.reject(e as AxiosError);
  }
};
