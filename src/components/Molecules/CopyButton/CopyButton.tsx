import { Button } from "@site/src/components/Atoms/Button";
import { Copy } from "@site/src/icons";
import { toast } from "react-toastify";
import { ICopyButton } from "./types";

const CopyButton = ({ textToCopy, onCopy }: ICopyButton) => {
  const notify = () => toast.success("Address copied");
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    if (typeof onCopy === "function") onCopy();
    notify();
  };
  return <Button onClick={handleCopy} value="Copy" icon={<Copy />} />;
};

export default CopyButton;
