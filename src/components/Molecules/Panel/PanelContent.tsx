import React from "react";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IPanelContent {
  children: React.ReactNode;
}

const PanelContent = ({ children }: IPanelContent) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();

  return (
    <div
      className={clsx({
        [styles.panelContentDesktop]: desktop || laptop,
        [styles.panelContentTablet]: tablet,
        [styles.panelContentMobile]: mobile,
      })}
    >
      {children}
    </div>
  );
};

export default PanelContent;
