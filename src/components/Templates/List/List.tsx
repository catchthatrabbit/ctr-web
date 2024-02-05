import { DataTable, IDataTable } from '@site/src/components/Atoms/DataTable';
import { Pagination } from '@site/src/components/Molecules/Pagination';
import styles from './styles.module.css';
import { Spacer } from '../../Atoms/Spacer';


interface IList {
    data: IDataTable['data']
    dataTableColumns: IDataTable['columns']
    total: number
    onPageChange: (currentPage:number) => void
}

const List = ({dataTableColumns, data, onPageChange, total}:IList) => {

    return(
        <div className={styles.listRoot}>
            <div className='container'>
                <div className='row'>
                    <Spacer variant='xLarge' />
                    <div className='col col--12'>
                        <DataTable columns={dataTableColumns} data={data} />
                    </div>
                    <div className='col col--12'>
                        <Pagination total={total} onPageChange={onPageChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;