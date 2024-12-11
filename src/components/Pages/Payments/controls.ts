import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { useMemo } from "react";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import { tablesConfig } from "@site/src/configs";
import {
  useFetchPayments,
  useFetchPaymentsState,
} from "@site/src/hooks/usePayments";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { URLS_CONFIG_TYPE } from "@site/src/configs/types";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";
import { useHistory } from "@docusaurus/router";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
  selectedPool,
}: IAnyPageAndWallet & { selectedPool: string }) => {
  const {
    handleChangeRegion,
    handleSearch,
    region,
    setWalletAddress,
    dropdownItems,
    regionLabel,
  } = useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });
  const { currentPageNumber, handlePageChange } = usePaginate();

  const { siteConfig } = useDocusaurusContext();
  const { push } = useHistory();

  const urlsConfigs = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;

  const { data: fetchedPaymentsState, isLoading: isLoadingPaymentState } =
    useFetchPaymentsState(region);
  const { data: fetchedPaymentsList, isLoading: isLoadingPaymentList } =
    useFetchPayments(region, 10, currentPageNumber);

  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  const dataTableColumns = useMemo(
    () => [
      { value: "timestamp", label: "Time" },
      { value: "amount", label: "Amount" },
      {
        value: "address",
        label: "Address",
        canBeCopied: true,
        isPrimary: true,
        fn: (walletAddress) => {
          setWalletAddress(walletAddress);
          console.log("controls", selectedPool);
          push(`/coreid/${walletAddress}/${selectedPool}`);
        },
      },
      {
        value: "tx",
        label: "Tx id",
        canBeCopied: true,
        isPrimary: true,
        href: urlsConfigs.TRANSACTION_DETAILS_URL,
      },
    ],
    [setWalletAddress, push, selectedPool, urlsConfigs.TRANSACTION_DETAILS_URL],
  );

  return {
    dataTableColumns,
    rowCount: tablesConfig.PAGE_LIMIT,
    handleSearch,
    handleChangeRegion,
    handlePageChange,
    fetchedPaymentsList,
    fetchedPaymentsState,
    isLoadingPaymentState,
    isLoadingPaymentList,
    dropdownItems,
    regionLabel,
    startMiningPoolConfigurations,
  };
};

export default useControls;
