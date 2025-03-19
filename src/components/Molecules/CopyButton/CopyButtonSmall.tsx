import React from 'react';
import { Copy } from "@site/src/icons";
import { toast } from "react-toastify";
import { ICopyButton } from "./types";

import styles from "./styles.module.css";

const CustomCloseButton = ({ closeToast }) => (
  <button
    onClick={closeToast}
    style={{
      alignSelf: "center",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#fff",
      fontSize: "15px",
      padding: "0 20px",
    }}
  >
    ✖
  </button>
);

const CopyButtonSmall = ({ textToCopy, onCopy }: ICopyButton) => {
  const notify = () => {
    toast.success("Wallet address copied to clipboard", {
      className: styles.customToast,
      closeButton: CustomCloseButton,
      theme: "dark",
      style: { background: 'var(--ifm-color-primary-darkest)' },
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    notify();
  };
  return (
    <button className={styles.copyButtonSmall} onClick={handleCopy}>
      <Copy />
    </button>
  );
};

export default CopyButtonSmall;
