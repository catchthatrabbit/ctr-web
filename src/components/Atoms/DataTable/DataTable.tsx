import React from "react";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
// eslint-disable-next-line import/no-unresolved
import Link from "@docusaurus/Link";
import { checkArrayObjectIsEmpty } from "@site/src/utils/checkIsEmpty";
import LoadingSkeleton from "./LoadingSkeleton";
import { IDataTable } from "./types";

import { CopyButtonSmall } from "../../Molecules/CopyButton";

import styles from "./styles.module.css";
import "./styles.css";
const DataTable = ({
  data,
  columns,
  emptyComponent = <></>,
  isLoading,
  loadingComp = <></>,
}: IDataTable) => {
  if (isLoading)
    return <LoadingSkeleton columns={columns} loadingComp={loadingComp} />;

  return checkArrayObjectIsEmpty(data) ? (
    emptyComponent
  ) : (
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
              <Text variant="heading2" weight="bold">
                {colItem.label || ""}
              </Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((rowItem, rowIndex) => (
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
                        <Text variant="body" color="primary" type="value">
                          {rowItem[`${colItem.value}_summarized`]?.toString() ||
                            ""}
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
                    <Text variant="body" type="value">
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
  );
};

export default DataTable;
