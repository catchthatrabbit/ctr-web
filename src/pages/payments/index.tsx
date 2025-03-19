import React from 'react';
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import Payments from "@site/src/components/Pages/Payments/Payments";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { useWalletPage } from "@site/src/hooks/useWallet";

const PaymentsPage = () => {
  const {
    walletAddress,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    selectedPool,
    handleSelectedPool,
    region,
  } = useWalletPage();

  return (
    <ConfiguredLayout>
      {walletAddress ? (
        <Wallet
          onClearWalletAddress={handleClearWalletAddress}
          defaultRegion={region}
          walletAddress={walletAddress}
          onChangeRegion={handleChangeRegion}
          onSetWalletAddress={handleWalletAddress}
        />
      ) : (
        <Payments
          defaultRegion={region}
          onSetWalletAddress={handleWalletAddress}
          onChangeRegion={handleChangeRegion}
          selectedPool={selectedPool}
          setSelectedPool={handleSelectedPool}
        />
      )}
    </ConfiguredLayout>
  );
};

export default PaymentsPage;
