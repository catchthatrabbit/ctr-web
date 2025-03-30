import React, { useState } from "react";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { checkArrayObjectIsEmpty } from "@site/src/utils/checkIsEmpty";
import LoadingSkeleton from "./LoadingSkeleton";
import { IDataTable } from "./types";
import { Pagination } from "@site/src/components/Molecules/Pagination";

import { CopyButtonSmall } from "../../Molecules/CopyButton";

import styles from "./styles.module.css";

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
    const cellValue = rowItem[colItem.value]?.toString() || "";
    const summarizedValue =
      rowItem[`${colItem.value}_summarized`]?.toString() || "";

    if (colItem.isPrimary) {
      if (colItem.href) {
        return (
          <Link to={`${colItem.href}/${rowItem[colItem.value]}`}>
            <Text variant="body" color="primary" type="zephirum">
              {summarizedValue}
            </Text>
          </Link>
        );
      }

      return (
        <Text
          variant="body"
          className={styles.cursorPointer}
          color="primary"
          type="zephirum"
          onClick={() =>
            typeof colItem.fn === "function" && colItem.fn(cellValue)
          }
        >
          {summarizedValue}
        </Text>
      );
    }

    return (
      <Text
        variant="smallBody"
        type="regular"
        weight="medium"
        color="white"
        className={clsx({
          [styles.runningText]: cellValue === "Running",
          [styles.inactiveText]: cellValue === "Inactive",
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
          [styles.tableWrapperWallet]: context === "wallet",
        })}
      >
        <table
          className={clsx(
            styles.table,
            context === "wallet" && styles.walletTable,
            context === "blocks" && styles.blocksTable,
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
                    context === "wallet" && styles.walletTableHeader,
                  )}
                >
                  <Text
                    variant="tinyBody"
                    color="white"
                    weight="bold"
                    style={{ textTransform: "uppercase" }}
                  >
                    {colItem.label || ""}
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
                      colIndex === 0 && styles.tablePaddingLeft,
                    )}
                  >
                    <span className={styles.copyButton}>
                      {renderCellContent(rowItem, colItem)}
                      {colItem.canBeCopied && (
                        <CopyButtonSmall textToCopy={rowItem[colItem.value]} />
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
