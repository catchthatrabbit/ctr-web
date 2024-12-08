import React from "react";
import { useParams } from "react-router-dom";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { useWalletPage } from "@site/src/hooks/useWallet";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";

const WalletOverviewPage = () => {
  const { siteConfig } = useDocusaurusContext();

  const START_MINING_POOL_CONFIGURATIONS = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;
  const { walletAddress, pool } = useParams<{
    walletAddress: string;
    pool: string;
  }>();

  console.log("walletAddress:", walletAddress);
  console.log("pool:", pool);

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
        defaultRegion={pool ? pool.toUpperCase() : region}
        walletAddress={walletAddress}
        onChangeRegion={handleChangeRegion}
        onSetWalletAddress={handleWalletAddress}
        selectedPool={pool}
        poolDescription={poolDescription} // Pass pool description to Wallet
      />
    </ConfiguredLayout>
  );
};

export default WalletOverviewPage;
