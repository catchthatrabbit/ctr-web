import { StartMining } from "@site/src/components/Pages/StartMining";
import { Wallet } from "@site/src/components/Pages/Wallet";
import { ConfiguredLayout } from "@site/src/components/Templates/ConfiguredLayout";
import { useWalletPage } from "@site/src/hooks/useWallet";

const StartMiningPage = () => {
  const {
    walletAddress,
    handleChangeRegion,
    handleClearWalletAddress,
    handleWalletAddress,
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
        <StartMining
          defaultRegion={region}
          onSetWalletAddress={handleWalletAddress}
          onChangeRegion={handleChangeRegion}
        />
      )}
    </ConfiguredLayout>
  );
};

export default StartMiningPage;
