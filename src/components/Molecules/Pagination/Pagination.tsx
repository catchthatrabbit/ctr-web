import clsx from "clsx";
import ReactPaginate from "react-paginate";
import styles from './styles.module.css';
import React from 'react';

interface IPagination {
    offset?:number
    limit?:number
    total?:number
    onPageChange?: (currentPage:number) => void
    className?: string
    emptyComponent?:React.ReactNode 
    isLoading?: boolean
    loadingCompo?: React.ReactNode
}

const Pagination = ({limit=10, offset=0, total=0,className, onPageChange, emptyComponent = <></>, isLoading, loadingCompo}:IPagination) => {


    const handleChangePage = ( selectedItem:{selected:number}) => {
        if(typeof onPageChange === "function")
            onPageChange(selectedItem.selected);
    }

    if(isLoading)
        return <div className={styles.pagination}>{[1,2,3,4,5].map((_, index) => 
        <div key={index} className={clsx([styles.paginationItem, styles.paginationLoadingSkeleton])}>{loadingCompo} </div>)}</div>;

    return total === 0? emptyComponent 
        :
        (
            <ReactPaginate
            initialPage={offset}
            className={clsx(className, styles.pagination)}
            activeClassName={styles.selectedPage}
            pageClassName={styles.paginationItem}
            disabledClassName={styles.disabled}
            breakClassName={styles.paginationItem}
            breakLabel="..."
            nextLabel="Next"
            nextClassName={styles.paginationNext}
            onPageChange={handleChangePage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            pageCount={Math.ceil(total / limit)}
            previousClassName={styles.paginationPrevious}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            />
      )

}

export default Pagination;