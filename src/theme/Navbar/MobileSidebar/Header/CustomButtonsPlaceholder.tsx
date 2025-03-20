import React, { FC } from "react";

import styles from "./customStyles.module.css";

const CustomButtonsPlaceholder: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className={styles.mobileSidebarButtonPadding}>{children}</div>;
};

export default CustomButtonsPlaceholder;
