import { STANDARD_REGIONS_API_KEYS, STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";

export const REGIONS = {
    EU:{label:"Primary European Pool", value:'eu', summary:'European Pool', url:'eu.catchthatrabbit.com'},
    EU_BACKUP:{label:"Backup European Pool", value:'eu1', summary:'Backup European Pool', url:'eu1.catchthatrabbit.com'},
    AS:{label:"Primary Asian Pool", value:'as',summary: 'Asian Pool', url:'as.catchthatrabbit.com'},
    AS_BACKUP:{label:"Backup Asian Pool", value:'as1', summary: 'Backup Asian Pool', url:'as1.catchthatrabbit.com'},
    US : {label:"Primary US Pool", value:"us", summary:'US Pool', url:'us.catchthatrabbit.com'},
    US_BACKUP : {label:"Backup US Pool", value:"us1", summary:'Backup US Pool', url:'us1.catchthatrabbit.com'},
} as {
    [key in STANDARD_REGIONS_API_KEYS] : {label:string, value:STANDARD_REGIONS_API_VALUES, summary:string, url:string}
}