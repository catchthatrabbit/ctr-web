import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';
import { useFetchWallet, useFetchWorkersByWalletAddress } from '@site/src/hooks/useWallet';
import { useFetchPaymentByWalletAddress } from '@site/src/hooks/usePayments';
import { useState } from 'react';
import { paymentPayoutTableColumns, workersTableColumn } from './constants';

interface IWallet extends Omit<IAnyPageAndWallet, "onSetWalletAddress"> {
    walletAddress:string
}


const useControls = ({defaultRegion, onChangeRegion, walletAddress}:IWallet) => {

    const [region, setRegion] = useState<STANDARD_REGIONS_API_KEYS>(defaultRegion);
    const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
    const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);

    
    const {data:fetchedWalletInfo} = useFetchWallet(region, walletAddress);
    
    const {data:fetchWorkersByWalletAddress} = useFetchWorkersByWalletAddress(region, walletAddress, 10, currentPageWorkers);
    
    const {data:fetchPaymentsByWalletAddress} = useFetchPaymentByWalletAddress(region, walletAddress, 10, currentPagePayouts);
    
    const handleChangeRegion = (id:{label:string, value:STANDARD_REGIONS_API_KEYS}) => {

        setRegion(id.value);
        if(typeof onChangeRegion === "function")
            onChangeRegion(region);
    }

    const handleChangePagePayouts = (currentPage:number) => {
        setCurrentPagePayouts(currentPage);
    }

    const handleChangePageWorkers = (currentPage:number) => {
        setCurrentPageWorkers(currentPage);
    }

    return {
        workersTableColumn,
        paymentPayoutTableColumns,
        fetchedWalletInfo,
        fetchWorkersByWalletAddress,
        fetchPaymentsByWalletAddress,
        handleChangePagePayouts,
        handleChangePageWorkers,
        handleChangeRegion,
        rowCount: tablesConfig.PAGE_LIMIT,
    }
}

export default useControls;
