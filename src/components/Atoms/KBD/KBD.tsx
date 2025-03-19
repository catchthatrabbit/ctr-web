import React from 'react';
import styles from "./styles.module.css";

interface IKBD {
  children?: string;
}

const Kbd = ({ children }: IKBD) => {
  return <kbd className={styles.kbd}>{children}</kbd>;
};

export default Kbd;
