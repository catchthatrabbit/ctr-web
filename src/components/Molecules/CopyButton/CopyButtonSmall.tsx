import React from "react";
import { Copy } from "@site/src/icons";
import { ICopyButton } from "./types";
import { showSuccessToast } from "@site/src/utils/toastUtils";

import styles from "./styles.module.css";

const CopyButtonSmall: React.FC<ICopyButton> = ({ textToCopy, onCopy }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    showSuccessToast("Wallet address copied to clipboard");
  };

  return (
    <button
      className={styles.copyButtonSmall}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
    >
      <Copy />
    </button>
  );
};

export default CopyButtonSmall;
