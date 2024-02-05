import {ConfiguredLayout} from '@site/src/components/Templates/ConfiguredLayout';
import Payments from '@site/src/components/Pages/Payments/Payments';
import { useWalletPage } from '@site/src/hooks/useWalletPage';
import { Wallet } from '@site/src/components/Pages/Wallet';


const PaymentsPage = () => {

    const {walletAddress, handleChangeRegion, handleClearWalletAddress,handleWalletAddress, region} = useWalletPage();


    return  <ConfiguredLayout>
            {walletAddress? 
                <Wallet onClearWalletAddress={handleClearWalletAddress} 
                defaultRegion={region} walletAddress={walletAddress} onChangeRegion={handleChangeRegion} />
                    :
                <Payments defaultRegion={region} onSetWalletAddress={handleWalletAddress} onChangeRegion={handleChangeRegion} />
            }
        </ConfiguredLayout>
}

export default PaymentsPage;