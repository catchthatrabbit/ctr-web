export type PAYMENTS_BY_WALLET_ADDRESS_RESPONSE = {
    "payments": [
        {
            "amount": number,
            "timestamp": number,
            "tx": string
        },
    ]
}

export type PAYMENTS_RESPONSE = {
    "payments": [
        {
            "address": string,
            "amount": number,
            "timestamp": number,
            "tx": string
        },
    ],
    "paymentsTotal": number
}

export type PAYMENTS_STATE = {
    "paymentsAmount":number,
    "paymentsTotal":number
}