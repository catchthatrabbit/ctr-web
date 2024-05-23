import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import { tablesConfig } from "@site/src/configs";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import {
  useFetchWallet,
  useFetchWorkersByWalletAddress,
} from "@site/src/hooks/useWallet";
import { useFetchPaymentByWalletAddress } from "@site/src/hooks/usePayments";
import { useMemo, useState } from "react";
// eslint-disable-next-line import/no-unresolved
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
  const okEmoji = String(siteConfig.customFields.EFFECTS_OK_EMOJI);
  const brbEmoji = String(siteConfig.customFields.EFFECTS_BRB_EMOJI);

  const paymentPayoutTableColumns = useMemo(
    () => [
      {
        label: "Time",
        value: "timestamp",
        alignToCenter: true,
      },
      {
        label: "Tx id",
        value: "tx",
        canBeCopied: true,
        isPrimary: true,
        alignToCenter: true,
        href: urlConfig.TRANSACTION_DETAILS_URL,
      },
      {
        label: "Amount",
        value: "amount",
        alignToCenter: true,
      },
    ],
    [urlConfig.TRANSACTION_DETAILS_URL],
  );

  const workersTableColumn = useMemo(
    () => [
      {
        value: "rabbit",
        label: "Rabbit",
        isPrimary: true,
        href: urlConfig.CORE_TALK_SPACE_URL,
      },
      {
        value: "hr",
        label: "Hashrate ~30m",
        alignToCenter: true,
      },
      {
        value: "hr2",
        label: "Hashrate ~3h",
        alignToCenter: true,
      },
      {
        value: "lastBeat",
        label: "Last share",
        alignToCenter: true,
      },
      {
        value: "offline",
        label: "Status",
        alignToCenter: true,
      },
    ],
    [urlConfig.CORE_TALK_SPACE_URL],
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
