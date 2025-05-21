/**
 * Converts a numeric value to a corresponding rank title with emoji
 * @param num - The numeric value to convert to a rank
 * @returns {string} The rank title with emoji based on the input value
 */
export const convert2Rank = (num: number): string => {
  if (num >= 5) {
    return '🦖 Godzilla';
  } else if (num >= 3) {
    return '🐋 Whale';
  } else if (num >= 1) {
    return '🦈 Shark';
  } else if (num >= 0.7) {
    return '🦑 Squid';
  } else if (num >= 0.3) {
    return '🐗 Bull';
  } else {
    return '🐰 Rabbit';
  }
};
