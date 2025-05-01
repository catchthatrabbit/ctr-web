import React from 'react';
import { TextFormat } from '@site/src/utils/textFormat';
import { Header } from '../../Templates/Header';
import { List } from '@site/src/components/Templates/List';
import { convertPaymentsResponse2PaymentInfo } from './utils';
import { PaymentsTitle } from '@site/src/components/Molecules/PictureTitles';
import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import useControls from './controls';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { Search } from '@site/src/components/Molecules/Search';
import { Board } from '@site/src/components/Atoms/Board';
import { ConfiguredInfoBox } from '../../Molecules/ConfiguredInfoBox';

import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

import clsx from 'clsx';

import styles from './styles.module.css';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';

interface IPayments extends IAnyPageAndWallet {
  setSelectedPool?: (pool: string) => void;
}

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
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
    selectedPool,
  });
  const { mobile, tablet, desktop } = useMediaQueries();

  // Helper function to render the ConfiguredInfoBox
  const renderInfoBox = () =>
    (mobile || tablet) && (
      <ConfiguredInfoBox
        infoItems={infoBoxMapData}
        isLoading={isLoadingMapChart}
      />
    );

  // Helper function to render the Header
  const renderHeader = () => (
    <Header
      items={dropdownItems}
      defaultRegion={regionLabel}
      onChangeRegion={handleDropdownChange}
      isLoading={isLoadingPaymentState}
      pageTitleComponent={<PaymentsTitle />}
      addComponent={
        <Search
          context={mobile ? 'wallet' : 'payments'}
          onSearch={onSetWalletAddress}
          overrideLabel={true}
          selectedPool={selectedPool}
        />
      }
      context={mobile ? 'mobileWallet' : 'payments'}
      onSearch={handleSearch}
    />
  );

  // Helper function to render the Board components
  const renderBoards = () => (
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
      {desktop ? <Spacer variant="sm" /> : <Spacer variant="lg" />}
      <Spacer variant="md" />
    </div>
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

    handleChangeRegion(
      selectedOption as { label: string; value: STANDARD_REGIONS_API_KEYS }
    );
  };

  return (
    <>
      {renderInfoBox()}
      <Spacer variant={desktop ? 'xxxxl' : 'xxxl'} />
      {mobile && <Spacer variant="xs" />}
      {renderHeader()}
      {desktop ? null : <Spacer variant="xxs" />}
      <List
        isLoading={isLoadingPaymentList}
        data={convertPaymentsResponse2PaymentInfo(fetchedPaymentsList)}
        dataTableColumns={dataTableColumns}
        onPageChange={handlePageChange}
        total={fetchedPaymentsList?.paymentsTotal}
        hidePagination
        context="blocks"
      />
      {renderBoards()}
      {mobile && <Spacer variant="sm" />}
    </>
  );
};

export default Payments;
