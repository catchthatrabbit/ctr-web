import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_LIST } from "@site/src/configs/types";
import useMapChartData from "../Dashboard/hooks/useMapChartData";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: IAnyPageAndWallet) => {
  const { siteConfig } = useDocusaurusContext();
  const { handleChangeRegion, handleSearch, dropdownItems, regionLabel } =
    useHeaders({ defaultRegion, onSetWalletAddress, onChangeRegion });
  const mapChartData = useMapChartData();

  const startMiningPoolConfigurations = siteConfig.customFields
    .POOLS_LIST as POOLS_LIST;

  return {
    handleSearch,
    handleChangeRegion,
    dropdownItems,
    regionLabel,
    startMiningPoolConfigurations,
    infoBoxMapData: mapChartData.infoBoxItems,
    poolFee: mapChartData.poolFee,
    isLoadingMapChart: mapChartData.isLoading,
  };
};

export default useControls;
