import usePageControls from "@site/src/hooks/usePageControls";
import { convertWorkerName } from "@site/src/utils/convertWorkerName";

const useControls = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
}: {
  onSetWalletAddress: (address: string) => void;
  defaultRegion: string;
  onChangeRegion?: (region: string) => void;
}) => {
  const {
    handleChangeRegion,
    dropdownItems,
    regionLabel,
    infoBoxMapData,
    isLoadingMapChart,
  } = usePageControls({
    defaultRegion,
    includeInfoBox: true,
  });

  const startMiningPoolConfigurations = dropdownItems.map((item) => ({
    label: item.label,
    value: item.value,
  }));

  return {
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
