import React, { useState } from 'react';
import { Tabs } from '@site/src/components/Molecules/Tabs';
import { Header } from '@site/src/components/Templates/Header';
import { BlockListTabs } from '@site/src/components/Organisms/BlocksListTabs';
import { List } from '@site/src/components/Templates/List';
import { convertAnyBlocksResponse2AnyBlocksInfo } from './utils';
import { BlockTitle } from '@site/src/components/Molecules/PictureTitles';
import usePageControls from '@site/src/hooks/usePageControls';
import useControls from './controls';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Blocks = () => {
  const { siteConfig } = useDocusaurusContext();
  const defaultRegion = siteConfig.customFields.DEFAULT_REGION.toString().toUpperCase() || 'DE';

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

  const { tableColumns } = useControls();
  const [activeTab, setActiveTab] = useState('blocks');
  const { mobile, tablet, desktop } = useMediaQueries();

  const tabs = [
    { label: 'Blocks', value: 'blocks' },
    { label: 'Immature', value: 'immature' },
    { label: 'New blocks', value: 'newBlocks' },
  ];

  return (
    <>
      {/* InfoBox for mobile and tablet */}
      {(mobile || tablet) && (
        <ConfiguredInfoBox
          infoItems={infoBoxMapData}
          isLoading={isLoadingMapChart}
        />
      )}
      <Spacer variant={desktop ? 'xxl' : 'xl'} />
      <Header
        items={dropdownItems}
        defaultRegion={regionLabel}
        pageTitleComponent={<BlockTitle />}
        addComponent={
          <Tabs items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        }
        context={mobile ? 'mobileWallet' : 'blocks'}
        onChangeRegion={handleChangeRegion}
        layout={{ boards: false, search: false, dropdown: true }}
      />
      {desktop ? null : <Spacer variant="md" />}

      {/* Block List Tabs */}
      <BlockListTabs
        blocks={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchedMaturedBlocks?.data,
              'matured'
            )}
            isLoading={fetchedMaturedBlocks?.isLoading}
            onPageChange={handlePageChange}
            dataTableColumns={tableColumns}
            total={fetchedMaturedBlocks?.data?.maturedTotal}
            hidePagination={true}
            context="blocks"
          />
        }
        immature={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchedImMatureBlocks?.data,
              'immature'
            )}
            isLoading={fetchedImMatureBlocks?.isLoading}
            onPageChange={handlePageChange}
            dataTableColumns={tableColumns}
            total={fetchedImMatureBlocks?.data?.immatureTotal}
            hidePagination={true}
            context="blocks"
          />
        }
        candidates={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchCandidatesBlocks?.data,
              'candidates'
            )}
            isLoading={fetchCandidatesBlocks?.isLoading}
            onPageChange={handlePageChange}
            dataTableColumns={tableColumns}
            total={fetchCandidatesBlocks?.data?.candidatesTotal}
            hidePagination={true}
            context="blocks"
          />
        }
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <Spacer variant="xxxl" />
    </>
  );
};

export default Blocks;
