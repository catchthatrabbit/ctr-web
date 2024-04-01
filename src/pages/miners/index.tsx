import {ConfiguredLayout} from '@site/src/components/Templates/ConfiguredLayout';
import { Miners } from '@site/src/components/Pages/Miners';
import { Wallet } from '@site/src/components/Pages/Wallet';
import { useWalletPage } from '@site/src/hooks/useWallet';


const MinersPage = () => {

    const {walletAddress, handleChangeRegion, handleClearWalletAddress,handleWalletAddress, region} = useWalletPage();

    return  <ConfiguredLayout>
            {walletAddress? 
                <Wallet onClearWalletAddress={handleClearWalletAddress} 
                defaultRegion={region} walletAddress={walletAddress} onChangeRegion={handleChangeRegion} />
                    :
                <Miners defaultRegion={region} onSetWalletAddress={handleWalletAddress} onChangeRegion={handleChangeRegion} />
            }
    </ConfiguredLayout>
}

export default MinersPage;