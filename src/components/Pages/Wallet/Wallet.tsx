import React, { useState } from "react";

import { Info } from "@site/src/components/Templates/Info";
import { List } from "@site/src/components/Templates/List";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Header } from "@site/src/components/Templates/Header";
import { Search } from "../../Molecules/Search";
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
  onSetWalletAddress: (walletAddress: string) => void;
}

const Wallet = ({
  walletAddress,
  defaultRegion,
  onChangeRegion,
  onClearWalletAddress,
  onSetWalletAddress,
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

  const [filterStatus, setFilterStatus] = useState("All");

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const walletNotFound = !fetchedWalletInfo || !walletAddress;

  return (
    <>
      <Spacer variant="xxl" />
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
      {walletNotFound ? (
        <>
          <div
            className={`flex flex-column items-center xl-center-items ${styles.fullWidth}`}
          >
            <Spacer variant="xxs" />
            <Text
              type="regular"
              variant="heading3"
              color="white"
              weight="regular"
            >
              Wallet not found. No data to show.
            </Text>
            <Spacer variant="xxxl" />
            <Spacer variant="sm" />
            <Spacer variant="xxs" />
          </div>
          <Search context="wallet" onSearch={onSetWalletAddress} />
          <Spacer variant="xxxl" />
          <Spacer variant="sm" />
          <Spacer variant="xxs" />
        </>
      ) : (
        <>
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
            handleFilterChange={handleFilterChange}
            workers={
              <>
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
                  isWalletPage={true}
                  filterStatus={filterStatus} // Pass filterStatus prop
                />
              </>
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
                isWalletPage={true}
              />
            }
          />
        </>
      )}
      <Spacer variant="xl" />
    </>
  );
};

export default Wallet;
