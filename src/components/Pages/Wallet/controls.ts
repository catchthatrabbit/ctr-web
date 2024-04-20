import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';
import { STANDARD_REGIONS_API_KEYS } from '@site/src/Api/types';
import { useFetchWallet, useFetchWorkersByWalletAddress } from '@site/src/hooks/useWallet';
import { useFetchPaymentByWalletAddress } from '@site/src/hooks/usePayments';
import { useState } from 'react';
import { paymentPayoutTableColumns } from './constants';
import { IDataTable } from '@site/src/components/Atoms/DataTable';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { EXTERNAL_URL } from '@site/src/constants/links';
import { EXTERNAL_URL_ENUM } from '@site/src/enums/externalUrls.enum';

interface IWallet extends Omit<IAnyPageAndWallet, "onSetWalletAddress"> {
    walletAddress:string
}


const useControls = ({defaultRegion, onChangeRegion, walletAddress}:IWallet) => {

    const [region, setRegion] = useState<STANDARD_REGIONS_API_KEYS>(defaultRegion);
    const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
    const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);
    const {siteConfig} = useDocusaurusContext();

    const workersTableColumn = [
        {
            value:'rabbit',
            label:'Rabbit',
            isPrimary: true,
            href:siteConfig.customFields.CORE_TALK_SPACE_URL? siteConfig.customFields.CORE_TALK_SPACE_URL : 
            EXTERNAL_URL[EXTERNAL_URL_ENUM.CORE_TALK_SPACE_URL]
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
    
    const {data:fetchedWalletInfo, isLoading:isLoadingFetchWallet} = useFetchWallet(region, walletAddress);
    
    const {data:fetchWorkersByWalletAddress, isLoading:isLoadingFetchWorkerByWalletAddress} = useFetchWorkersByWalletAddress(region, walletAddress, 10, currentPageWorkers);
    
    const {data:fetchPaymentsByWalletAddress, isLoading:isLoadingFetchPaymentByWalletAddress} = useFetchPaymentByWalletAddress(region, walletAddress, 10, currentPagePayouts);
    
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
        isLoadingFetchPaymentByWalletAddress, 
        isLoadingFetchWallet,
        isLoadingFetchWorkerByWalletAddress
    }
}

export default useControls;
