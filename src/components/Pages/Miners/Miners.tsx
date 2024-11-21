import { List } from "@site/src/components/Templates/List";
import { Header } from "@site/src/components/Templates/Header";
import { TextFormat } from "@site/src/utils/textFormat";
import { MinersTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Search } from "@site/src/components/Molecules/Search";
import { Board } from "@site/src/components/Atoms/Board";
import useControlsDashboard from "@site/src/components/Pages/Dashboard/controls";

import clsx from "clsx";

import styles from "./styles.module.css";

interface IMiners extends IAnyPageAndWallet {}

const Miners = ({
  onSetWalletAddress,
  defaultRegion,
  onChangeRegion,
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
  } = useControls({ onSetWalletAddress, defaultRegion, onChangeRegion });

  const { infoBoxMapData } = useControlsDashboard();
  const networkDifficultyItem = infoBoxMapData?.find((item) =>
    item.title.includes("Network difficulty"),
  );

  return (
    <>
      <Spacer variant="xxxl" />
      <Header
        defaultRegion={regionLabel}
        items={dropdownItems}
        onChangeRegion={handleChangeRegion}
        isLoading={isLoadingMinerState}
        pageTitleComponent={<MinersTitle />}
        addComponent={
          <Search context="payments" onSearch={onSetWalletAddress} />
        }
        context="payments"
        onSearch={handleSearch}
      />
      <List
        isLoading={isLoadingMinerList}
        dataTableColumns={dataTableColumns}
        data={minerList}
        onPageChange={handlePageChange}
        total={fetchedMinerList?.minersTotal}
        hidePagination
        context="blocks"
      />
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
        {networkDifficultyItem && (
          <Board
            isLoading={isLoadingMinerState}
            description={networkDifficultyItem.title}
            value={networkDifficultyItem.value.text}
            context="payments"
            prefix={networkDifficultyItem.value.prefix}
            suffix={networkDifficultyItem.value.suffix}
          />
        )}
      </div>
    </>
  );
};

export default Miners;
