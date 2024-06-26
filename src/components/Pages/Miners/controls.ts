import { useFetchMiners, useFetchMinersState } from "@site/src/hooks/useMiners";
import { convertMinerResponse2MinerList } from "./utils";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { MINERS_RESPONSE } from "@site/src/Api/miners/types";
import { useHistory } from "@docusaurus/router";
import { useMemo } from "react";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import { tablesConfig } from "@site/src/configs";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
  const { push } = useHistory();

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
          push("/miners");
        },
      },
      { value: "hr", label: "Hashrate" },
      { value: "lastBeat", label: "Last beat" },
    ],
    [push, setWalletAddress],
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
  };
};

export default useControls;
