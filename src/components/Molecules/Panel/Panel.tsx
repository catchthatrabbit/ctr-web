import React, { useState } from "react";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IPanel {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  variant?:
    | "body"
    | "heading1"
    | "heading2"
    | "heading3"
    | "subheading"
    | "smallBody"
    | "tinyBody"
    | "tag"
    | "CTA";
  color?: "primary" | "white" | "gray";
  titleClassName?: string;
  className?: string;
  weight?: "normal" | "bold" | "extraBold" | "semiBold";
  handleFilterChange?: (status: string) => void;
  context?: "default" | "startMining";
}

const Panel = ({
  id,
  title = "",
  variant = "heading3",
  children,
  titleClassName,
  className,
  color = "white",
  weight = "bold",
  handleFilterChange,
  context = "default",
}: IPanel) => {
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (status: string) => {
    setActiveButton(status);
    handleFilterChange?.(status);
  };

  return (
    <div
      id={id}
      className={clsx(
        styles.panelRoot,
        className,
        context === "startMining" && styles.startMiningPanel,
      )}
    >
      {title && (
        <div className={clsx(styles.panelTitleBase, styles.panelTitle)}>
          <Text
            color={color}
            variant={variant}
            className={titleClassName}
            weight={weight}
          >
            {title}
          </Text>
          {handleFilterChange && (
            <div className={styles.panelTitleBtns}>
              <button
                className={clsx({
                  [styles.activeButton]: activeButton === "All",
                })}
                onClick={() => handleButtonClick("All")}
              >
                All
              </button>
              <button
                className={clsx({
                  [styles.activeButton]: activeButton === "Running",
                })}
                onClick={() => handleButtonClick("Running")}
              >
                Running
              </button>
              <button
                className={clsx({
                  [styles.activeButton]: activeButton === "Inactive",
                })}
                onClick={() => handleButtonClick("Inactive")}
              >
                Inactive
              </button>
            </div>
          )}
        </div>
      )}

      {children}
    </div>
  );
};

export default Panel;
