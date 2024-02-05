export type MATURED_RESPONSE = {
    "matured": [
        {
            "height": number,
            "timestamp": number,
            "difficulty": number,
            "shares": number,
            "uncle": boolean,
            "uncleHeight": number,
            "orphan": boolean,
            "hash": string,
            "reward": string
        },
    ],
    "maturedTotal": number
}

export type IM_MATURED_RESPONSE = {
        "immature": [
            {
                "height": number,
                "timestamp": number,
                "difficulty": number,
                "shares": number,
                "uncle": boolean,
                "uncleHeight": number,
                "orphan": boolean,
                "hash": string,
                "reward": string
            },
        ],
        "immatureTotal": number
}

export type CANDIDATES_RESPONSE = {
    "candidates": [
        {
            "height": number,
            "timestamp": number,
            "difficulty": number,
            "shares": number,
            "uncle": boolean,
            "uncleHeight": number,
            "orphan": boolean,
            "hash": number,
            "reward": number
        },
    ],
    "candidatesTotal": number
}