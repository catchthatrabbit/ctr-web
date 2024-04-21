import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { useMemo } from "react";
import { tablesConfig } from "@site/src/configs";
import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { useFetchAllBlocks } from "@site/src/hooks/useBlocks";
import { EXTERNAL_URL } from "@site/src/constants/links";
import { EXTERNAL_URL_ENUM } from "@site/src/enums/externalUrls.enum";

const useControls = () => {
  const { region, handleChangeRegion } = useHeaders({
    defaultRegion: POOL_NAME_ENUM.EU,
  });

  const { currentPageNumber, handlePageChange } = usePaginate();

  const [fetchedMaturedBlocks, fetchedImMatureBlocks, fetchCandidatesBlocks] =
    useFetchAllBlocks(region, 10, currentPageNumber);

  const dataTableColumns = useMemo(
    () => [
      {
        value: "height",
        label: "Height",
        isPrimary: true,
        href: EXTERNAL_URL[EXTERNAL_URL_ENUM.BLOCK_DETAILS],
      },
      { value: "type", label: "Type", alignToCenter: true },
      { value: "minedOn", label: "Mined on", alignToCenter: true },
      {
        value: "blockHash",
        label: "Block hash",
        alignToCenter: true,
        isPrimary: true,
        href: EXTERNAL_URL[EXTERNAL_URL_ENUM.BLOCK_DETAILS],
      },
      { value: "reward", label: "Reward", alignToCenter: true },
      { value: "variance", label: "Variance", alignToCenter: true },
    ],
    [],
  );

  return {
    region,
    dataTableColumns,
    handleChangeRegion,
    handlePageChange,
    isLoadingMaturedBlocks: fetchedMaturedBlocks.isLoading,
    fetchedMaturedBlocks: fetchedMaturedBlocks?.data,
    isLoadingImMatureBlocks: fetchedImMatureBlocks.isLoading,
    fetchedImMatureBlocks: fetchedImMatureBlocks?.data,
    isLoadingCandidatesBlocks: fetchCandidatesBlocks.isLoading,
    fetchCandidatesBlocks: fetchCandidatesBlocks?.data,
    rowCount: tablesConfig.PAGE_LIMIT,
  };
};

export default useControls;
