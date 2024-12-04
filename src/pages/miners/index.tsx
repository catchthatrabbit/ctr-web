import React, { useState } from "react";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { Miners } from "@site/src/components/Pages/Miners";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { useWalletPage } from "@site/src/hooks/useWallet";

const MinersPage = () => {
  const {
    walletAddress,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    region,
  } = useWalletPage();

  const [selectedPool, setSelectedPool] = useState<string>("de");

  return (
    <ConfiguredLayout>
      <Miners
        defaultRegion={region}
        onSetWalletAddress={handleWalletAddress}
        onChangeRegion={handleChangeRegion}
        selectedPool={selectedPool}
        setSelectedPool={setSelectedPool}
      />
    </ConfiguredLayout>
  );
};

export default MinersPage;
