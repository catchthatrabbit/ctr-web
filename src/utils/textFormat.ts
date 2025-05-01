import { ageCalculation } from '@site/src/utils/ageCalculation';
import { convertNumber2String } from '@site/src/utils/convertNumber2String';
import { siFormat } from '@site/src/utils/siFormat';
import { convertNumber2Currency } from '@site/src/utils/convertNumber2Currency';
import { numberFormat } from './numberFormat';

export type TextFormatOutputType = {
  text: string;
  prefix: string;
  suffix: string;
};

/**
 * Formats a hash rate value with appropriate suffix
 * @param value - The hash rate value to format
 * @param suffix - The suffix to append (default: "h/s")
 * @returns {TextFormatOutputType} Object containing formatted text with prefix and suffix
 */
export class TextFormat {
  /**
   * Formats a hash rate value with appropriate suffix
   * @param value - The hash rate value to format
   * @param suffix - The suffix to append (default: "h/s")
   * @returns {TextFormatOutputType} Object containing formatted text with prefix and suffix
   */
  static getHashText = (
    value: number,
    suffix: string = 'h/s'
  ): TextFormatOutputType => {
    return {
      text: convertNumber2String(siFormat(value, 2)),
      prefix: '',
      suffix,
    };
  };

  /**
   * Formats a value as a percentage
   * @param value - The value to format as percentage
   * @returns {TextFormatOutputType} Object containing formatted text with percentage suffix
   */
  static getPercentText = (value: string | number): TextFormatOutputType => ({
    text: convertNumber2String(value as number),
    prefix: '',
    suffix: '%',
  });

  /**
   * Formats a value as Euro currency
   * @param value - The value to format as Euro
   * @returns {TextFormatOutputType} Object containing formatted Euro text
   */
  static getEuroText = (value: number): TextFormatOutputType => ({
    text: convertNumber2String(convertNumber2Currency(value, 'EUR')),
    prefix: '',
    suffix: '',
  });

  /**
   * Formats a value as XCB currency
   * @param value - The value to format as XCB
   * @returns {TextFormatOutputType} Object containing formatted XCB text
   */
  static getXCBText = (value: number): TextFormatOutputType => ({
    text: convertNumber2String(convertNumber2Currency(value)),
    prefix: '',
    suffix: '',
  });

  /**
   * Formats a timestamp as a localized date/time string
   * @param value - The timestamp to format
   * @returns {TextFormatOutputType} Object containing formatted date/time text
   */
  static getTimeText = (value: string | number): TextFormatOutputType => ({
    text: convertNumber2String(new Date(value).toLocaleString()),
    prefix: '',
    suffix: '',
  });

  /**
   * Formats a date as a relative time (time ago)
   * @param value - The date string to format
   * @returns {TextFormatOutputType} Object containing formatted "time ago" text
   */
  static getAgoText = (value: string): TextFormatOutputType => ({
    text: convertNumber2String(ageCalculation(value, true)),
    prefix: '',
    suffix: '',
  });

  /**
   * Formats a value as a number with proper formatting
   * @param value - The value to format as a number
   * @returns {TextFormatOutputType} Object containing formatted number text
   */
  static getNumberText = (value: string | number): TextFormatOutputType => ({
    text: convertNumber2String(numberFormat(value)),
    prefix: '',
    suffix: '',
  });

  /**
   * Formats a value with default formatting
   * @param value - The value to format
   * @returns {TextFormatOutputType} Object containing formatted text
   */
  static getDefaultText = (value: string | number): TextFormatOutputType => ({
    text: convertNumber2String(value),
    prefix: '',
    suffix: '',
  });
}
