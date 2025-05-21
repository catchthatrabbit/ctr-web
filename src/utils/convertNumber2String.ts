/**
 * Converts a number or string value to a string
 * @param num - The number or string to convert
 * @returns {string} The converted string value, returns "0" if input is null or undefined
 */
export const convertNumber2String = (num: number | string): string => {
  if (num === null || num === undefined) return "0";

  return num.toString();
};
