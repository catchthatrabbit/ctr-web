import { useEffect, useState } from "react";
import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_LIST } from "../configs/types";
import { REGIONS } from "../constants/regions";
import { POOL_NAME_ENUM } from "../enums/poolName.enum";

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

  const { siteConfig } = useDocusaurusContext();
  const startMiningPoolConfigurations = siteConfig.customFields
    .POOLS_LIST as POOLS_LIST;

  const dropdownItems = Object.entries(startMiningPoolConfigurations)
    .filter(([key, config]) =>
      key in REGIONS &&
      config &&
      typeof config === 'object' &&
      'DESCRIPTION' in config
    )
    .map(([key, config]) => ({
      label: config.DESCRIPTION,
      value: key as POOL_NAME_ENUM
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
    value: STANDARD_REGIONS_API_KEYS;
  }) => {
    setRegion(id.value);
    if (typeof onChangeRegion === 'function') onChangeRegion(id.value);
  };

  const covertRegionValue2Label = (
    apiKeys: STANDARD_REGIONS_API_KEYS
  ): string => {
    switch (apiKeys) {
      case 'DE':
        return startMiningPoolConfigurations[REGIONS.DE][`DESCRIPTION`];
      case 'FI':
        return startMiningPoolConfigurations[REGIONS.FI][`DESCRIPTION`];
      case 'SG':
        return startMiningPoolConfigurations[REGIONS.SG][`DESCRIPTION`];
      case 'HK':
        return startMiningPoolConfigurations[REGIONS.HK][`DESCRIPTION`];
      case 'BR':
        return startMiningPoolConfigurations[REGIONS.BR][`DESCRIPTION`];
      case 'JP':
        return startMiningPoolConfigurations[REGIONS.JP][`DESCRIPTION`];
      default:
        return startMiningPoolConfigurations[REGIONS.DE][`DESCRIPTION`];
    }
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
