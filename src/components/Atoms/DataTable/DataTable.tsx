import React, { useState } from "react";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { checkArrayObjectIsEmpty } from "@site/src/utils/checkIsEmpty";
import LoadingSkeleton from "./LoadingSkeleton";
import { IDataTable } from "./types";
import { Pagination } from "@site/src/components/Molecules/Pagination"; // Import Pagination component

import { CopyButtonSmall } from "../../Molecules/CopyButton";

import styles from "./styles.module.css";
import "./styles.css";

const DataTable = ({
  data,
  columns,
  emptyComponent = <></>,
  isLoading,
  loadingComp = <></>,
  itemsPerPage = 10, // Add itemsPerPage prop
}: IDataTable) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const paginatedData = data
    ? data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : [];

  if (isLoading)
    return <LoadingSkeleton columns={columns} loadingComp={loadingComp} />;

  return checkArrayObjectIsEmpty(data) ? (
    emptyComponent
  ) : (
    <>
      <table className={styles.table} border={0}>
        <thead>
          <tr>
            {columns?.map((colItem, colIndex) => (
              <th
                key={colIndex}
                className={clsx(
                  colItem.alignToCenter && styles.tableCenteredText,
                  colIndex === 0 && styles.tablePaddingLeft,
                )}
              >
                <Text
                  variant="tinyBody"
                  color="white"
                  style={{ textTransform: "uppercase" }}
                >
                  {colItem.label || ""}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData?.map((rowItem, rowIndex) => (
            <tr key={rowIndex} className={styles.tableRow}>
              {columns?.map((colItem, colIndex) => (
                <td
                  key={colIndex}
                  className={clsx(
                    colItem.alignToCenter && styles.tableCenteredText,
                    colIndex === 0 && styles.tablePaddingLeft,
                  )}
                >
                  <span className={styles.copyButton}>
                    {colItem.isPrimary ? (
                      colItem.href ? (
                        <Link to={`${colItem.href}/${rowItem[colItem.value]}`}>
                          <Text
                            variant="smallBody"
                            color="primary"
                            type="value"
                          >
                            {rowItem[
                              `${colItem.value}_summarized`
                            ]?.toString() || ""}
                          </Text>
                        </Link>
                      ) : (
                        <Text
                          variant="body"
                          className={styles.cursorPointer}
                          color="primary"
                          type="value"
                          onClick={() =>
                            typeof colItem?.fn === "function" &&
                            colItem.fn(rowItem[colItem.value]?.toString())
                          }
                        >
                          {rowItem[`${colItem.value}_summarized`]?.toString() ||
                            ""}
                        </Text>
                      )
                    ) : (
                      <Text
                        variant="smallBody"
                        type="value"
                        color="white"
                        weight="bold"
                      >
                        {rowItem[colItem.value]?.toString() || ""}
                      </Text>
                    )}
                    {colItem.canBeCopied && (
                      <CopyButtonSmall
                        textToCopy={rowItem[colItem.value]?.toString() || ""}
                      />
                    )}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        limit={itemsPerPage}
        offset={currentPage}
        total={data ? data.length : 0}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default DataTable;
