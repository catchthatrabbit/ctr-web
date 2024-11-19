import { TextFormat } from "@site/src/utils/textFormat";
import { Header } from "../../Templates/Header";
import { List } from "@site/src/components/Templates/List";
import { convertPaymentsResponse2PaymentInfo } from "./utils";
import { PaymentsTitle } from "@site/src/components/Molecules/PictureTitles";
import { IAnyPageAndWallet } from "@site/src/components/Pages/types";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Search } from "@site/src/components/Molecules/Search";

interface IPayments extends IAnyPageAndWallet {}

const Payments = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
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
  } = useControls({ defaultRegion, onSetWalletAddress, onChangeRegion });

  return (
    <>
      <Spacer variant="lg" />
      <Spacer variant="md" />

      <Header
        items={dropdownItems}
        defaultRegion={regionLabel}
        onChangeRegion={handleChangeRegion}
        isLoading={isLoadingPaymentState}
        pageTitleComponent={<PaymentsTitle />}
        addComponent={<Search context="payments" onSearch={handleSearch} />}
        boardItems={[
          {
            desc: "Sent payments",
            value: TextFormat.getNumberText(fetchedPaymentsState?.paymentsTotal)
              .text,
            prefix: "",
            suffix: "",
          },
        ]}
        context="payments"
        onSearch={handleSearch}
      />
      <List
        isLoading={isLoadingPaymentList}
        data={convertPaymentsResponse2PaymentInfo(fetchedPaymentsList)}
        dataTableColumns={dataTableColumns}
        onPageChange={handlePageChange}
        total={fetchedPaymentsList?.paymentsTotal}
      />
    </>
  );
};

export default Payments;
