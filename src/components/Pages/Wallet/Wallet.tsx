import React, { useState, useEffect } from "react";

import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import { Info } from "@site/src/components/Templates/Info";
import { List } from "@site/src/components/Templates/List";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Header } from "@site/src/components/Templates/Header";
import { Search } from "../../Molecules/Search";
import {
  convertPaymentsResponse2PaymentInfo,
  convertWorkersResponse2Info,
} from "./utils";
import { Text } from "@site/src/components/Atoms/Text";
import { IAnyPageAndWallet } from "../types";
import useControls from "./controls";
import { LoadingPlaceholder } from "../../Atoms/LoadingPlaceholder";
import { CustomToastError } from "../../Molecules/CopyButton";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

import "react-toastify/dist/ReactToastify.css";
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
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls({ walletAddress, defaultRegion, onChangeRegion });

  const [filterStatus, setFilterStatus] = useState("All");
  const [toastShown, setToastShown] = useState(false);
  const { mobile, tablet, desktop } = useMediaQueries();

  const walletNotFound = !walletAddress || !fetchedWalletInfo;

  // Handle toast notifications
  useEffect(() => {
    if (walletNotFound && !toastShown && !isLoadingFetchWallet) {
      CustomToastError({ message: "Wallet not found", mobile });
      setToastShown(true);
    } else if (!walletNotFound && toastShown) {
      setToastShown(false);
    }
  }, [walletNotFound, toastShown, isLoadingFetchWallet]);

  // Helper function to render workers
  const renderWorkers = () => (
    <List
      isLoading={isLoadingFetchWorkerByWalletAddress}
      data={convertWorkersResponse2Info(
        fetchWorkersByWalletAddress,
        okEmoji,
        brbEmoji,
      )}
      hidePagination
      dataTableColumns={workersTableColumn}
      total={fetchWorkersByWalletAddress?.workersTotal}
      onPageChange={handleChangePageWorkers}
      context="wallet"
      filterStatus={filterStatus}
    />
  );

  // Helper function to render payouts
  const renderPayouts = () => (
    <List
      dataTableColumns={paymentPayoutTableColumns}
      hidePagination
      isLoading={isLoadingFetchPaymentByWalletAddress}
      data={convertPaymentsResponse2PaymentInfo(fetchPaymentsByWalletAddress)}
      total={fetchedWalletInfo?.paymentsTotal}
      onPageChange={handleChangePagePayouts}
      context="wallet"
    />
  );

  // Helper function to render wallet not found message
  const renderWalletNotFound = () => (
    <div
      className={`flex flex-column items-center xl-center-items ${styles.fullWidth}`}
    >
      <Spacer variant="xxs" />
      <Text type="regular" variant="heading3" color="white" weight="normal">
        Wallet not found. No data to display.
      </Text>
      <Spacer variant="md" />
      <Search context="wallet" onSearch={onSetWalletAddress} />
      <Spacer variant="xxxl" />
    </div>
  );

  return (
    <>
      {(mobile || tablet) && (
        <ConfiguredInfoBox
          infoItems={infoBoxMapData}
          isLoading={isLoadingMapChart}
        />
      )}
      <Spacer variant={desktop ? "xxl" : "sm"} />

      <div className={`flex items-center xl-center-items ${styles.fullWidth}`}>
        <Text
          type="exo"
          size="pictureTitle"
          lineHeight="mediumLineHeight"
          color="white"
          weight="extraBold"
          variant={mobile ? "headingMobile" : undefined}
        >
          Wallet Overview
        </Text>
      </div>

      {walletNotFound ? (
        renderWalletNotFound()
      ) : (
        <>
          <Header
            items={dropdownItems}
            isLoading={isLoadingFetchWallet}
            defaultRegion={regionLabel}
            onChangeRegion={handleChangeRegion}
            iban={walletAddress}
            layout={{ boards: true, search: false, dropdown: true }}
            context={mobile ? "mobileWallet" : "wallet"}
          />
          <Info
            data={fetchedWalletInfo}
            isLoading={isLoadingFetchWallet}
            loadingPlaceholder={<LoadingPlaceholder />}
            handleFilterChange={setFilterStatus}
            workers={renderWorkers()}
            payouts={renderPayouts()}
          />
        </>
      )}

      <Spacer variant="xxxl" />
    </>
  );
};

export default Wallet;
