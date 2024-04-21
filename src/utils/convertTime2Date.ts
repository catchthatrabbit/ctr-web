import { TIME_UNITS } from "@site/src/constants/time";

const TIME_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
} as const;

export const convertTime2Date = (
  timeStamp: number,
  options: Intl.DateTimeFormatOptions = TIME_OPTIONS,
): string => {
  if (!timeStamp) return new Date().toLocaleDateString("en");

  return !timeStamp
    ? ""
    : new Date(timeStamp * TIME_UNITS.MILLISECOND).toLocaleString(
        "en",
        options,
      );
};
