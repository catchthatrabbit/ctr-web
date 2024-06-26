import React from "react";
import { Arrow } from "@site/src/icons";

import styles from "./styles.module.css";

interface IMouseContainer {
  children: React.ReactNode;
}

const Mouse = ({ children }: IMouseContainer) => {
  return (
    <div className={styles.mouseContainer}>
      {children}
      <i className={styles.arrow}>
        <Arrow />
      </i>
    </div>
  );
};

export default Mouse;
