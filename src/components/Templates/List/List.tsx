import React from 'react';
import { DataTable } from '@site/src/components/Atoms/DataTable';
import type { IDataTable } from '@site/src/components/Atoms/DataTable/types';
import { Pagination } from '@site/src/components/Molecules/Pagination';
import { Empty } from '@site/src/components/Atoms/Empty';
import { useCallback, useState } from 'react';
import { LoadingPlaceholder } from '@site/src/components/Atoms/LoadingPlaceholder';
import { MAX_PAGES } from '@site/src/configs/tables.config';
import clsx from 'clsx';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import styles from './styles.module.css';

interface IList {
  data: IDataTable['data'];
  dataTableColumns: IDataTable['columns'];
  hidePagination?: boolean;
  total?: number;
  onPageChange?: (currentPage: number) => void;
  isLoading?: boolean;
  context?: string;
  filterStatus?: string;
}

const List = ({
  dataTableColumns,
  data,
  onPageChange,
  total,

  hidePagination,
  isLoading,
  context,
  filterStatus = 'All',
}: IList) => {
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (typeof onPageChange === 'function') onPageChange(page);
  };

  return (
    <div
      className={clsx(
        styles.listRoot,
        context === 'wallet' && styles.walletListRoot,
        context === 'blocks' && styles.blocksListRoot
      )}
    >
      <div>
        <div className="row">
          <div className={clsx(styles.tableWrapper, {})}>
            <DataTable
              emptyComponent={<Empty />}
              columns={dataTableColumns}
              data={data}
              isLoading={isLoading}
              loadingComp={<LoadingPlaceholder />}
              context={context}
              hidePagination={hidePagination}
            />
          </div>

          <div
            className={clsx(
              styles.paginationWrapper,
              context === 'blocks' && styles.blocksPaginationWrapper
            )}
          >
            {hidePagination && (
              <Pagination
                offset={currentPage}
                total={total}
                onPageChange={handlePageChange}
                isLoading={isLoading}
                loadingComp={<LoadingPlaceholder />}
                isFiltered={filterStatus !== 'All'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
