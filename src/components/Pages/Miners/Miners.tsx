import { useFetchMiners, useFetchMinersState } from '@site/src/hooks/useMiners';
import { convertMinerResponse2MinerList } from './utils';
import { useMemo } from 'react';
import { List } from '@site/src/components/Templates/List';
import { MINERS_RESPONSE } from '@site/src/Api/miners/types';
import { useHistory } from '@docusaurus/router';
import { STANDARD_REGIONS_API_VALUES } from '@site/src/Api/types';
import { Header } from '@site/src/components/Templates/Header';
import {TextFormat} from '@site/src/utils/textFormat';
import { MinersTitle } from '@site/src/components/Molecules/PictureTitles';
import { useHeaders } from '@site/src/hooks/useHeaders';
import { usePaginate } from '@site/src/hooks/usePaginate';


interface IMiners {
    onSetWalletAddress: (walletAddress:string) => void
    onChangeRegion?: (region:STANDARD_REGIONS_API_VALUES) => void
    defaultRegion?: STANDARD_REGIONS_API_VALUES
}

const Miners = ({onSetWalletAddress, defaultRegion, onChangeRegion}:IMiners) => {
    const {push} = useHistory()

    const {region, handleChangeRegion, handleSearch, setWalletAddress} = 
    useHeaders({defaultRegion, onSetWalletAddress, onChangeRegion});

    const {currentPageNumber, handlePageChange} = usePaginate();

    const {data:fetchedMinerState} = useFetchMinersState(region);
    const {data:fetchedMinerList} = useFetchMiners(region, 10, currentPageNumber);

    const minerList = useMemo(() => convertMinerResponse2MinerList(fetchedMinerList as MINERS_RESPONSE), [fetchedMinerList]);

    const dataTableColumns = useMemo(() => [
        {value:'id', label: 'Miner', isPrimary:true, fn: (walletAddress) => {setWalletAddress(walletAddress); push('/miners');}}, 
        {value:'hr', label: 'Hashrate', alignToCenter:true}, 
        {value:'lastBeat', label: 'Last beat', alignToCenter:true}
    ], [])

    return <>
            <Header onChangeRegion={handleChangeRegion} 
            pageTitleComponent={<MinersTitle />}
            boardItems={
                [
                    {   
                        desc:"Total miners", value: TextFormat.getNumberText(fetchedMinerState?.minersTotal).text, 
                        prefix:TextFormat.getNumberText(fetchedMinerState?.minersTotal).prefix, 
                        suffix:TextFormat.getNumberText(fetchedMinerState?.minersTotal).suffix
                    }, 
                    {
                        desc:"Total hashrate", value:TextFormat.getHashText(fetchedMinerState?.hashrate).text, 
                        prefix:TextFormat.getHashText(fetchedMinerState?.hashrate).prefix, 
                        suffix:TextFormat.getHashText(fetchedMinerState?.hashrate).suffix
                    }
                ]
            } 
            onSearch={handleSearch} />
            <List
                dataTableColumns={dataTableColumns}
                data={minerList} 
                onPageChange={handlePageChange} 
                total={fetchedMinerList?.minersTotal}
            />
        </>

}

export default Miners;