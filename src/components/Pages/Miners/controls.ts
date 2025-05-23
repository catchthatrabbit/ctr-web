import { useFetchMiners, useFetchMinersState } from '@site/src/hooks/useMiners';
import { convertMinerResponse2MinerList } from './utils';
import { MINERS_RESPONSE } from '@site/src/Api/miners/types';
import { useHistory } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_LIST } from '@site/src/configs/types';
import { useMemo } from 'react';
import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import usePageControls from '@site/src/hooks/usePageControls';

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
    handlePageChange,
    currentPageNumber,
    infoBoxMapData,
    isLoadingMapChart,
    setWalletAddress,
    handleSearch,
  } = usePageControls({
    defaultRegion,
    includeInfoBox: true,
  });

  const { data: fetchedMinerState, isLoading: isLoadingMinerState } =
    useFetchMinersState(region);
  const { data: fetchedMinerList, isLoading: isLoadingMinerList } =
    useFetchMiners(region, 10, currentPageNumber);

  const startMiningPoolConfigurations = siteConfig.customFields
    .POOLS_LIST as POOLS_LIST;

  const minerList = useMemo(
    () => convertMinerResponse2MinerList(fetchedMinerList as MINERS_RESPONSE),
    [fetchedMinerList]
  );

  const dataTableColumns = useMemo(
    () => [
      {
        value: 'id',
        label: 'Miner',
        canBeCopied: true,
        isPrimary: true,
        fn: (walletAddress: string) => {
          setWalletAddress(walletAddress);
          push(`/coreid/${walletAddress}/${selectedPool}`);
        },
      },
      { value: 'hr', label: 'Hashrate' },
      { value: 'lastBeat', label: 'Last beat' },
    ],
    [push, setWalletAddress, selectedPool]
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
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
