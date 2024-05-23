import { useHeaders } from "@site/src/hooks/useHeaders";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { useMemo } from "react";
import { tablesConfig } from "@site/src/configs";
import { POOL_NAME_ENUM } from "@site/src/enums/poolName.enum";
import { useFetchAllBlocks } from "@site/src/hooks/useBlocks";
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { URLS_CONFIG_TYPE } from "@site/src/configs/types";

const useControls = () => {
  const { region, regionLabel, handleChangeRegion, dropdownItems } = useHeaders(
    {
      defaultRegion: POOL_NAME_ENUM.EU,
    },
  );
  const { siteConfig } = useDocusaurusContext();

  const { currentPageNumber, handlePageChange } = usePaginate();

  const [fetchedMaturedBlocks, fetchedImMatureBlocks, fetchCandidatesBlocks] =
    useFetchAllBlocks(region, 10, currentPageNumber);

  const urlsConfigs = siteConfig.customFields.URLS as URLS_CONFIG_TYPE;

  const dataTableColumns = useMemo(
    () => [
      {
        value: "height",
        label: "Height",
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS_URL,
      },
      { value: "type", label: "Type", alignToCenter: true },
      { value: "minedOn", label: "Mined on", alignToCenter: true },
      {
        value: "blockHash",
        label: "Block hash",
        alignToCenter: true,
        canBeCopied: true,
        isPrimary: true,
        href: urlsConfigs.BLOCK_DETAILS_URL,
      },
      { value: "reward", label: "Reward", alignToCenter: true },
      { value: "variance", label: "Variance", alignToCenter: true },
    ],
    [urlsConfigs.BLOCK_DETAILS_URL],
  );

  return {
    regionLabel,
    dropdownItems,
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
