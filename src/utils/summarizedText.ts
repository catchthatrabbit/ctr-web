/**
 * Creates a summarized version of text by showing only the beginning and end
 * @param text - The text to summarize
 * @param fromChar - Number of characters to show from the beginning
 * @param toChar - Position to start showing characters from the end
 * @returns {string} The summarized text with ellipsis in the middle
 */
export const summarizedText = (
  text: string,
  fromChar: number,
  toChar: number
): string => {
  if (!text) return '';

  const fromText = text.startsWith('0x')
    ? '0×' + text.slice(2, fromChar).toUpperCase()
    : text.slice(0, fromChar).toUpperCase();
  const toText = text.slice(toChar, text.split('').length).toUpperCase();

  return `${fromText}…${toText}`;
};
