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
      label: startMiningPoolConfigurations[`${REGIONS.EU}_FULL_NAME`],
      value: POOL_NAME_ENUM.EU,
    },
    {
      label: startMiningPoolConfigurations[`${REGIONS.EU_BACKUP}_FULL_NAME`],
      value: POOL_NAME_ENUM.EU_BACKUP,
    },
    {
      label: startMiningPoolConfigurations[`${REGIONS.AS}_FULL_NAME`],
      value: POOL_NAME_ENUM.AS,
    },
    {
      label: startMiningPoolConfigurations[`${REGIONS.AS_BACKUP}_FULL_NAME`],
      value: POOL_NAME_ENUM.AS_BACKUP,
    },
    {
      label: startMiningPoolConfigurations[`${REGIONS.US}_FULL_NAME`],
      value: POOL_NAME_ENUM.US,
    },
    {
      label: startMiningPoolConfigurations[`${REGIONS.US_BACKUP}_FULL_NAME`],
      value: POOL_NAME_ENUM.US_BACKUP,
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
      case "EU":
        return startMiningPoolConfigurations[`${REGIONS.EU}_FULL_NAME`];
      case "EU_BACKUP":
        return startMiningPoolConfigurations[`${REGIONS.EU_BACKUP}_FULL_NAME`];
      case "AS":
        return startMiningPoolConfigurations[`${REGIONS.AS}_FULL_NAME`];
      case "AS_BACKUP":
        return startMiningPoolConfigurations[`${REGIONS.AS_BACKUP}_FULL_NAME`];
      case "US":
        return startMiningPoolConfigurations[`${REGIONS.US}_FULL_NAME`];
      case "US_BACKUP":
        return startMiningPoolConfigurations[`${REGIONS.US_BACKUP}_FULL_NAME`];
      default:
        return startMiningPoolConfigurations[`${REGIONS.EU}_FULL_NAME`];
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
