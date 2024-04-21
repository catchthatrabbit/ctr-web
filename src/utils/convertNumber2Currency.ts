export const convertNumber2Currency = (
  num: number,
  type = "XCB",
  location = "en-US",
): string => {
  return new Intl.NumberFormat(location, {
    style: "currency",
    currency: type,
  }).format(num);
};
