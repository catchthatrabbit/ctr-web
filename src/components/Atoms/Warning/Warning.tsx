import React from "react";
import clsx from "clsx";
import { HTMLAttributes } from "react";

import styles from "./styles.module.css";

interface IWarningProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  context?: "config";
}

const Warning = ({ text, context }: IWarningProps) => {
  return (
    <div
      className={clsx(styles.warning, {
        [styles.configWarning]: context === "config",
      })}
    >
      <p
        className={styles.warningText}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

export default Warning;
