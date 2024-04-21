import clsx from "clsx";
import ReactPaginate from "react-paginate";
import React from "react";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface IPagination {
  offset?: number;
  limit?: number;
  total?: number;
  onPageChange?: (currentPage: number) => void;
  className?: string;
  emptyComponent?: React.ReactNode;
  isLoading?: boolean;
  loadingComp?: React.ReactNode;
}

const Pagination = ({
  limit = 10,
  offset = 0,
  total = 0,
  className,
  onPageChange,
  emptyComponent = <></>,
  isLoading,
  loadingComp,
}: IPagination) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();

  const handleChangePage = (selectedItem: { selected: number }) => {
    if (typeof onPageChange === "function") onPageChange(selectedItem.selected);
  };

  if (isLoading)
    return (
      <div
        className={clsx(styles.pagination, {
          [styles.paginationWidthDesktop]: desktop,
          [styles.paginationWidthLaptop]: laptop,
          [styles.paginationWidthTablet]: tablet,
          [styles.paginationWidthMobile]: mobile,
        })}
      >
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className={clsx(
              styles.paginationItem,
              styles.paginationLoadingSkeleton,
            )}
          >
            {loadingComp}{" "}
          </div>
        ))}
      </div>
    );

  return total === 0 ? (
    emptyComponent
  ) : (
    <ReactPaginate
      initialPage={offset}
      className={clsx(className, styles.pagination, {
        [styles.paginationWidthDesktop]: desktop,
        [styles.paginationWidthLaptop]: laptop,
        [styles.paginationWidthTablet]: tablet,
        [styles.paginationWidthMobile]: mobile,
      })}
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
  );
};

export default Pagination;
