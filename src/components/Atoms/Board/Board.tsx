import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import React from "react";

import styles from "./styles.module.css";

interface IBoard {
  value: string;
  description: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  loaderComp?: React.ReactNode;
  isLoading?: boolean;
  dir?: "vert" | "hor" | "column";
  boardClassNameHor?: string;
  boardClassNameColumn?: string;
}

const Board = ({
  description,
  value,
  suffix,
  prefix,
  className,
  dir,
  boardClassNameHor,
  boardClassNameColumn,
  loaderComp = <Text variant="subheading">&nbsp;--&nbsp;</Text>,
  isLoading = false,
}: IBoard) => {
  return (
    <div className={clsx([styles.boardContainer, className])}>
      <div
        className={clsx(styles.content, {
          [styles.boardClassNameHor]: dir === "hor",
          [styles.boardClassNameColumn]: dir === "column",
        })}
      >
        <div className={`${styles.boardItem} ${styles.number}`}>
          <Text>{prefix}</Text>
          &nbsp;
          {isLoading ? (
            loaderComp
          ) : (
            <Text variant="subheading" weight="bold" color="valueChartColor">
              {value || "0"}
            </Text>
          )}
          <Text variant="subheading" weight="bold" color="valueChartColor">
            {suffix}
          </Text>
        </div>
        <div className={styles.boardItem}>
          <Text>{description || ""}</Text>
        </div>
      </div>
    </div>
  );
};

export default Board;
