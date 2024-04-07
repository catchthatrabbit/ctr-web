import { DataTable, IDataTable } from '@site/src/components/Atoms/DataTable';
import { Pagination } from '@site/src/components/Molecules/Pagination';
import styles from './styles.module.css';
import { Spacer } from '../../Atoms/Spacer';
import { Empty } from '@site/src/components/Atoms/Empty';
import { useCallback, useMemo, useState } from 'react';
import { LoadingPlaceholder } from '@site/src/components/Atoms/LoadingPlaceholder';
import { MAX_PAGES } from '@site/src/configs/tables.config';


interface IList {
    data: IDataTable['data']
    dataTableColumns: IDataTable['columns']
    hidePagination?:boolean
    total?: number
    onPageChange?: (currentPage:number) => void
    isLoading?: boolean
}

const List = ({dataTableColumns, data, onPageChange, total, hidePagination, isLoading}:IList) => {

    const [currentPage, setCurrentPage] = useState<number>(0);

    const calcTotal = useCallback(() => {

        if(total > MAX_PAGES)
            return MAX_PAGES;
        return total;

    }, [total])
    
    const handlePageChange = (page:number) => {
        setCurrentPage(page);
        if(typeof onPageChange === "function")
            onPageChange(page);
    }

    return(
        <div className={styles.listRoot}>
            <div>
                <div className='row'>
                    <Spacer variant='xl' />
                    <div className='col col--12'>
                        <DataTable emptyComponent={<Empty />} columns={dataTableColumns} data={data} isLoading={isLoading} 
                        loadingComp={<LoadingPlaceholder />} />
                    </div>
                    {!hidePagination && 
                        <div className='col col--12'>
                            <Pagination offset={currentPage} total={calcTotal()} onPageChange={handlePageChange} isLoading={isLoading} 
                            loadingCompo={<LoadingPlaceholder />} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default List;