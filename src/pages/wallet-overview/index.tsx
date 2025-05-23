import React from 'react';
import { useParams } from 'react-router-dom';
import { Wallet } from '@site/src/components/Pages/Wallet';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { useWalletPage } from '@site/src/hooks/useWallet';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_LIST } from '@site/src/configs/types';
import ICAN from '@blockchainhub/ican';

const WalletOverviewPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const POOLS_LIST = siteConfig.customFields.POOLS_LIST as POOLS_LIST;
  const { walletAddress, pool } = useParams<{
    walletAddress: string;
    pool: string;
  }>();

  const {
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    region,
  } = useWalletPage();

  const defaultRegion = pool
    ? pool.toUpperCase()
    : region;

  return (
    <ConfiguredLayout
      backgroundPos={40}
      customTitle={
        walletAddress && pool
          ? `${ICAN.shortFormat(walletAddress, '⋯')} - ${POOLS_LIST[pool?.toUpperCase() as keyof typeof POOLS_LIST]?.DESCRIPTION}`
          : 'Wallet Overview'
      }
    >
      <Wallet
        onClearWalletAddress={handleClearWalletAddress}
        defaultRegion={defaultRegion}
        walletAddress={walletAddress}
        onChangeRegion={handleChangeRegion}
        onSetWalletAddress={handleWalletAddress}
        selectedPool={pool}
      />
    </ConfiguredLayout>
  );
};

export default WalletOverviewPage;
