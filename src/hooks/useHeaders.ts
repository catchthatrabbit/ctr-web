import { useEffect, useState } from "react";
import { STANDARD_REGIONS_API_KEYS } from "../Api/types";

type HEADERS_PROPS = {
  defaultRegion: STANDARD_REGIONS_API_KEYS;
  onSetWalletAddress?: (walletAddress: string) => void;
  onChangeRegion?: (region: STANDARD_REGIONS_API_KEYS) => void;
};

export const useHeaders = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: HEADERS_PROPS) => {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [region, setRegion] =
    useState<STANDARD_REGIONS_API_KEYS>(defaultRegion);

  useEffect(() => {
    if (typeof onSetWalletAddress === "function")
      onSetWalletAddress(walletAddress);
  }, [onSetWalletAddress, walletAddress]);

  const handleSearch = (searchQuery: string) => {
    setWalletAddress(searchQuery);
  };

  const handleChangeRegion = (id: {
    label: string;
    value: STANDARD_REGIONS_API_KEYS;
  }) => {
    setRegion(id.value);
    if (typeof onChangeRegion === "function") onChangeRegion(id.value);
  };

  return {
    setWalletAddress,
    handleSearch,
    region,
    handleChangeRegion,
  };
};
