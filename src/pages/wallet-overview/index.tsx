import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { useWalletPage } from "@site/src/hooks/useWallet";

const WalletOverviewPage = () => {
  const location = useLocation();
  const walletAddress = location.pathname.split("/").pop();

  const {
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
          walletAddress={walletAddress as string}
          onChangeRegion={handleChangeRegion}
          onSetWalletAddress={handleWalletAddress}
          selectedPool="de" // Replace with actual logic to get selected pool
        />
      ) : (
        <div>Loading...</div>
      )}
    </ConfiguredLayout>
  );
};

export default WalletOverviewPage;
