import { useEffect, useState } from "react";
import { STANDARD_REGIONS_API_KEYS } from "../Api/types";
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "../configs/types";
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
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  const dropdownItems = [
    {
      label: startMiningPoolConfigurations[REGIONS.DE][`FULL_NAME`],
      value: POOL_NAME_ENUM.DE,
    },
    {
      label: startMiningPoolConfigurations[REGIONS.FI][`FULL_NAME`],
      value: POOL_NAME_ENUM.FI,
    },
    {
      label: startMiningPoolConfigurations[REGIONS.SG][`FULL_NAME`],
      value: POOL_NAME_ENUM.SG,
    },
    {
      label: startMiningPoolConfigurations[REGIONS.HK][`FULL_NAME`],
      value: POOL_NAME_ENUM.HK,
    },
    {
      label: startMiningPoolConfigurations[REGIONS.AM][`FULL_NAME`],
      value: POOL_NAME_ENUM.AM,
    },
    {
      label: startMiningPoolConfigurations[REGIONS.AM1][`FULL_NAME`],
      value: POOL_NAME_ENUM.AM1,
    },
  ];

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

  const covertRegionValue2Label = (
    apiKeys: STANDARD_REGIONS_API_KEYS,
  ): string => {
    switch (apiKeys) {
      case "DE":
        return startMiningPoolConfigurations[REGIONS.DE][`FULL_NAME`];
      case "FI":
        return startMiningPoolConfigurations[REGIONS.FI][`FULL_NAME`];
      case "SG":
        return startMiningPoolConfigurations[REGIONS.SG][`FULL_NAME`];
      case "HK":
        return startMiningPoolConfigurations[REGIONS.HK][`FULL_NAME`];
      case "AM":
        return startMiningPoolConfigurations[REGIONS.AM][`FULL_NAME`];
      case "AM1":
        return startMiningPoolConfigurations[REGIONS.AM1][`FULL_NAME`];
      default:
        return startMiningPoolConfigurations[REGIONS.DE][`FULL_NAME`];
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
