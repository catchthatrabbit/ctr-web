import React from "react";
import { toast } from "react-toastify";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
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

const CopyPermalinkButton = ({ textToCopy, onCopy }: ICopyButton) => {
  const notify = () => {
    toast.success("Permalink copied to clipboard", {
      className: styles.customToast,
      bodyClassName: styles.customToastBody,
      progressClassName: styles.customToastProgress,
      closeButton: CustomCloseButton,
      theme: "dark",
    });
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    notify();
  };

  return <Button onClick={handleCopy} value="Copy permalink" icon={<Copy />} />;
};

export default CopyPermalinkButton;
