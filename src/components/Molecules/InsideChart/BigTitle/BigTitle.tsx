import React from 'react';

import styles from './styles.module.css';

interface IBigTitle {
  children: React.ReactNode;
}

const BigTitle = ({ children }: IBigTitle) => {
  return <div className={styles.textTitle}>{children}</div>;
};

export default BigTitle;
