import { useHeaders } from '@site/src/hooks/useHeaders';
import { usePaginate } from '@site/src/hooks/usePaginate';
import useMapChartData from '@site/src/components/Pages/Dashboard/hooks/useMapChartData';
import { useFetchAllBlocks } from '@site/src/hooks/useBlocks';

interface IPageControls {
  defaultRegion: string;
  includeInfoBox?: boolean;
  fetchMultipleData?: boolean;
}

const usePageControls = ({
  defaultRegion,
  includeInfoBox = false,
  fetchMultipleData = false,
}: IPageControls) => {
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

  const { currentPageNumber, handlePageChange } = usePaginate();

  const {
    infoBoxItems: infoBoxMapData,
    poolFee,
    isLoading: isLoadingMapChart,
  } = useMapChartData();

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
