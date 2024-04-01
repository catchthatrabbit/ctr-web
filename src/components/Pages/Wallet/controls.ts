import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import { IDataTable } from '@site/src/components/Atoms/DataTable';
import { EXTERNAL_URL } from '@site/src/constants/links';
import { EXTERNAL_URL_ENUM } from '@site/src/enums/externalUrls.enum';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';
import { useFetchWallet, useFetchWorkersByWalletAddress } from '@site/src/hooks/useWallet';
import { useFetchPaymentByWalletAddress } from '@site/src/hooks/usePayments';
import { useState } from 'react';

interface IWallet extends Omit<IAnyPageAndWallet, "onSetWalletAddress"> {
    walletAddress:string
}


const useControls = ({defaultRegion, onChangeRegion, walletAddress}:IWallet) => {
    const workersTableColumn = [
        {
            value:'rabbit',
            label:'Rabbit',
        },
        {
            value:'hr',
            label: 'Hashrate ~30m',
            alignToCenter:true
        },
        {
            value:'hr2',
            label: 'Hashrate ~3h',
            alignToCenter:true
        },
        {
            value:'lastBeat',
            label: 'Last share',
            alignToCenter:true
        },
        {
            value:'offline',
            label: 'Status',
            alignToCenter:true
        }
    ] as IDataTable['columns']

    const paymentPayoutTableColumns = [
        {
            label:"Time",
            value:"timestamp",
            alignToCenter:true
        },
        {
            label:"Tx id",
            value:"tx",
            isPrimary:true,
            alignToCenter:true,
            href: EXTERNAL_URL[EXTERNAL_URL_ENUM.TRANSACTION_DETAILS]
        },
        {
            label:"Amount",
            value:"amount",
            alignToCenter:true
        }

    ] as IDataTable['columns']

    const [region, setRegion] = useState<STANDARD_REGIONS_API_KEYS>(defaultRegion);
    const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
    const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);

    const {data:fetchedWalletInfo} = useFetchWallet(region, walletAddress);

    const {data:fetchWorkersByWalletAddress} = useFetchWorkersByWalletAddress(region, walletAddress, 10, currentPageWorkers);

    const {data:fetchPaymentsByWalletAddress} = useFetchPaymentByWalletAddress(region, walletAddress, 10, currentPagePayouts);

    const handleChangeRegion = (region:STANDARD_REGIONS_API_KEYS) => {
        setRegion(region);
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
