import { useMemo } from 'react';
import usePageControls from '@site/src/hooks/usePageControls';
import { tablesConfig } from '@site/src/configs';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface CustomFields {
  URLS: {
    BLOCK_DETAILS_URL: string;
  };
}

const useControls = () => {
  // Use shared logic from usePageControls
  const {
    regionLabel,
    dropdownItems,
    handleChangeRegion,
    handlePageChange,
    multipleData: [
      fetchedMaturedBlocks,
      fetchedImMatureBlocks,
      fetchCandidatesBlocks,
    ],
    infoBoxMapData,
    isLoadingMapChart,
  } = usePageControls({
    defaultRegion: 'DE',
    fetchMultipleData: true,
    includeInfoBox: true,
  });

  const { siteConfig } = useDocusaurusContext();
  const { URLS } = (siteConfig.customFields as unknown as CustomFields);

  // Page-specific logic for table columns
  const tableColumns = useMemo(
    () => [
      {
        value: 'height',
        label: 'Height',
        isPrimary: true,
        href: URLS.BLOCK_DETAILS_URL,
      },
      { value: 'type', label: 'Type' },
      { value: 'minedOn', label: 'Found at' },
      {
        value: 'blockHash',
        label: 'Block hash',
        canBeCopied: true,
        isPrimary: true,
        href: URLS.BLOCK_DETAILS_URL,
      },
      { value: 'reward', label: 'Reward' },
      { value: 'variance', label: 'Variance' },
    ],
    []
  );

  return {
    regionLabel,
    dropdownItems,
    tableColumns,
    handleChangeRegion,
    handlePageChange,
    isLoadingMaturedBlocks: fetchedMaturedBlocks.isLoading,
    fetchedMaturedBlocks: fetchedMaturedBlocks?.data,
    isLoadingImMatureBlocks: fetchedImMatureBlocks.isLoading,
    fetchedImMatureBlocks: fetchedImMatureBlocks?.data,
    isLoadingCandidatesBlocks: fetchCandidatesBlocks.isLoading,
    fetchCandidatesBlocks: fetchCandidatesBlocks?.data,
    rowCount: tablesConfig.PAGE_LIMIT,
    infoBoxMapData,
    isLoadingMapChart,
  };
};

export default useControls;
