import { WORKER_BY_WALLET_ADDRESS_RESPONSE } from "@site/src/Api/workers/types";
import { PAYMENT_INFO_BY_WALLET_ADDRESS, WORKER_INFO_BY_WALLET_ADDRESS } from "./types";
import { convertTime2Date } from "@site/src/utils/convertTime2Date";
import { ageCalculation } from "@site/src/utils/ageCalculation";
import { siFormat } from "@site/src/utils/siFormat";
import { PAYMENTS_BY_WALLET_ADDRESS_RESPONSE } from "@site/src/Api/payments/types";
import { convertNumber2Currency } from "@site/src/utils/convertNumber2Currency";
import { UNITS } from "@site/src/constants/units";
import { summarizedText } from "@site/src/utils";

export const convertWorkersResponse2Info = (workerResponse:WORKER_BY_WALLET_ADDRESS_RESPONSE):WORKER_INFO_BY_WALLET_ADDRESS => {

    if(!workerResponse)
        return [] as WORKER_INFO_BY_WALLET_ADDRESS;

    return Object.keys(workerResponse.workers)?.map(key => ({
            rabbit:key, 
            hr: `${siFormat(workerResponse.workers[key].hr, 2)}h/s`, 
            hr2: `${siFormat(workerResponse.workers[key].hr2, 2)}h/s`,
            lastBeat: ageCalculation(convertTime2Date(workerResponse.workers[key].lastBeat)),
            offline: workerResponse.workers[key].offline
        }));
}

export const convertPaymentsResponse2PaymentInfo = (paymentResponse:PAYMENTS_BY_WALLET_ADDRESS_RESPONSE):PAYMENT_INFO_BY_WALLET_ADDRESS => {

    if(!paymentResponse)
        return [] as PAYMENT_INFO_BY_WALLET_ADDRESS;

    return paymentResponse?.payments?.map(payment => ({
        amount: convertNumber2Currency((payment?.amount || 0) / UNITS.NUCLE),
        timestamp: convertTime2Date(payment.timestamp),
        tx: payment.tx,
        tx_summarized:summarizedText(payment.tx, 10, payment?.tx?.length -6)
    }));
}