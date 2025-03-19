import React from "react";
import { List } from "@site/src/components/Templates/List";
import { Header } from "@site/src/components/Templates/Header";
import { TextFormat } from "@site/src/utils/textFormat";
import { MinersTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Search } from "@site/src/components/Molecules/Search";
import { Board } from "@site/src/components/Atoms/Board";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

import clsx from "clsx";

import styles from "./styles.module.css";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";

interface IMiners extends IAnyPageAndWallet {
  selectedPool: string;
  setSelectedPool: (pool: string) => void;
}

const Miners = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
  selectedPool,
  setSelectedPool,
}: IMiners) => {
  const {
    dataTableColumns,
    minerList,
    isLoadingMinerList,
    isLoadingMinerState,
    handleChangeRegion,
    handlePageChange,
    handleSearch,
    fetchedMinerState,
    fetchedMinerList,
    dropdownItems,
    regionLabel,
    startMiningPoolConfigurations,
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls({
    onSetWalletAddress,
    defaultRegion,
    onChangeRegion,
    selectedPool,
  });

  const { mobile, tablet, desktop } = useMediaQueries();

  const networkDifficultyItem = infoBoxMapData?.find((item) =>
    item.title.includes("Network difficulty"),
  );

  const handleDropdownChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    const poolConfig = startMiningPoolConfigurations[selectedOption.value];
    const poolShortcut = poolConfig
      ? poolConfig.SERVER.slice(0, 2)
      : selectedOption.value.slice(0, 2);

    setSelectedPool(poolShortcut);

    handleChangeRegion(selectedOption as { label: string; value: STANDARD_REGIONS_API_KEYS });
  };

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
        defaultRegion={regionLabel}
        items={dropdownItems}
        onChangeRegion={handleDropdownChange}
        isLoading={isLoadingMinerState}
        pageTitleComponent={<MinersTitle />}
        addComponent={
          <Search
            context={mobile ? "wallet" : "payments"}
            onSearch={onSetWalletAddress}
            overrideLabel={true}
            selectedPool={selectedPool}
          />
        }
        context={mobile ? "mobileWallet" : "payments"}
        onSearch={handleSearch}
      />
      {desktop ? null : <Spacer variant="xxxl" />}
      <List
        isLoading={isLoadingMinerList}
        dataTableColumns={dataTableColumns}
        data={minerList}
        onPageChange={handlePageChange}
        total={fetchedMinerList?.minersTotal}
        hidePagination
        context="blocks"
      />
      <Spacer variant="xs" />
      <div className={clsx(styles.boardRoot, styles.boardJustifyCenter)}>
        <Board
          isLoading={isLoadingMinerState}
          description="Total miners"
          value={TextFormat.getNumberText(fetchedMinerState?.minersTotal).text}
          context="payments"
          prefix={
            TextFormat.getNumberText(fetchedMinerState?.minersTotal).prefix
          }
          suffix={
            TextFormat.getNumberText(fetchedMinerState?.minersTotal).suffix
          }
        />
        <Spacer direction="hor" variant="lg" />
        {networkDifficultyItem && (
          <Board
            isLoading={isLoadingMinerState}
            description="Network difficulty"
            value={networkDifficultyItem.value.text}
            context="payments"
            prefix={networkDifficultyItem.value.prefix}
            suffix={networkDifficultyItem.value.suffix}
          />
        )}
      </div>
      {desktop ? <Spacer variant="sm" /> : <Spacer variant="md" />}
    </>
  );
};

export default Miners;
