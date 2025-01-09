import React, { useState } from "react";
import { Tabs } from "@site/src/components/Molecules/Tabs";

import { Header } from "@site/src/components/Templates/Header";
import { BlockListTabs } from "@site/src/components/Organisms/BlocksListTabs";
import { List } from "@site/src/components/Templates/List";
import { convertAnyBlocksResponse2AnyBlocksInfo } from "./utils";
import { BlockTitle } from "@site/src/components/Molecules/PictureTitles";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

const Blocks = () => {
  const {
    regionLabel,
    dataTableColumns,
    fetchCandidatesBlocks,
    fetchedImMatureBlocks,
    fetchedMaturedBlocks,
    isLoadingCandidatesBlocks,
    isLoadingImMatureBlocks,
    isLoadingMaturedBlocks,
    handleChangeRegion,
    handlePageChange,
    dropdownItems,
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls();

  const [activeTab, setActiveTab] = useState("blocks");
  const { mobile, tablet, desktop } = useMediaQueries();

  const tabs = [
    { label: "Blocks", value: "blocks" },
    { label: "Immature", value: "immature" },
    { label: "New blocks", value: "newBlocks" },
  ];

  return (
    <>
      {(mobile || tablet) && (
        <>
          <ConfiguredInfoBox
            infoItems={infoBoxMapData}
            isLoading={isLoadingMapChart}
          />
        </>
      )}
      {desktop ? <Spacer variant="xxxl" /> : <Spacer variant="sm" />}

      <Header
        items={dropdownItems}
        defaultRegion={regionLabel}
        pageTitleComponent={<BlockTitle />}
        addComponent={
          <Tabs items={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        }
        context={mobile ? "mobileWallet" : "blocks"}
        onChangeRegion={handleChangeRegion}
        layout={{ boards: false, search: false, dropdown: true }}
        isLoading={
          isLoadingCandidatesBlocks ||
          isLoadingImMatureBlocks ||
          isLoadingMaturedBlocks
        }
      />
      {desktop ? null : <Spacer variant="md" />}

      <BlockListTabs
        blocks={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchedMaturedBlocks,
              "matured",
            )}
            isLoading={isLoadingMaturedBlocks}
            onPageChange={handlePageChange}
            dataTableColumns={dataTableColumns}
            total={fetchedMaturedBlocks?.maturedTotal}
            hidePagination={true}
            context="blocks"
          />
        }
        immature={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchedImMatureBlocks,
              "immature",
            )}
            isLoading={isLoadingImMatureBlocks}
            onPageChange={handlePageChange}
            dataTableColumns={dataTableColumns}
            total={fetchedImMatureBlocks?.immatureTotal}
            hidePagination={true}
            context="blocks"
          />
        }
        candidates={
          <List
            data={convertAnyBlocksResponse2AnyBlocksInfo(
              fetchCandidatesBlocks,
              "candidates",
            )}
            isLoading={isLoadingCandidatesBlocks}
            onPageChange={handlePageChange}
            dataTableColumns={dataTableColumns}
            total={fetchCandidatesBlocks?.candidatesTotal}
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
