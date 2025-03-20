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

  // Convert 'around' to a valid Board dir value
  const boardDir = dir === 'around' ? 'column' : dir;

  return isLoading ? (
    loadingComponent
  ) : (
    <div
      className={clsx([
        "flex",
        styles.infoBoxContainer,
        {
          [styles.flexDirectionRow]: dir === "vert" && (desktop || laptop),
          [styles.justifySpaceAround]: (spaceAround && desktop) || laptop,
          [styles.justifyCenter]: tablet || mobile,
          [styles.fullWidthBorder]: applyFullWidthBorder,
          [styles.fullWidth]: (applyFullWidth && desktop) || laptop,
        },
        className,
      ])}
    >
      {items?.map((info, index) => (
        <Board
          className={clsx("text-center", {
            [boardClassNameVert]: dir === "vert",
            [boardClassNameColumn]: dir === "column",
          })}
          context={context}
          dir={boardDir}
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
