import React from "react";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { Miners } from "@site/src/components/Pages/Miners";
import { useWalletPage } from "@site/src/hooks/useWallet";

const MinersPage = () => {
  const {
    walletAddress,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    region,
    selectedPool,
    handleSelectedPool,
  } = useWalletPage();

  return (
    <ConfiguredLayout>
      <Miners
        defaultRegion={region}
        onSetWalletAddress={handleWalletAddress}
        onChangeRegion={handleChangeRegion}
        selectedPool={selectedPool}
        setSelectedPool={handleSelectedPool}
      />
    </ConfiguredLayout>
  );
};

export default MinersPage;
