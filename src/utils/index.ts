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

  const fromText = text.startsWith('0x') ? '0×'+text.slice(2, fromChar).toUpperCase() : text.slice(0, fromChar).toUpperCase();
  const toText = text.slice(toChar, text.split("").length).toUpperCase();

  return `${fromText}…${toText}`;
};
