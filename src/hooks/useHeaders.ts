import { useEffect, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_LIST } from "../configs/types";

type HEADERS_PROPS = {
  defaultRegion: string;
  onSetWalletAddress?: (walletAddress: string) => void;
  onChangeRegion?: (region: string) => void;
};

export const useHeaders = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: HEADERS_PROPS) => {
  const [walletAddress, setWalletAddress] = useState<string>();
  const [region, setRegion] = useState<string>(defaultRegion);

  const { siteConfig } = useDocusaurusContext();
  const poolsList = siteConfig.customFields.POOLS_LIST as POOLS_LIST;

  const dropdownItems = Object.entries(poolsList)
    .filter(([_, config]) =>
      config &&
      typeof config === 'object' &&
      'DESCRIPTION' in config
    )
    .map(([key, config]) => ({
      label: config.DESCRIPTION,
      value: key
    }));

  useEffect(() => {
    if (typeof onSetWalletAddress === 'function')
      onSetWalletAddress(walletAddress);
    setRegion(defaultRegion);
  }, [onSetWalletAddress, walletAddress, defaultRegion]);

  const handleSearch = (searchQuery: string) => {
    setWalletAddress(searchQuery);
  };

  const handleChangeRegion = (id: {
    label: string;
    value: string;
  }) => {
    setRegion(id.value);
    if (typeof onChangeRegion === 'function') onChangeRegion(id.value);
  };

  const covertRegionValue2Label = (regionKey: string): string => {
    return poolsList[regionKey]?.DESCRIPTION || '';
  };

  return {
    setWalletAddress,
    handleSearch,
    regionLabel: covertRegionValue2Label(region),
    region,
    handleChangeRegion,
    dropdownItems,
  };
};
