import React from "react";
import { TwoColumnsPanel } from "../../Molecules/TwoColumnsPanel";
import { WALLET_INFO_RESPONSE } from "@site/src/Api/wallet/types";
import { convertWalletInfoResponse2ComputingInformation, convertWalletInfoResponse2GeneralState } from "./utils";
import { useMemo } from "react";
import styles from './styles.module.css';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { WalletInfoTabs } from "@site/src/components/Organisms/WalletInfoTabs";

interface IInfo{
    data: WALLET_INFO_RESPONSE
    workers?: React.ReactNode
    payouts?: React.ReactNode
    isLoading?: boolean
    loadingPlaceholder?: React.ReactNode
    isLoadingWorkers?: boolean
}

const Info = ({data, payouts, workers, isLoading, loadingPlaceholder}:IInfo) => {


    const generalStats = useMemo(() => convertWalletInfoResponse2GeneralState(data), [data]); 

    const computingInformation = useMemo(() =>convertWalletInfoResponse2ComputingInformation(data), [data]);


    return(
        <>
            <div className={styles.infoRoot}>
                <TwoColumnsPanel data={computingInformation} isLoading={isLoading} loadingPlaceholder={loadingPlaceholder} />
                <Spacer variant="md" direction="hor" />
                <TwoColumnsPanel data={generalStats} isLoading={isLoading} loadingPlaceholder={loadingPlaceholder} />
            </div>
            <Spacer variant="xl" />
            <WalletInfoTabs payouts={payouts} workers={workers} />
        </>
    )
}

export default Info;