import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';
import {
  useFetchWallet,
  useFetchWorkersByWalletAddress,
  useFetchWorkerCounts,
} from '@site/src/hooks/useWallet';
import { useFetchPaymentByWalletAddress } from '@site/src/hooks/usePayments';
import { useMemo, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { URLS_CONFIG_TYPE } from '@site/src/configs/types';
import { useLocation } from '@docusaurus/router';
import { useHistory } from 'react-router-dom';
import usePageControls from '@site/src/hooks/usePageControls';

interface IWallet extends Omit<IAnyPageAndWallet, 'onSetWalletAddress'> {
  walletAddress: string;
  filterStatus?: 'All' | 'Running' | 'Inactive';
}

const useControls = ({
  defaultRegion,
  walletAddress,
  filterStatus = 'All',
}: IWallet) => {
  const {
    region,
    regionLabel,
    dropdownItems,
    handleChangeRegion: sharedHandleChangeRegion,
    infoBoxMapData,
    isLoadingMapChart,
  } = usePageControls({
    defaultRegion,
    includeInfoBox: true,
  });

  const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
  const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);

  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();

  const urlConfig = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;
  const okEmoji = siteConfig.customFields.EFFECTS_EMOJI_ENABLED
    ? String(siteConfig.customFields.EFFECTS_EMOJI_OK)
    : 'Running';
  const brbEmoji = siteConfig.customFields.EFFECTS_EMOJI_ENABLED
    ? String(siteConfig.customFields.EFFECTS_EMOJI_BRB)
    : 'Inactive';

  let status: 'active' | 'inactive' | undefined;
  if (filterStatus === 'Running') status = 'active';
  else if (filterStatus === 'Inactive') status = 'inactive';
  else status = undefined;

  const paymentPayoutTableColumns = useMemo(
    () => [
      {
        label: 'Tx id',
        value: 'tx',
        canBeCopied: true,
        isPrimary: true,
        href: urlConfig.TRANSACTION_DETAILS_URL,
      },
      {
        label: 'Amount',
        value: 'amount',
      },
      {
        label: 'Time',
        value: 'timestamp',
      },
    ],
    [urlConfig.TRANSACTION_DETAILS_URL]
  );

  const workersTableColumn = useMemo(
    () => [
      {
        value: 'rabbit',
        label: 'Miner',
        isPrimary: true,
      },
      {
        value: 'hr',
        label: 'Hashrate ~30m',
      },
      {
        value: 'hr2',
        label: 'Hashrate ~3h',
      },
      {
        value: 'lastBeat',
        label: 'Last share',
      },
      {
        value: 'offline',
        label: 'Status',
      },
    ],
    []
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
    status
  );

  const {
    data: fetchPaymentsByWalletAddress,
    isLoading: isLoadingFetchPaymentByWalletAddress,
  } = useFetchPaymentByWalletAddress(
    region,
    walletAddress,
    10,
    currentPagePayouts
  );

  const { data: fetchWorkerCounts, isLoading: isLoadingFetchWorkerCounts } =
    useFetchWorkerCounts(region, walletAddress);

  const handleChangeRegion = (id: {
    label: string;
    value: STANDARD_REGIONS_API_KEYS;
  }) => {
    const splitted = location.pathname.split('/');
    splitted[3] = id.value.toLowerCase();
    const newUrl = splitted.join('/');
    history.push(newUrl);
    sharedHandleChangeRegion(id);
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
    fetchWorkerCounts,
    isLoadingFetchWorkerCounts,
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
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
