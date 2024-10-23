import { Info } from "@site/src/components/Templates/Info";
import { List } from "@site/src/components/Templates/List";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Header } from "@site/src/components/Templates/Header";
import {
  convertPaymentsResponse2PaymentInfo,
  convertWorkersResponse2Info,
} from "./utils";
import { Button } from "../../Atoms/Button";
import Link from "@docusaurus/Link";
import { Panel, PanelContent } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import { IAnyPageAndWallet } from "../types";
import useControls from "./controls";
import { LoadingPlaceholder } from "../../Atoms/LoadingPlaceholder";

import styles from "./styles.module.css";

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
    okEmoji,
    brbEmoji,
    dropdownItems,
    regionLabel,
  } = useControls({ walletAddress, defaultRegion, onChangeRegion });

  return (
    <>
      <Spacer variant="xl" />
      {/* <Button value="Back" onClick={onClearWalletAddress} /> */}
      <div className={`flex items-center xl-center-items ${styles.fullWidth}`}>
        <Text
          type="exo"
          size="pictureTitle"
          lineHeight="mediumLineHeight"
          color="white"
          weight="extraBold"
        >
          Wallet overview
        </Text>
      </div>
      <Header
        items={dropdownItems}
        isLoading={isLoadingFetchWallet}
        defaultRegion={regionLabel}
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
            data={convertWorkersResponse2Info(
              fetchWorkersByWalletAddress,
              okEmoji,
              brbEmoji,
            )}
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
          <Text variant="body" type="value" className="mr">
            Fediverse link:
          </Text>
          <Link to={`https://ctr.watch/@${walletAddress}`}>
            {`pool.ctr.watch/@${walletAddress}`}
          </Link>
        </PanelContent>
      </Panel>

      <Spacer variant="xl" />
    </>
  );
};

export default Wallet;
