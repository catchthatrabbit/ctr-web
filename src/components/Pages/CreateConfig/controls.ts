import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { START_MINING_POOL_CONFIGURATIONS } from "@site/src/configs/types";
import useMapChartData from "../Dashboard/hooks/useMapChartData";
import { convertWorkerName } from "@site/src/utils/convertWorkerName";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
  const {
    handleChangeRegion,
    handleSearch,
    region,
    setWalletAddress,
    dropdownItems,
    regionLabel,
  } = useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const { siteConfig } = useDocusaurusContext();

  const startMiningPoolConfigurations = siteConfig.customFields
    .START_MINING_POOL_CONFIGURATIONS as START_MINING_POOL_CONFIGURATIONS;

  const {
    infoBoxItems: infoBoxMapData,
    poolFee,
    isLoading: isLoadingMapChart,
  } = useMapChartData();

  return {
    handleSearch,
    handleChangeRegion,
    dropdownItems,
    regionLabel,
    convertWorkerName,
    startMiningPoolConfigurations,
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
