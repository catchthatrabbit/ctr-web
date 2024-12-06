import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { useWalletPage } from "@site/src/hooks/useWallet";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const WalletOverviewPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const START_MINING_POOL_CONFIGURATIONS = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;
  const location = useLocation();
  const { walletAddress: paramWalletAddress, pool: paramPool } = useParams<{
    walletAddress: string;
    pool: string;
  }>();

  const queryParams = new URLSearchParams(location.search);
  const queryWalletAddress = queryParams.get("walletAddress");
  const queryPool = queryParams.get("pool") || "de";

  const walletAddress = paramWalletAddress || queryWalletAddress;
  const pool = paramPool || queryPool;

  const poolConfig = Object.values(START_MINING_POOL_CONFIGURATIONS).find(
    (siteConfig) => siteConfig.SERVER.startsWith(pool),
  );

  const poolDescription = poolConfig ? poolConfig.DESCRIPTION : "Unknown Pool";

  console.log("Pool Description:", poolDescription);

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
        defaultRegion={pool.toUpperCase() || region}
        walletAddress={walletAddress}
        onChangeRegion={handleChangeRegion}
        onSetWalletAddress={handleWalletAddress}
        selectedPool={pool} // Pass pool to Wallet
      />
    </ConfiguredLayout>
  );
};

export default WalletOverviewPage;
