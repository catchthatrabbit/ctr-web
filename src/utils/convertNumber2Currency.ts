import ExchNumberFormat from 'exchange-rounding';

export const convertNumber2Currency = (
  num: number,
  type = "XCB",
  location: string | null = "auto",
): string => {

  // Initialize ExchNumberFormat
  const numberFormat = new ExchNumberFormat(location, {
    style: "currency",
    currency: type,
  });

  // Check if the format method exists
  if (typeof numberFormat.format !== "function") {
    throw new Error("ExchNumberFormat.format is not a function");
  }

  const formattedNumber = numberFormat.format(num);

  return formattedNumber;
};
