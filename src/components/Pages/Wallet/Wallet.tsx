import { Info } from "@site/src/components/Templates/Info";
import { List } from "@site/src/components/Templates/List";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Header } from "@site/src/components/Templates/Header";
import {
  convertPaymentsResponse2PaymentInfo,
  convertWorkersResponse2Info,
} from "./utils";
import { Button } from "../../Atoms/Button";
import { Panel, PanelContent } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import { IAnyPageAndWallet } from "../types";
import useControls from "./controls";
import { LoadingPlaceholder } from "../../Atoms/LoadingPlaceholder";

interface IWallet extends Omit<IAnyPageAndWallet, "onSetWalletAddress"> {
  walletAddress: string;
  onClearWalletAddress?: () => void;
}

const Wallet = ({
  walletAddress,
  defaultRegion,
  onChangeRegion,
  onClearWalletAddress,
}: IWallet) => {
  const {
    fetchPaymentsByWalletAddress,
    fetchWorkersByWalletAddress,
    fetchedWalletInfo,
    handleChangePagePayouts,
    handleChangePageWorkers,
    handleChangeRegion,
    paymentPayoutTableColumns,
    workersTableColumn,
    isLoadingFetchPaymentByWalletAddress,
    isLoadingFetchWallet,
    isLoadingFetchWorkerByWalletAddress,
  } = useControls({ walletAddress, defaultRegion, onChangeRegion });

  return (
    <>
      <Button value="Back" onClick={onClearWalletAddress} />
      <Header
        isLoading={isLoadingFetchWallet}
        defaultRegion={defaultRegion}
        onChangeRegion={handleChangeRegion}
        iban={walletAddress}
        layout={{ boards: true, search: false, dropdown: true }}
      />
      <Info
        data={fetchedWalletInfo}
        isLoading={isLoadingFetchWallet}
        loadingPlaceholder={<LoadingPlaceholder />}
        workers={
          <List
            isLoading={isLoadingFetchWorkerByWalletAddress}
            data={convertWorkersResponse2Info(fetchWorkersByWalletAddress)}
            dataTableColumns={workersTableColumn}
            total={fetchWorkersByWalletAddress?.workersTotal}
            onPageChange={handleChangePageWorkers}
          />
        }
        payouts={
          <List
            isLoading={isLoadingFetchPaymentByWalletAddress}
            data={convertPaymentsResponse2PaymentInfo(
              fetchPaymentsByWalletAddress,
            )}
            dataTableColumns={paymentPayoutTableColumns}
            total={fetchedWalletInfo?.paymentsTotal}
            onPageChange={handleChangePagePayouts}
          />
        }
      />

      <Spacer />

      <Panel title="Connections">
        <PanelContent>
          <Text variant="body" type="value">
            Direct link to stats:&nbsp;
          </Text>
          <Text variant="body" color="primary" type="value" decorating="link">
            {`${walletAddress}.ctr.watch`}
          </Text>
          <br />
          <Text variant="body" type="value">
            Direct link.
          </Text>
        </PanelContent>
      </Panel>

      <Spacer variant="xl" />
    </>
  );
};

export default Wallet;
