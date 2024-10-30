import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import { tablesConfig } from "@site/src/configs";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import {
  useFetchWallet,
  useFetchWorkersByWalletAddress,
} from "@site/src/hooks/useWallet";
import { useFetchPaymentByWalletAddress } from "@site/src/hooks/usePayments";
import { useMemo, useState } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { URLS_CONFIG_TYPE } from "@site/src/configs/types";
import { useHeaders } from "@site/src/hooks/useHeaders";

interface IWallet extends Omit<IAnyPageAndWallet, "onSetWalletAddress"> {
  walletAddress: string;
}

const useControls = ({
  defaultRegion,
  onChangeRegion,
  walletAddress,
}: IWallet) => {
  const [region, setRegion] =
    useState<STANDARD_REGIONS_API_KEYS>(defaultRegion);
  const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
  const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);
  const { dropdownItems, regionLabel } = useHeaders({ defaultRegion });
  const { siteConfig } = useDocusaurusContext();

  const urlConfig = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;
  const okEmoji = String(siteConfig.customFields.EFFECTS_EMOJI_OK);
  const brbEmoji = String(siteConfig.customFields.EFFECTS_EMOJI_BRB);

  const paymentPayoutTableColumns = useMemo(
    () => [
      {
        label: "Tx id",
        value: "tx",
        canBeCopied: true,
        isPrimary: true,
        href: urlConfig.TRANSACTION_DETAILS_URL,
      },
      {
        label: "Amount",
        value: "amount",
      },
      {
        label: "Time",
        value: "timestamp",
      },
    ],
    [urlConfig.TRANSACTION_DETAILS_URL],
  );

  const workersTableColumn = useMemo(
    () => [
      {
        value: "rabbit",
        label: "Miner",
        isPrimary: true,
      },
      {
        value: "hr",
        label: "Hashrate ~30m",
      },
      {
        value: "hr2",
        label: "Hashrate ~3h",
      },
      {
        value: "lastBeat",
        label: "Last share",
      },
      {
        value: "offline",
        label: "Status",
      },
    ],
    [],
  );

  const { data: fetchedWalletInfo, isLoading: isLoadingFetchWallet } =
    useFetchWallet(region, walletAddress);

  const {
    data: fetchWorkersByWalletAddress,
    isLoading: isLoadingFetchWorkerByWalletAddress,
  } = useFetchWorkersByWalletAddress(
    region,
    walletAddress,
    10,
    currentPageWorkers,
  );

  const {
    data: fetchPaymentsByWalletAddress,
    isLoading: isLoadingFetchPaymentByWalletAddress,
  } = useFetchPaymentByWalletAddress(
    region,
    walletAddress,
    10,
    currentPagePayouts,
  );

  const handleChangeRegion = (id: {
    label: string;
    value: STANDARD_REGIONS_API_KEYS;
  }) => {
    setRegion(id.value);
    if (typeof onChangeRegion === "function") onChangeRegion(region);
  };

  const handleChangePagePayouts = (currentPage: number) => {
    setCurrentPagePayouts(currentPage);
  };

  const handleChangePageWorkers = (currentPage: number) => {
    setCurrentPageWorkers(currentPage);
  };

  return {
    workersTableColumn,
    paymentPayoutTableColumns,
    fetchedWalletInfo,
    fetchWorkersByWalletAddress,
    fetchPaymentsByWalletAddress,
    handleChangePagePayouts,
    handleChangePageWorkers,
    handleChangeRegion,
    rowCount: tablesConfig.PAGE_LIMIT,
    isLoadingFetchPaymentByWalletAddress,
    isLoadingFetchWallet,
    isLoadingFetchWorkerByWalletAddress,
    okEmoji,
    brbEmoji,
    dropdownItems,
    regionLabel,
  };
};

export default useControls;
