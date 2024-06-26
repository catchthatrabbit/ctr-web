import { List } from "@site/src/components/Templates/List";
import { Header } from "@site/src/components/Templates/Header";
import { TextFormat } from "@site/src/utils/textFormat";
import { MinersTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";

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
  return (
    <>
      <Spacer variant="xxxxl" />
      <Header
        defaultRegion={regionLabel}
        items={dropdownItems}
        onChangeRegion={handleChangeRegion}
        isLoading={isLoadingMinerState}
        pageTitleComponent={<MinersTitle />}
        boardItems={[
          {
            desc: "Total miners",
            value: TextFormat.getNumberText(fetchedMinerState?.minersTotal)
              .text,
            prefix: TextFormat.getNumberText(fetchedMinerState?.minersTotal)
              .prefix,
            suffix: TextFormat.getNumberText(fetchedMinerState?.minersTotal)
              .suffix,
          },
          {
            desc: "Total hashrate",
            value: TextFormat.getHashText(fetchedMinerState?.hashrate).text,
            prefix: TextFormat.getHashText(fetchedMinerState?.hashrate).prefix,
            suffix: TextFormat.getHashText(fetchedMinerState?.hashrate).suffix,
          },
        ]}
        onSearch={handleSearch}
      />
      <List
        isLoading={isLoadingMinerList}
        dataTableColumns={dataTableColumns}
        data={minerList}
        onPageChange={handlePageChange}
        total={fetchedMinerList?.minersTotal}
      />
    </>
  );
};

export default Miners;
