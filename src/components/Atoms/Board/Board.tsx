import React from "react";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
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
  context?: "mapChart" | "statsChart" | "payments";
  boardClassNameColumn?: string;
}

const Board: React.FC<IBoard> = ({
  value,
  description = "",
  prefix = "",
  suffix = "",
  className = "",
  loaderComp = <Text variant="subheading">———</Text>,
  isLoading = false,
  dir = "vert",
  context,
}) => {
  const { mobile } = useMediaQueries();

  const getTextProps = (type: "value" | "suffix" | "description") => {
    switch (type) {
      case "value":
        return {
          children: value,
          variant: "heading" as const,
          weight: "bold" as const,
          color: "white" as const,
          type: "zephirum" as const,
        };
      case "suffix":
        return {
          children: suffix,
          variant: "subheading" as const,
          weight: "normal" as const,
          color: "white" as const,
        };
      case "description":
        return {
          children: description,
          variant: "subheading" as const,
          weight: "normal" as const,
          color: "white" as const,
          disableMobileStyles: true,
        };
    }
  };

  return (
    <div
      className={clsx(styles.boardContainer, className, {
        [styles.boardContainerPayments]: context === "payments",
      })}
    >
      <div
        className={clsx(styles.content, {
          [styles.boardClassNameHor]: dir === "hor",
          [styles.boardClassNameColumn]: dir === "column",
          [styles.boardClassNameColumnMobile]: dir === "column" && mobile,
          [styles.boardTotal]: context === "payments",
        })}
      >
        <div className={clsx(styles.boardItem, styles.number)}>
          <Text type="regular">{prefix}</Text>
          {isLoading ? (
            loaderComp
          ) : (
            <Text
              {...getTextProps("value")}
              lineHeight="normalLineHeight"
              letterSpacing="letterSpacing"
              disableMobileStyles={true}
              variant="body"
              weight="medium"
              color="valueChartColor"
              type="regular"
            >
              {value || "×"}
            </Text>
          )}
          <Text
            {...getTextProps("suffix")}
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
            color="valueChartColor"
            type="regular"
          >
            {suffix}
          </Text>
        </div>
        <div className={styles.boardTitle}>
          <Text
            {...getTextProps("description")}
            lineHeight="normalLineHeight"
            letterSpacing="letterSpacing"
            disableMobileStyles
          >
            {description}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default Board;
