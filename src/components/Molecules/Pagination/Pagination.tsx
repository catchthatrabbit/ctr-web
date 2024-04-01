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
}

const Pagination = ({limit=10, offset=0, total=0,className, onPageChange, emptyComponent = <></>}:IPagination) => {


    const handleChangePage = ( selectedItem:{selected:number}) => {
        if(typeof onPageChange === "function")
            onPageChange(selectedItem.selected);
    }

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