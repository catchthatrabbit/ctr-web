import { useFetchMiners, useFetchMinersState } from "@site/src/hooks/useMiners";
import { convertMinerResponse2MinerList } from "./utils";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { MINERS_RESPONSE } from "@site/src/Api/miners/types";
import { useHistory } from "@docusaurus/router";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";
import { useMemo, useState } from "react";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import { tablesConfig } from "@site/src/configs";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
  selectedPool,
}: IAnyPageAndWallet) => {
  const { push } = useHistory();

  const { siteConfig } = useDocusaurusContext();

  const {
    region,
    regionLabel,
    dropdownItems,
    handleChangeRegion,
    handleSearch,
    setWalletAddress,
  } = useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const { currentPageNumber, handlePageChange } = usePaginate();
  const { data: fetchedMinerState, isLoading: isLoadingMinerState } =
    useFetchMinersState(region);
  const { data: fetchedMinerList, isLoading: isLoadingMinerList } =
    useFetchMiners(region, 10, currentPageNumber);

  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  const minerList = useMemo(
    () => convertMinerResponse2MinerList(fetchedMinerList as MINERS_RESPONSE),
    [fetchedMinerList],
  );

  const dataTableColumns = useMemo(
    () => [
      {
        value: "id",
        label: "Miner",
        canBeCopied: true,
        isPrimary: true,
        fn: (walletAddress) => {
          setWalletAddress(walletAddress);
          console.log("controls", selectedPool);
          push(`/coreid/${walletAddress}/${selectedPool}`);
        },
      },
      { value: "hr", label: "Hashrate" },
      { value: "lastBeat", label: "Last beat" },
    ],
    [push, setWalletAddress, selectedPool],
  );

  return {
    dataTableColumns,
    minerList,
    rowCount: tablesConfig.PAGE_LIMIT,
    handleSearch,
    handleChangeRegion,
    handlePageChange,
    fetchedMinerState,
    fetchedMinerList,
    isLoadingMinerState,
    isLoadingMinerList,
    regionLabel,
    dropdownItems,
    startMiningPoolConfigurations,
  };
};

export default useControls;
