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
}

const Info = ({data, payouts, workers}:IInfo) => {


    const generalStats = useMemo(() => convertWalletInfoResponse2GeneralState(data), [data]); 

    const computingInformation = useMemo(() =>convertWalletInfoResponse2ComputingInformation(data), [data]);


    return(
        <>
            <div className={styles.infoRoot}>
                <TwoColumnsPanel data={computingInformation} />
                <Spacer direction="horizontal" />
                <TwoColumnsPanel data={generalStats} />
            </div>
            <Spacer variant="xLarge" />
            <WalletInfoTabs payouts={payouts} workers={workers} />
        </>
    )
}

export default Info;