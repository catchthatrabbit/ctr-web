import { Header } from "@site/src/components/Templates/Header";
import {BlockListTabs} from "@site/src/components/Organisms/BlocksListTabs";
import { List } from "@site/src/components/Templates/List";
import { convertAnyBlocksResponse2AnyBlocksInfo } from "./utils";
import { BlockTitle } from "@site/src/components/Molecules/PictureTitles";
import useControls from "./controls";
import { Spacer } from "@site/src/components/Atoms/Spacer";

const Blocks = () => {

    const  {region, dataTableColumns, fetchCandidatesBlocks, fetchedImMatureBlocks, fetchedMaturedBlocks, handleChangeRegion, handlePageChange} = 
    useControls()

    return (
        <>
            <Spacer variant="xxxxl" />
            <Header defaultRegion={region} pageTitleComponent={<BlockTitle />} onChangeRegion={handleChangeRegion} 
            layout={{boards:false, search:false, dropdown:true}} />
            <div className="container">
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
            </div>
        </>
    )
}

export default Blocks;