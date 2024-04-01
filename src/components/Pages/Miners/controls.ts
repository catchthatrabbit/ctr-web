import { useFetchMiners, useFetchMinersState } from '@site/src/hooks/useMiners';
import { convertMinerResponse2MinerList } from './utils';
import { useHeaders } from '@site/src/hooks/useHeaders';
import { usePaginate } from '@site/src/hooks/usePaginate';
import { MINERS_RESPONSE } from '@site/src/Api/miners/types';
import { useHistory } from '@docusaurus/router';
import { useMemo } from 'react';
import { IAnyPageAndWallet } from '@site/src/components/Pages/types';
import { tablesConfig } from '@site/src/configs';

const useControls = ({onSetWalletAddress, defaultRegion, onChangeRegion}:IAnyPageAndWallet) => {
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

    return {
        dataTableColumns,
        minerList,
        rowCount: tablesConfig.PAGE_LIMIT,
        handleSearch, 
        handleChangeRegion,
        handlePageChange,
        fetchedMinerState, 
        fetchedMinerList
    }
}

export default useControls;
