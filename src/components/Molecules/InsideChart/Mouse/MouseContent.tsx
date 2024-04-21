import React from "react";
import ScrollIndicator from "./ScrollIndicator";

import styles from "./styles.module.css";

const Mouse = () => {
  return (
    <div className={styles.mouse}>
      <ScrollIndicator />
    </div>
  );
};

export default Mouse;
