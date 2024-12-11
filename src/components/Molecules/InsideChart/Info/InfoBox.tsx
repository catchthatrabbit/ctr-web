import React from "react";
import { Board } from "@site/src/components/Atoms/Board";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface IInfoBox {
  items: Array<{ title: string; value: TextFormatOutputType }>;
  isLoading?: boolean;
  loadingComponent?: React.ReactNode;
  className?: string;
  boardClassNameVert?: string;
  boardClassNameHor?: string;
  boardClassNameColumn?: string;
  dir?: "vert" | "hor" | "column" | "around";
  applyFullWidthBorder?: boolean;
  applyFullWidth?: boolean;
  spaceAround?: boolean;
  context?: "mapChart" | "statsChart";
}

const InfoBox = ({
  items,
  isLoading,
  loadingComponent,
  dir,
  className,
  boardClassNameHor,
  boardClassNameVert,
  boardClassNameColumn,
  applyFullWidthBorder = false,
  applyFullWidth = false,
  spaceAround = false,
  context = "mapChart",
}: IInfoBox) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();

  return isLoading ? (
    loadingComponent
  ) : (
    <div
      className={clsx([
        "flex",
        {
          [styles.flexDirectionRow]: dir === "vert" && (desktop || laptop),
          [styles.justifySpaceAround]: (spaceAround && desktop) || laptop,

          [styles.justifySpaceBetween]: desktop || laptop,
          [styles.justifyCenter]: tablet || mobile,
          [styles.fullWidthBorder]: applyFullWidthBorder && (desktop || laptop),
          [styles.fullWidth]: (applyFullWidth && desktop) || laptop,
        },
        className,
      ])}
    >
      {items?.map((info, index) => (
        <Board
          className={clsx("text-center", {
            [boardClassNameVert]: dir === "vert",
            // [boardClassNameHor]: dir === "hor",
            [boardClassNameColumn]: dir === "column",
          })}
          context={context}
          dir={dir}
          boardClassNameColumn={boardClassNameColumn}
          isLoading={isLoading}
          key={index}
          description={info?.title}
          value={info?.value.text}
          suffix={info?.value.suffix}
          prefix={info?.value.prefix}
        />
      ))}
    </div>
  );
};

export default InfoBox;
