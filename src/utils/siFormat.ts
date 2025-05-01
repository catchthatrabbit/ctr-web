/**
 * Formats a number using SI (International System of Units) notation
 * @param num - The number to format
 * @param digits - The number of decimal places to include
 * @returns {string} The formatted number with appropriate SI unit suffix
 */
export const siFormat = (num: number, digits: number): string => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (num / si[i].value).toFixed(digits).replace(rx, '$1') + ' ' + si[i].symbol
  );
};

/**
 * Converts a number to kilos (divides by 1000)
 * @param num - The number to convert
 * @returns {number} The number divided by 1000, or 0 if input is NaN
 */
export const convert2kilo = (num: number): number => {
  if (isNaN(num)) return 0;

  return num / 1000;
};
