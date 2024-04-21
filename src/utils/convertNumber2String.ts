export const convertNumber2String = (num: number | string): string => {
  if (num === null) return "0";

  return num.toString();
};
