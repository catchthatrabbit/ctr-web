import React from "react";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import { ICopyButton } from "./types";
import { showSuccessToast } from "@site/src/utils/toastUtils";

import styles from "./styles.module.css";

const CopyButton: React.FC<ICopyButton> = ({
  textToCopy,
  onCopy,
  value,
  toastText = "Copied to clipboard!",
  customStyles = {},
  icon = <Copy />,
  context,
}) => {
  const mergedStyles = { ...styles, ...customStyles };

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    showSuccessToast(toastText);
  };

  return (
    <Button
      onClick={handleCopy}
      value={value}
      icon={icon}
      textColor="var(--ifm-color-primary)"
      style={mergedStyles}
      context={context}
      aria-label="Copy to clipboard"
    />
  );
};

export default CopyButton;
