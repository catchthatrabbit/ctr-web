export class TIME_UNITS {
  static MILLISECOND = 1_000 as const;
  static SECOND = 1 as const;
  static MINUTE_IN_SECONDS = 60 as const;
  static HOUR_IN_SECONDS = 60 * TIME_UNITS.MINUTE_IN_SECONDS;
  static DAY_IN_SECONDS = 24 * TIME_UNITS.HOUR_IN_SECONDS;
  static MONTH_IN_SECONDS = 30 * TIME_UNITS.DAY_IN_SECONDS;
  static YEAR_IN_SECONDS = 12 * TIME_UNITS.MONTH_IN_SECONDS;

  static INTERVALS = [
    {
      unitInSeconds: TIME_UNITS.YEAR_IN_SECONDS,
      getUnit: (short: boolean) => (short ? "y" : "years"),
    },
    {
      unitInSeconds: TIME_UNITS.MONTH_IN_SECONDS,
      getUnit: (short: boolean) => (short ? "mth" : "months"),
    },
    {
      unitInSeconds: TIME_UNITS.DAY_IN_SECONDS,
      getUnit: (short: boolean) => (short ? "d" : "days"),
    },
    {
      unitInSeconds: TIME_UNITS.HOUR_IN_SECONDS,
      getUnit: (short: boolean) => (short ? "h" : "hours"),
    },
    {
      unitInSeconds: TIME_UNITS.MINUTE_IN_SECONDS,
      getUnit: (short: boolean) => (short ? "min" : "minutes"),
    },
    {
      unitInSeconds: TIME_UNITS.SECOND,
      getUnit: (short: boolean) => (short ? "s" : "seconds"),
    },
  ] as const;
}
