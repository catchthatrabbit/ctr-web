import ExchNumberFormat from 'exchange-rounding';

/**
 * Converts a numeric value to a formatted currency string
 * @param num - The number to convert to currency format
 * @param type - The currency code (default: "XCB")
 * @param location - The locale for formatting (default: "auto")
 * @returns {string} The formatted currency string
 */
export const convertNumber2Currency = (
  num: number,
  type = "XCB",
  location: string | null = "auto",
): string => {

  // Initialize ExchNumberFormat
  const numberFormat = new ExchNumberFormat(location, {
    style: "currency",
    currency: type,
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
    cropZeros: true,
  });

  // Check if the format method exists
  if (typeof numberFormat.format !== "function") {
    throw new Error("ExchNumberFormat.format is not a function");
  }

  const formattedNumber = numberFormat.format(num);

  return formattedNumber;
};
