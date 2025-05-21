import { useMemo } from 'react';
import usePageControls from '@site/src/hooks/usePageControls';
import { tablesConfig } from '@site/src/configs';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface CustomFields {
  URLS: {
    BLOCK_DETAILS: string;
  };
  DEFAULT_REGION: string;
}

const useControls = () => {
  const { siteConfig } = useDocusaurusContext();
  const { URLS, DEFAULT_REGION } = siteConfig.customFields as unknown as CustomFields;
  const defaultRegion = DEFAULT_REGION?.toString().toUpperCase() || 'DE';

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
    defaultRegion,
    fetchMultipleData: true,
    includeInfoBox: true,
  });

  const tableColumns = useMemo(
    () => [
      {
        value: 'height',
        label: 'Height',
        isPrimary: true,
        href: URLS.BLOCK_DETAILS,
      },
      { value: 'type', label: 'Type' },
      { value: 'minedOn', label: 'Found at' },
      {
        value: 'blockHash',
        label: 'Block hash',
        canBeCopied: true,
        isPrimary: true,
        href: URLS.BLOCK_DETAILS,
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
