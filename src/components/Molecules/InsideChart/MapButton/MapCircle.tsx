import React from 'react';
import clsx from "clsx";

import styles from "./styles.module.css";

const MapCircle = () => (
  <div className={clsx(styles.border, styles.border3)}>
    <div className={clsx(styles.border, styles.border2)}>
      <div className={clsx(styles.border, styles.border1)}>
        <div className={styles.circle} />
      </div>
    </div>
  </div>
);

export default MapCircle;
