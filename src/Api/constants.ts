import {STANDARD_REGIONS_API_KEYS, STANDARD_REGIONS_API_VALUES} from './types';

export const STANDARD_REGIONS_API:{ [key in STANDARD_REGIONS_API_KEYS]: STANDARD_REGIONS_API_VALUES } = {
    EU: 'eu',
    EU_BACKUP: 'eu1',
    AS: 'as',
    AS_BACKUP: 'as1',
    US: 'us',
    US_BACKUP: 'us1'
}