import clsx from "clsx";
import ReactPaginate from "react-paginate";
import styles from './styles.module.css';

interface IPagination {
    offset?:number
    limit?:number
    total?:number
    onPageChange?: (currentPage:number) => void
    className?: string 
}

const Pagination = ({limit=10, offset=0, total=0,className, onPageChange}:IPagination) => {


    const handleChangePage = ( selectedItem:{selected:number}) => {
        if(typeof onPageChange === "function")
            onPageChange(selectedItem.selected);
    }

    return (
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