import { DataTable } from "@site/src/components/Atoms/DataTable";
import type { IDataTable } from "@site/src/components/Atoms/DataTable/types";
import { Pagination } from "@site/src/components/Molecules/Pagination";
import { Spacer } from "../../Atoms/Spacer";
import { Empty } from "@site/src/components/Atoms/Empty";
import { useCallback, useState } from "react";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { MAX_PAGES } from "@site/src/configs/tables.config";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface IList {
  data: IDataTable["data"];
  dataTableColumns: IDataTable["columns"];
  hidePagination?: boolean;
  total?: number;
  onPageChange?: (currentPage: number) => void;
  isLoading?: boolean;
}

const List = ({
  dataTableColumns,
  data,
  onPageChange,
  total,
  hidePagination,
  isLoading,
}: IList) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { mobile } = useMediaQueries();

  const calcTotal = useCallback(() => {
    if (total > MAX_PAGES) return MAX_PAGES;
    return total;
  }, [total]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof onPageChange === "function") onPageChange(page);
  };

  return (
    <div className={styles.listRoot}>
      <div>
        <div className="row">
          <Spacer variant="xl" />
          <div
            className={clsx(styles.tableWrapper, {
              [styles.listMarginInlineMobile]: mobile,
            })}
          >
            <DataTable
              emptyComponent={<Empty />}
              columns={dataTableColumns}
              data={data}
              isLoading={isLoading}
              loadingComp={<LoadingPlaceholder />}
            />
          </div>
          {!hidePagination && (
            <div className={styles.paginationWrapper}>
              <Pagination
                offset={currentPage}
                total={calcTotal()}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                loadingComp={<LoadingPlaceholder />}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
