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

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
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

  const urlsConfigs = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;

  const { data: fetchedPaymentsState, isLoading: isLoadingPaymentState } =
    useFetchPaymentsState(region);
  const { data: fetchedPaymentsList, isLoading: isLoadingPaymentList } =
    useFetchPayments(region, 10, currentPageNumber);

  const dataTableColumns = useMemo(
    () => [
      { value: "timestamp", label: "Time" },
      { value: "amount", label: "Amount" },
      {
        value: "address",
        label: "Address",
        canBeCopied: true,
        isPrimary: true,
        fn: setWalletAddress,
      },
      {
        value: "tx",
        label: "Tx id",
        canBeCopied: true,
        isPrimary: true,
        href: urlsConfigs.TRANSACTION_DETAILS_URL,
      },
    ],
    [setWalletAddress, urlsConfigs.TRANSACTION_DETAILS_URL],
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
  };
};

export default useControls;
