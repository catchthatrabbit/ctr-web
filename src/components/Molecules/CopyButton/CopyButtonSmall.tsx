import { Copy } from "@site/src/icons";
import { toast } from "react-toastify";
import { ICopyButton } from "./types";

import styles from "./styles.module.css";

const CopyButtonSmall = ({ textToCopy, onCopy }: ICopyButton) => {
  const notify = () => toast.success("Address copied");
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
