import { useHeaders } from '@site/src/hooks/useHeaders';
import { usePaginate } from '@site/src/hooks/usePaginate';
import { useMemo } from 'react';
import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import { EXTERNAL_URL } from '@site/src/constants/links';
import { EXTERNAL_URL_ENUM } from '@site/src/enums/externalUrls.enum';
import { useFetchPayments, useFetchPaymentsState } from '@site/src/hooks/usePayments';

const useControls = ({onSetWalletAddress, defaultRegion, onChangeRegion}:IAnyPageAndWallet) => {

    const {handleChangeRegion, handleSearch, region, setWalletAddress} = useHeaders({defaultRegion, onSetWalletAddress, onChangeRegion});
    const {currentPageNumber, handlePageChange} = usePaginate();

    const {data:fetchedPaymentsState} = useFetchPaymentsState(region);
    const {data:fetchedPaymentsList} = useFetchPayments(region, 10, currentPageNumber);

    const dataTableColumns = useMemo(() => [
        {value:'timestamp', label: 'Time'}, 
        {value:'amount', label: 'Amount', alignToCenter:true}, 
        {value:'address', label: 'Address', alignToCenter:true,isPrimary:true, fn: setWalletAddress},
        {value:'tx', label: 'Tx id', alignToCenter:true, isPrimary:true, href:EXTERNAL_URL[EXTERNAL_URL_ENUM.TRANSACTION_DETAILS] }
    ], [])

    return {
        dataTableColumns,
        rowCount: tablesConfig.PAGE_LIMIT,
        handleSearch, 
        handleChangeRegion,
        handlePageChange,
        fetchedPaymentsList,
        fetchedPaymentsState, 
    }
}

export default useControls;
