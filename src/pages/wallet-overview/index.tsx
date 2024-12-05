import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { useWalletPage } from "@site/src/hooks/useWallet";

const WalletOverviewPage = () => {
  const location = useLocation();
  const { walletAddress: paramWalletAddress, pool: paramPool } = useParams<{
    walletAddress: string;
    pool: string;
  }>();

  console.log(location);

  const queryParams = new URLSearchParams(location.search);
  const queryWalletAddress = queryParams.get("walletAddress");
  const queryPool = queryParams.get("pool") || "de";

  const walletAddress = paramWalletAddress || queryWalletAddress;
  const pool = paramPool || queryPool;

  const {
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
    region,
  } = useWalletPage();

  return (
    <ConfiguredLayout backgroundPos={40}>
      <Wallet
        onClearWalletAddress={handleClearWalletAddress}
        defaultRegion={region}
        walletAddress={walletAddress}
        onChangeRegion={handleChangeRegion}
        onSetWalletAddress={handleWalletAddress}
        selectedPool={pool} // Pass pool to Wallet
      />
    </ConfiguredLayout>
  );
};

export default WalletOverviewPage;
