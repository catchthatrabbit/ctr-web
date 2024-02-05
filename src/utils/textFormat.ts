import {ageCalculation} from  '@site/src/utils/ageCalculation';
import { convertNumber2String } from '@site/src/utils/convertNumber2String';
import {siFormat} from '@site/src/utils/siFormat';
import { convertNumber2Currency } from '@site/src/utils/convertNumber2Currency';
import { numberFormat } from './numberFormat';

type TextFormatOutputType = {
    text:string
    prefix:string
    suffix:string
}

export class TextFormat{

      static getHashText = (value: number, suffix: string = 'h/s'): TextFormatOutputType => {
        return{
        text: convertNumber2String(siFormat(value ,2)),
        prefix: '',
        suffix,
      }}
      
      static getPercentText = (value: string | number): TextFormatOutputType => ({
        text: convertNumber2String(value as number),
        prefix: '',
        suffix: '%',
      })
      
      static getEuroText = (value: number): TextFormatOutputType => ({
        text: convertNumber2String(convertNumber2Currency(value,'EUR')),
        prefix: '',
        suffix: '',
      })
      
      static getXCBText = (value: number): TextFormatOutputType => ({
        text: convertNumber2String(convertNumber2Currency(value)),
        prefix: '',
        suffix: '',
      })
      
      static getTimeText = (value: string | number): TextFormatOutputType => ({
        text: convertNumber2String(new Date(value).toLocaleString()),
        prefix: '',
        suffix: '',
      })
      
      static getAgoText = (value: string): TextFormatOutputType => ({
        text: convertNumber2String(ageCalculation(value, true)),
        prefix: '',
        suffix: '',
      })
      
      static getNumberText = (value: string | number): TextFormatOutputType => ({
        text: convertNumber2String(numberFormat(value)),
        prefix: '',
        suffix: '',
      })
      
      static getDefaultText = (value: string | number): TextFormatOutputType => ({
        text: convertNumber2String(value),
        prefix: '',
        suffix: '',
      })
      
}