import { DataTable, IDataTable } from '@site/src/components/Atoms/DataTable';
import { Pagination } from '@site/src/components/Molecules/Pagination';
import styles from './styles.module.css';
import { Spacer } from '../../Atoms/Spacer';
import { Empty } from '@site/src/components/Atoms/Empty';
import { useState } from 'react';


interface IList {
    data: IDataTable['data']
    dataTableColumns: IDataTable['columns']
    hidePagination?:boolean
    total?: number
    onPageChange?: (currentPage:number) => void
}

const List = ({dataTableColumns, data, onPageChange, total, hidePagination}:IList) => {

    const [currentPage, setCurrentPage] = useState<number>(0);
    
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
                        <DataTable emptyComponent={<Empty />} columns={dataTableColumns} data={data} />
                    </div>
                    {!hidePagination && 
                        <div className='col col--12'>
                            <Pagination offset={currentPage} total={total} onPageChange={handlePageChange} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default List;