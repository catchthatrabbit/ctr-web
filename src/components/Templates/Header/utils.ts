import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import { REGIONS } from "@site/src/constants/regions";

export const covertRegionValue2Label = (apiKeys:STANDARD_REGIONS_API_KEYS):string => {

    switch(apiKeys){
        case "EU":
            return REGIONS.EU.label;
        case 'EU_BACKUP':
            return REGIONS.EU_BACKUP.label;
        case 'AS':
            return REGIONS.AS.label;
        case 'AS_BACKUP':
            return REGIONS.AS_BACKUP.label;
        case 'US':
            return REGIONS.US.label;
        case 'US_BACKUP':
            return REGIONS.US_BACKUP.label;
        default:
            return REGIONS.EU.label;
        
    }
}