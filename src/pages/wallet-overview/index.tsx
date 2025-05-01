import React from 'react';
import { useParams } from 'react-router-dom';
import { Wallet } from '@site/src/components/Pages/Wallet';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { useWalletPage } from '@site/src/hooks/useWallet';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { START_MINING_POOL_CONFIGURATIONS } from '@site/src/configs/types';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';

const WalletOverviewPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const START_MINING_POOL_CONFIGURATIONS = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;
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
    ? (pool.toUpperCase() as STANDARD_REGIONS_API_KEYS)
    : region;

  return (
    <ConfiguredLayout backgroundPos={40}>
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
