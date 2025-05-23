/**
 * Formats a number according to the specified locale
 * @param number - The number or numeric string to format
 * @param location - The locale to use for formatting (default: "en-US")
 * @returns {string} The formatted number as a string
 */
export function numberFormat(
  number: string | number,
  location = 'en-US'
): string {
  return new Intl.NumberFormat(location).format(Number(number));
}
