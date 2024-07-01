export const convert2Rank = (
  num: number,
): string => {
  if (num >= 5) {
    return "🦖 Godzilla";
  } else if (num >= 3) {
    return "🐋 Whale";
  } else if (num >= 1) {
    return "🦈 Shark";
  } else if (num >= 0.7) {
    return "🦑 Squid";
  } else if (num >= 0.3) {
    return "🐗 Bull";
  } else {
    return "🐰 Rabbit";
  }
};
