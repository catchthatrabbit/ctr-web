import { TIME_UNITS } from '@site/src/constants/time';

/**
 * Given a date string, return a string that says how long ago that date was
 * @param {string} date - The date to be converted to a relative time.
 * @param [short=false] - If true, the unit will be shortened to the abbreviation.
 * @returns a string that is the number of seconds ago that the date was.
 */
export const ageCalculation = (date: string, short = false) => {
  const seconds = (Date.now() - Date.parse(date)) / TIME_UNITS.MILLISECOND;

  let result = '';
  for (const interval of TIME_UNITS.INTERVALS) {
    if (seconds / interval.unitInSeconds > 1) {
      result = `${Math.floor(seconds / interval.unitInSeconds)} ${interval.getUnit(short)} ago`;
      break;
    }
  }

  return result;
};
