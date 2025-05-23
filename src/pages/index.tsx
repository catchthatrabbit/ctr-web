import React from 'react';
import { ConfiguredLayout } from '@site/src/components/Templates/ConfiguredLayout';
import { Dashboard } from '@site/src/components/Pages/Dashboard';
import { useWalletPage } from '@site/src/hooks/useWallet';
import { Wallet } from '@site/src/components/Pages/Wallet';

export default function Home(): React.ReactElement {
  const {
    walletAddress,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    region,
  } = useWalletPage();

  return (
    <ConfiguredLayout backgroundPos={40}>
      {walletAddress ? (
        <Wallet
          onClearWalletAddress={handleClearWalletAddress}
          defaultRegion={region}
          walletAddress={walletAddress}
          onChangeRegion={handleChangeRegion}
          onSetWalletAddress={handleWalletAddress}
        />
      ) : (
        <Dashboard onSetWalletAddress={handleWalletAddress} />
      )}
    </ConfiguredLayout>
  );
}
