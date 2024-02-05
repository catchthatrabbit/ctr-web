import { useFetchWallet } from "@site/src/hooks/useWallet";
import { Info } from "@site/src/components/Templates/Info";
import { List } from '@site/src/components/Templates/List';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { STANDARD_REGIONS_API_VALUES } from "@site/src/Api/types";
import { useState } from "react";
import { Header } from "@site/src/components/Templates/Header";
import {IDataTable} from '@site/src/components/Atoms/DataTable'
import { useFetchWorkersByWalletAddress } from "@site/src/hooks/useWorkers";
import { convertPaymentsResponse2PaymentInfo, convertWorkersResponse2Info } from "./utils";
import { useFetchPaymentByWalletAddress } from "@site/src/hooks/usePayments";
import { Button } from "../../Atoms/Button";
import { TRANSACTION_DETAILS_URL } from "@site/src/constants/urls";
import { Panel, PanelContent } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";


interface IWallet {
    walletAddress:string
    defaultRegion: STANDARD_REGIONS_API_VALUES
    onChangeRegion?: (region:STANDARD_REGIONS_API_VALUES) => void
    onClearWalletAddress?: () => void
}


const Wallet = ({walletAddress, defaultRegion, onChangeRegion, onClearWalletAddress}:IWallet) => {

    const WORKERS_COLUMN = [
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

    const PAYMENT_PAYOUTS = [
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
            href: TRANSACTION_DETAILS_URL
        },
        {
            label:"Amount",
            value:"amount",
            alignToCenter:true
        }

    ] as IDataTable['columns']

    const [region, setRegion] = useState<STANDARD_REGIONS_API_VALUES>(defaultRegion);
    const [currentPagePayouts, setCurrentPagePayouts] = useState<number>(1);
    const [currentPageWorkers, setCurrentPageWorkers] = useState<number>(1);

    const {data:fetchedWalletInfo} = useFetchWallet(region, walletAddress);

    const {data:fetchWorkersByWalletAddress} = useFetchWorkersByWalletAddress(region, walletAddress, 10, currentPageWorkers);

    const {data:fetchPaymentsByWalletAddress} = useFetchPaymentByWalletAddress(region, walletAddress, 10, currentPagePayouts);

    const handleChangeRegion = (region:STANDARD_REGIONS_API_VALUES) => {
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

    return(
        <div className="container">
            <Button value="Back" onClick={onClearWalletAddress} />
            <Header defaultRegion={region} onChangeRegion={handleChangeRegion} iban={walletAddress}
            layout={{boards:true, search:false, dropdown:true}}  />
            <Info data={fetchedWalletInfo} 
                workers={
                    <List data={convertWorkersResponse2Info(fetchWorkersByWalletAddress)} dataTableColumns={WORKERS_COLUMN} 
                    total={fetchWorkersByWalletAddress?.workersTotal}
                     onPageChange={handleChangePageWorkers} />
                } 
                payouts={
                    <List data={convertPaymentsResponse2PaymentInfo(fetchPaymentsByWalletAddress)} 
                    dataTableColumns={PAYMENT_PAYOUTS} 
                    total={fetchedWalletInfo?.paymentsTotal} onPageChange={handleChangePagePayouts} />
                }
            />
            <Spacer />
            
            <Panel title="Connections">
                <PanelContent>
                    <Text variant="values" size="sm">Direct link to stats:&nbsp;</Text><Text variant="link">{`${walletAddress}.ctr.watch`}</Text>
                    <br />
                    <Text variant="values" size="sm">Direct link.</Text>
                </PanelContent>
            </Panel>

            <Spacer variant="xLarge" />
        </div>
    )
}

export default Wallet;