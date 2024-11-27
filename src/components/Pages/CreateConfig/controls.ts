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

  return {
    handleSearch,
    handleChangeRegion,
    dropdownItems,
    regionLabel,
  };
};

export default useControls;
