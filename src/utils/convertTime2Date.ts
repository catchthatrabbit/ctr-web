import {TIME_UNITS} from '@site/src/constants/time';

export const convertTime2Date = (timeStamp:number):string => {

    if(!timeStamp)
        return new Date().toLocaleDateString('en');

    const TIME_OPTIONS = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    } as const;
    
    return (!timeStamp) ? '' : new Date(timeStamp * TIME_UNITS.MILLISECOND).toLocaleString('en', TIME_OPTIONS);
}
