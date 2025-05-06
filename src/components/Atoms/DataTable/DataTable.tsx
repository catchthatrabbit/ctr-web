import React, { useState } from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import { checkArrayObjectIsEmpty } from '@site/src/utils/checkIsEmpty';
import { IDataTable } from './types';
import { Pagination } from '@site/src/components/Molecules/Pagination';
import { CopyButtonSmall } from '../../Molecules/CopyButton';
import { FEDIVERSE_REGEX } from '@site/src/constants/fediverse';
import { convertWorkerName } from '@site/src/utils/convertWorkerName';
import styles from './styles.module.css';

interface IColumn {
  value: string;
  label: string;
  alignToCenter?: boolean;
  isPrimary?: boolean;
  fn?: (value: string) => void;
  href?: string;
  canBeCopied?: boolean;
}

const DataTable = ({
  data,
  columns,
  emptyComponent = <></>,
  isLoading,
  loadingComp = <></>,
  itemsPerPage = 10,
  context,
  hidePagination = false,
}: IDataTable) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const paginatedData = data
    ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  if (isLoading) return loadingComp;

  if (checkArrayObjectIsEmpty(data)) return emptyComponent;

  const renderCellContent = (rowItem: any, colItem: IColumn) => {
    const cellValue = rowItem[colItem.value]?.toString() || '';
    const summarizedValue =
      rowItem[`${colItem.value}_summarized`]?.toString() || '';

    if (colItem.isPrimary) {
      if (colItem.href) {
        return (
          <Link to={`${colItem.href}/${rowItem[colItem.value]}`} className={clsx(styles.link, styles.zephirum)}>
            {summarizedValue}
          </Link>
        );
      }
      if (colItem.fn) {
        return (
          <a
            onClick={() => typeof colItem.fn === 'function' && colItem.fn(cellValue)}
            className={clsx(styles.link, styles.zephirum)}
            style={{ cursor: 'pointer' }}
          >
            {summarizedValue}
          </a>
        );
      }
      if (FEDIVERSE_REGEX.test(summarizedValue)) {
        const { href, caption } = convertWorkerName(summarizedValue);
        if (href) {
          return (
            <a
              href={href}
            className={clsx(styles.link, styles.zephirum)}
            target="_blank"
            rel="noopener"
            >
              {caption}
            </a>
          );
        }
      }

      return <Text type="zephirum" variant="subheading" weight="semiBold" color="white">{summarizedValue}</Text>;
    }

    return (
      <Text
        variant="smallBody"
        type="regular"
        weight="medium"
        color="white"
        className={clsx({
          [styles.runningText]: cellValue === 'Running',
          [styles.inactiveText]: cellValue === 'Inactive',
        })}
      >
        {cellValue}
      </Text>
    );
  };

  return (
    <>
      <div
        className={clsx(styles.tableWrapper, {
          [styles.tableWrapperWallet]: context === 'wallet',
        })}
      >
        <table
          className={clsx(
            styles.table,
            context === 'wallet' && styles.walletTable,
            context === 'blocks' && styles.blocksTable
          )}
          border={0}
        >
          <thead>
            <tr>
              {columns.map((colItem, colIndex) => (
                <th
                  key={colIndex}
                  className={clsx(
                    colItem.alignToCenter && styles.tableCenteredText,
                    colIndex === 0 && styles.tablePaddingLeft,
                    context === 'wallet' && styles.walletTableHeader
                  )}
                >
                  <Text
                    variant="tinyBody"
                    color="white"
                    weight="bold"
                    style={{ textTransform: 'uppercase' }}
                  >
                    {colItem.label || ''}
                  </Text>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((rowItem, rowIndex) => (
              <tr key={rowIndex} className={styles.tableRow}>
                {columns.map((colItem, colIndex) => (
                  <td
                    key={colIndex}
                    className={clsx(
                      colItem.alignToCenter && styles.tableCenteredText,
                      colIndex === 0 && styles.tablePaddingLeft
                    )}
                  >
                    <span className={styles.copyButton}>
                      {renderCellContent(rowItem, colItem)}
                      {colItem.canBeCopied && (
                        <CopyButtonSmall textToCopy={String(rowItem[colItem.value])} />
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!hidePagination && (
        <Pagination
          limit={itemsPerPage}
          offset={currentPage}
          total={data.length}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default DataTable;
