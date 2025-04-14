import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import useMapChartData from "@site/src/components/Pages/Dashboard/hooks/useMapChartData";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useFetchAllBlocks } from "@site/src/hooks/useBlocks";
import {
  START_MINING_POOL_CONFIGURATIONS,
  URLS_CONFIG_TYPE,
} from "@site/src/configs/types";

interface IPageControls {
  defaultRegion: string;
  includeInfoBox?: boolean; // Include infoBoxMapData
  fetchMultipleData?: boolean; // Fetch multiple datasets (e.g., blocks)
}

const usePageControls = ({
  defaultRegion,
  includeInfoBox = false,
  fetchMultipleData = false,
}: IPageControls) => {
  const { siteConfig } = useDocusaurusContext();

  // Region handling
  const {
    region,
    regionLabel,
    dropdownItems,
    handleChangeRegion,
    handleSearch,
    setWalletAddress,
  } = useHeaders({
    defaultRegion,
  });

  // Pagination
  const { currentPageNumber, handlePageChange } = usePaginate();

  // Map chart data
  const {
    infoBoxItems: infoBoxMapData,
    poolFee,
    isLoading: isLoadingMapChart,
  } = useMapChartData();

  // Fetch multiple datasets (e.g., blocks)
  const multipleData = fetchMultipleData
    ? useFetchAllBlocks(region, 10, currentPageNumber)
    : null;

  return {
    region,
    regionLabel,
    dropdownItems,
    handleChangeRegion,
    handlePageChange,
    currentPageNumber,
    infoBoxMapData: includeInfoBox ? infoBoxMapData : undefined,
    isLoadingMapChart: includeInfoBox ? isLoadingMapChart : undefined,
    setWalletAddress,
    handleSearch,
    multipleData,
    poolFee,
  };
};

export default usePageControls;
