import { useState } from "react";
import { STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";
import { REGIONS } from "@site/src/constants/regions";

const useWalletPage = () => {
    const [walletAddress, setWalletAddress] = useState<string>()
    const [region, setRegion] = useState<STANDARD_REGIONS_API_VALUES>(REGIONS.EU.value)

    const handleWalletAddress = (walletAddress:string) => {
        setWalletAddress(walletAddress);
    }

    const handleChangeRegion = (selectedRegion:STANDARD_REGIONS_API_VALUES) => {
        setRegion(selectedRegion);
    }

    const handleClearWalletAddress = () => {
        setWalletAddress(null);
    }

    return {
        walletAddress,
        region, 
        handleChangeRegion,
        handleClearWalletAddress,
        handleWalletAddress
    }

}

export {useWalletPage};