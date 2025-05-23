import React, { useMemo } from 'react';
import { TwoColumnsPanel } from '../../Molecules/TwoColumnsPanel';
import { WALLET_INFO_RESPONSE } from '@site/src/Api/wallet/types';
import {
  convertWalletInfoResponse2ComputingInformation,
  convertWalletInfoResponse2GeneralState,
} from './utils';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { WalletInfoTabs } from '@site/src/components/Organisms/WalletInfoTabs';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

interface IInfo {
  data: WALLET_INFO_RESPONSE;
  workers?: React.ReactNode;
  payouts?: React.ReactNode;
  isLoading?: boolean;
  loadingPlaceholder?: React.ReactNode;
  isLoadingWorkers?: boolean;
  handleFilterChange?: (status: string) => void;
}

const Info = ({
  data,
  payouts,
  workers,
  isLoading,
  loadingPlaceholder,
  handleFilterChange,
}: IInfo) => {
  const { desktop, mobile } = useMediaQueries();
  const { siteConfig } = useDocusaurusContext();
  const generalStats = useMemo(
    () => convertWalletInfoResponse2GeneralState(data),
    [data]
  );

  const computingInformation = useMemo(
    () => convertWalletInfoResponse2ComputingInformation(data, siteConfig),
    [data, siteConfig]
  );

  return (
    <>
      <div
        className={clsx([
          'grid grid-col-gap grid-row-gap xl-grid-col--2 lg-grid-col--2 md-grid-row--2 sm-grid-row--2 xs-grid-row--2',
        ])}
      >
        <TwoColumnsPanel
          data={computingInformation}
          isLoading={isLoading}
          loadingPlaceholder={loadingPlaceholder}
        />
        {mobile && <Spacer variant="xxs" />}
        <TwoColumnsPanel
          data={generalStats}
          isLoading={isLoading}
          loadingPlaceholder={loadingPlaceholder}
        />
      </div>
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xl" />}
      <WalletInfoTabs
        payouts={payouts}
        workers={workers}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

export default Info;
