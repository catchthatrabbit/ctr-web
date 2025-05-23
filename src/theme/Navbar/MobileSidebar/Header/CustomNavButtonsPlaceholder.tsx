import React, { FC } from 'react';

import styles from './customStyles.module.css';

const CustomNavButtonsPlaceholder: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.mobileSidebarButtonsPlaceholder}>{children}</div>
  );
};

export default CustomNavButtonsPlaceholder;
