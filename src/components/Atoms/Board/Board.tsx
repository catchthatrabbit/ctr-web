import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import React from "react";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

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
  context?: "mapChart" | "statsChart" | "payments";
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
  context,
  loaderComp = <Text variant="subheading">&nbsp;--&nbsp;</Text>,
  isLoading = false,
}: IBoard) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();
  return (
    <div className={clsx([styles.boardContainer, className])}>
      <div
        className={clsx(styles.content, {
          [styles.boardClassNameHor]: dir === "hor",
          [styles.boardClassNameColumn]: dir === "column",
          [styles.boardTotal]: context === "payments",
        })}
      >
        <div className={`${styles.boardItem} ${styles.number}`}>
          <Text>{prefix}</Text>
          &nbsp;
          {isLoading ? (
            loaderComp
          ) : (
            <Text
              variant={
                context === "mapChart" && mobile
                  ? "tinyBody"
                  : context === "statsChart" || context === "payments"
                    ? "heading2-mobile"
                    : "subheading"
              }
              weight={context === "payments" ? "extraBold" : "bold"}
              color={
                context === "payments"
                  ? "white"
                  : context === "statsChart"
                    ? "primaryColor"
                    : "valueChartColor"
              }
            >
              {value || "0"}
            </Text>
          )}
          <Text
            variant={
              context === "mapChart" && mobile
                ? "tinyBody"
                : context === "statsChart"
                  ? "heading2-mobile"
                  : "subheading"
            }
            weight="bold"
            color={
              context === "statsChart" ? "primaryColor" : "valueChartColor"
            }
          >
            {suffix}
          </Text>
        </div>
        <div className={styles.boardItem}>
          <Text
            variant={
              context === "mapChart" && mobile
                ? "tinyBody"
                : context === "statsChart"
                  ? "subheading-desktop"
                  : "subheading"
            }
          >
            {description || ""}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Board;
