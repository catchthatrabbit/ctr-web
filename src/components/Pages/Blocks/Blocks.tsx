import { STANDARD_REGIONS_API } from "@site/src/Api/constants";
import { Header } from "@site/src/components/Templates/Header";
import { useHeaders } from "@site/src/hooks/useHeaders";
import {BlockListTabs} from "@site/src/components/Organisms/BlocksListTabs";
import { List } from "@site/src/components/Templates/List";
import { useFetchAllBlocks } from "@site/src/hooks/useBlocks";
import { convertAnyBlocksResponse2AnyBlocksInfo } from "./utils";
import { useMemo } from "react";
import { BLOCK_DETAILS_URL } from "@site/src/constants/urls";
import { usePaginate } from "@site/src/hooks/usePaginate";
import { BlockTitle } from "@site/src/components/Molecules/PictureTitles";

const Blocks = () => {

    const {region, handleChangeRegion} = useHeaders({defaultRegion:STANDARD_REGIONS_API.EU});

    const {currentPageNumber, handlePageChange} = usePaginate();

    const [fetchedMaturedBlocks, fetchedImMatureBlocks, fetchCandidatesBlocks] = useFetchAllBlocks(region, 10, currentPageNumber);
    
    const dataTableColumns = useMemo(() => [
        {value:'height', label: 'Height', isPrimary:true, href:BLOCK_DETAILS_URL}, 
        {value:'type', label: 'Type', alignToCenter:true}, 
        {value:'minedOn', label: 'Mined on', alignToCenter:true},
        {value:'blockHash', label: 'Block hash', alignToCenter:true, isPrimary:true, href:BLOCK_DETAILS_URL},
        {value:'reward', label: 'Reward', alignToCenter:true},
        {value:'variance', label: 'Variance', alignToCenter:true}
    ], []);

    return (
        <>
            <Header defaultRegion={region} pageTitleComponent={<BlockTitle />} onChangeRegion={handleChangeRegion} 
            layout={{boards:false, search:false, dropdown:true}} />
            <BlockListTabs 
                blocks={
                    <List data={convertAnyBlocksResponse2AnyBlocksInfo(fetchedMaturedBlocks?.data, "matured")} onPageChange={handlePageChange}
                    dataTableColumns={dataTableColumns} total={fetchedMaturedBlocks?.data?.maturedTotal} 
                    />
                    } 
                immature={
                    <List data={convertAnyBlocksResponse2AnyBlocksInfo(fetchedImMatureBlocks?.data, "immature")} onPageChange={handlePageChange}
                    dataTableColumns={dataTableColumns} total={fetchedImMatureBlocks?.data?.immatureTotal} 
                    />
                }
                candidates={
                    <List data={convertAnyBlocksResponse2AnyBlocksInfo(fetchCandidatesBlocks?.data, "candidates")} onPageChange={handlePageChange}
                    dataTableColumns={dataTableColumns} total={fetchCandidatesBlocks?.data?.candidatesTotal} 
                    />
                }
            />
        </>
    )
}

export default Blocks;