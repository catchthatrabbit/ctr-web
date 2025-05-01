/**
 * It takes an array of URLs, and returns an array of data from the API
 * @param {string[]} urls - an array of URLs to fetch
 * @returns An array of objects, each object containing the data from the API which fulfilled.
 */
export const filterAllSettled = async <T>(promiseList: Array<Promise<T>>) => {
  const response = await Promise.allSettled(promiseList);

  const results = response
    .filter((resp) => resp.status === 'fulfilled')
    .map((resp) => 'value' in resp && resp.value);

  return results;
};
