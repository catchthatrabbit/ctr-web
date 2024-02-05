import { MINERS_RESPONSE } from "@site/src/Api/miners/types";
import { convert2kilo, summarizedText } from "@site/src/utils";
import {convertTime2Date} from '@site/src/utils/convertTime2Date';

export const convertMinerResponse2MinerList = (minerResponse?:MINERS_RESPONSE ):Array<{id:string, id_summarized:string ,hr:string, 
    lastBeat:string, offline:boolean}> => {

    if(!minerResponse || !minerResponse.miners)
        return  [];
    const constMinersId = Object.keys(minerResponse?.miners);

    return constMinersId?.map(minerId => (
            { 
                id: minerId,
                id_summarized: summarizedText(minerId, 10, 39), 
                hr: `${convert2kilo(minerResponse?.miners[minerId]?.hr)} kh/s`, 
                lastBeat: convertTime2Date(minerResponse?.miners[minerId]?.lastBeat),
                offline:minerResponse?.miners[minerId]?.offline
            }
        ))
}