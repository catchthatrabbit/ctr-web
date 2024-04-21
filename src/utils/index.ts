export const convert2kilo = (num: number): number => {
  if (isNaN(num)) return 0;

  return num / 1000;
};

export const summarizedText = (
  text: string,
  fromChar: number,
  toChar: number,
): string => {
  if (!text) return "";

  const fromText = text.slice(0, fromChar);
  const toText = text.slice(toChar, text.split("").length);

  return `${fromText} ... ${toText}`;
};
