import React from "react";
import { toast } from "react-toastify";
import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import { ICopyButton } from "./types";

const CopyPermalinkButton = ({ textToCopy, onCopy }: ICopyButton) => {
  const notify = () => toast.success("Permalink copied");
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    notify();
  };

  return <Button onClick={handleCopy} value="Copy permalink" icon={<Copy />} />;
};

export default CopyPermalinkButton;
