import clsx from "clsx";
import ReactPaginate from "react-paginate";
import React from "react";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import PaginationLeft from "@site/src/icons/PaginationLeft";
import PaginationRight from "@site/src/icons/PaginationRight";
import LeftDisabled from "@site/src/icons/LeftDisabled";
import styles from "./styles.module.css";
import { Text } from "@site/src/components/Atoms/Text";

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

  const startItem = offset * limit + 1;
  const endItem = Math.min((offset + 1) * limit, total);

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
    <div className={styles.paginationContainer}>
      <Text
        variant="smallBody"
        type="regular"
        color="summary"
      >{`Showing ${startItem}-${endItem} of ${total}`}</Text>

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
        nextLabel={<PaginationRight />}
        nextClassName={styles.paginationNext}
        onPageChange={handleChangePage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(total / limit)}
        previousClassName={styles.paginationPrevious}
        previousLabel={<PaginationLeft />}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
