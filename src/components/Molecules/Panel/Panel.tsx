import React, { useState } from "react";
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
  color?: "primary" | "white" | "subheadingColor";
  titleClassName?: string;
  className?: string;
  weight?: "normal" | "bold" | "extraBold" | "semiBold";
  handleFilterChange?: (status: "All" | "Running" | "Inactive") => void;
  context?: "default" | "startMining";
}

const Panel: React.FC<IPanel> = ({
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
}) => {
  const [activeButton, setActiveButton] = useState<
    "All" | "Running" | "Inactive"
  >("All");

  const handleButtonClick = (status: "All" | "Running" | "Inactive") => {
    setActiveButton(status);
    handleFilterChange?.(status);
  };

  const renderFilterButtons = () => (
    <div className={styles.panelTitleBtns}>
      {["All", "Running", "Inactive"].map((status) => (
        <button
          key={status}
          className={clsx({ [styles.activeButton]: activeButton === status })}
          onClick={() =>
            handleButtonClick(status as "All" | "Running" | "Inactive")
          }
        >
          {status}
        </button>
      ))}
    </div>
  );

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
          {handleFilterChange && renderFilterButtons()}
        </div>
      )}
      {children}
    </div>
  );
};

export default Panel;
