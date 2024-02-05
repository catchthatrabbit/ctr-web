import { STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";
import { REGIONS } from "@site/src/constants/regions";

export const covertRegionValue2Label = (apiKeys:STANDARD_REGIONS_API_VALUES):string => {

    switch(apiKeys){
        case 'eu':
            return REGIONS.EU.label;
        case 'eu1':
            return REGIONS.EU_BACKUP.label;
        case 'as':
            return REGIONS.AS.label;
        case 'as1':
            return REGIONS.AS_BACKUP.label;
        case 'us':
            return REGIONS.US.label;
        case 'us1':
            return REGIONS.US_BACKUP.label;
        default:
            return REGIONS.EU.label;
        
    }
}