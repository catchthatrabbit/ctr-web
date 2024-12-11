import { TextFormat } from "@site/src/utils/textFormat";
import { Header } from "../../Templates/Header";
import { List } from "@site/src/components/Templates/List";
import { convertPaymentsResponse2PaymentInfo } from "./utils";
import { PaymentsTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Search } from "@site/src/components/Molecules/Search";
import { Board } from "@site/src/components/Atoms/Board";

import clsx from "clsx";

import styles from "./styles.module.css";

interface IPayments extends IAnyPageAndWallet {}

const Payments = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
  selectedPool,
  setSelectedPool,
}: IPayments) => {
  const {
    dataTableColumns,
    fetchedPaymentsList,
    fetchedPaymentsState,
    handleChangeRegion,
    handlePageChange,
    handleSearch,
    isLoadingPaymentState,
    isLoadingPaymentList,
    dropdownItems,
    regionLabel,
    startMiningPoolConfigurations,
  } = useControls({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
    selectedPool,
  });

  const handleDropdownChange = (selectedOption: {
    label: string;
    value: string;
  }) => {
    const poolConfig = startMiningPoolConfigurations[selectedOption.value];
    const poolShortcut = poolConfig
      ? poolConfig.SERVER.slice(0, 2)
      : selectedOption.value.slice(0, 2);

    setSelectedPool(poolShortcut);

    console.log(selectedPool, poolShortcut, 1);

    handleChangeRegion(selectedOption);
  };

  return (
    <>
      <Spacer variant="lg" />
      <Spacer variant="md" />

      <Header
        items={dropdownItems}
        defaultRegion={regionLabel}
        onChangeRegion={handleDropdownChange}
        isLoading={isLoadingPaymentState}
        pageTitleComponent={<PaymentsTitle />}
        addComponent={
          <Search context="payments" onSearch={onSetWalletAddress} />
        }
        context="payments"
        selectedPool={selectedPool}
        onSearch={handleSearch}
      />
      <List
        isLoading={isLoadingPaymentList}
        data={convertPaymentsResponse2PaymentInfo(fetchedPaymentsList)}
        dataTableColumns={dataTableColumns}
        onPageChange={handlePageChange}
        total={fetchedPaymentsList?.paymentsTotal}
        hidePagination
        context="blocks"
      />
      <div className={clsx(styles.boardRoot, styles.boardJustifyCenter)}>
        <Spacer variant="sm" />
        <Spacer variant="md" />
        <Board
          isLoading={isLoadingPaymentState}
          description="Sent payments"
          value={
            TextFormat.getNumberText(fetchedPaymentsState?.paymentsTotal).text
          }
          context="payments"
          prefix=""
          suffix=""
        />
        <Spacer variant="sm" />
        <Spacer variant="md" />
      </div>
    </>
  );
};

export default Payments;
