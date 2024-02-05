export type MINERS_RESPONSE = {
    miners:{[key in string]:{
        hr:number
        lastBeat:number
        offline:boolean
    }}
    minersTotal:number
}

export type MINERS_STATES= {
    hashrate:number
    minersTotal:number
    now:number
}