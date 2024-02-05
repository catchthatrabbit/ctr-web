import { IM_MATURED_RESPONSE, MATURED_RESPONSE } from "@site/src/Api/blocks/types";
import { UNITS } from "@site/src/constants/units";
import { summarizedText } from "@site/src/utils";
import { convertNumber2Currency } from "@site/src/utils/convertNumber2Currency";
import { convertTime2Date } from "@site/src/utils/convertTime2Date";

export const convertAnyBlocksResponse2AnyBlocksInfo = <T>(maturedBlocksResponse:T, 
    mainProperty: "matured" | "immature" | "candidates"):Array<{"height": number,
"height_summarized"
"minedOn": string,
"type":string
"blockHash":string
"reward": number
"variance": string
}> => {

    if(!maturedBlocksResponse)
        return [];

    return maturedBlocksResponse[mainProperty]?.map(maturedBlock => ({
        "height": maturedBlock?.height,
        "height_summarized": maturedBlock?.height,
        "type": maturedBlock.uncle ? 'Uncle' : maturedBlock.orphan ? 'Orphan' : 'Block',
        'minedOn': convertTime2Date(maturedBlock.timestamp),
        'blockHash': maturedBlock.hash,
        'blockHash_summarized':summarizedText(maturedBlock.hash, 10, maturedBlock.hash.length-6),
        "reward": convertNumber2Currency(Number(maturedBlock?.reward) / UNITS.CORE),
        "variance": `${(maturedBlock.difficulty / maturedBlock.shares).toFixed(2)}%`,
    }))

}