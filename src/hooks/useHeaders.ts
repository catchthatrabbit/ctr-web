import { useEffect, useState } from "react";
import { STANDARD_REGIONS_API_VALUES } from "../Api/types";

type HEADERS_PROPS = {
    defaultRegion: STANDARD_REGIONS_API_VALUES
    onSetWalletAddress?: (walletAddress:string) => void
    onChangeRegion?: (region:STANDARD_REGIONS_API_VALUES) => void
}

export const useHeaders = ({defaultRegion, onSetWalletAddress, onChangeRegion}:HEADERS_PROPS) => {

    const [walletAddress, setWalletAddress] = useState<string>();
    const [region, setRegion] = useState<STANDARD_REGIONS_API_VALUES>(defaultRegion);

    useEffect(() => {
        if(typeof onSetWalletAddress === "function")
            onSetWalletAddress(walletAddress);
    }, [walletAddress]);

    const handleSearch = (searchQuery:string) => {
        setWalletAddress(searchQuery);
    }

    const handleChangeRegion = (id: {label:string, value:STANDARD_REGIONS_API_VALUES}) =>{
        setRegion(id.value);
        if(typeof onChangeRegion === "function")
            onChangeRegion(id.value);
    }

    return {
        setWalletAddress,
        handleSearch,
        region,
        handleChangeRegion
    }

}