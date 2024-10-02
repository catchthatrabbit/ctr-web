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
  dir?: "vert" | "hor";
  applyFullWidthBorder?: boolean;
}

const InfoBox = ({
  items,
  isLoading,
  loadingComponent,
  dir = "hor",
  className,
  boardClassNameHor,
  boardClassNameVert,
  applyFullWidthBorder = false,
}: IInfoBox) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();

  return isLoading ? (
    loadingComponent
  ) : (
    <div
      className={clsx([
        "flex",
        {
          [styles.flexDirectionColumn]: dir === "vert" && (desktop || laptop),
          [styles.justifySpaceBetween]: desktop || laptop,
          [styles.justifyCenter]: tablet || mobile,
          [styles.fullWidthBorder]: applyFullWidthBorder && (desktop || laptop),
        },
        className,
      ])}
    >
      {items?.map((info, index) => (
        <Board
          className={clsx("text-center", {
            [boardClassNameVert]: dir === "vert",
            [boardClassNameHor]: dir === "hor",
          })}
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
