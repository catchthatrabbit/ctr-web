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
    <div
      className={clsx([
        styles.boardContainer,
        className,
        { [styles.boardContainerPayments]: context === "payments" },
      ])}
    >
      <div
        className={clsx(styles.content, {
          [styles.boardClassNameHor]: dir === "hor",
          [styles.boardClassNameColumn]: dir === "column",
          [styles.boardClassNameColumnMobile]: dir === "column" && mobile,
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
                    ? "headingMobile"
                    : "subheading"
              }
              weight={context === "payments" ? "extraBold" : "bold"}
              color={
                context === "payments"
                  ? "white"
                  : context === "statsChart"
                    ? "primary"
                    : "valueChartColor"
              }
              lineHeight="normalLineHeight"
              letterSpacing="letterSpacing"
              disableMobileStyles
            >
              {value || "0"}
            </Text>
          )}
          <Text
            variant={
              context === "mapChart" && mobile
                ? "tinyBody"
                : context === "statsChart"
                  ? "headingMobile"
                  : "subheading"
            }
            weight="bold"
            color={
              context === "statsChart" ? "primary" : "valueChartColor"
            }
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
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
                  ? "subheading1"
                  : "subheading"
            }
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
            disableMobileStyles
          >
            {description || ""}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Board;
