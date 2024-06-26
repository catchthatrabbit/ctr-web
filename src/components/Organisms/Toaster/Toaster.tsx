import { Message } from "@site/src/components/Molecules/Message";
import { useEffect, useState } from "react";

import styles from "./styles.module.css";

interface IToaster {
  text?: string;
  type?: "warning" | "danger" | "info" | "success" | "secondary" | "primary";
  onChange?: () => void;
  show?: boolean;
}

const Toaster = ({ text, type, show }: IToaster) => {
  const [visible, setVisible] = useState<boolean>(null);

  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    setChanged(true);
  }, [show]);

  useEffect(() => {
    if (changed) {
      setVisible(show);
      setChanged(false);
    }
  }, [changed, show]);

  const handleCloseMessage = () => {
    setVisible(false);
  };

  return (
    visible && (
      <div className={styles.toaster}>
        <Message onClickCloseBtn={handleCloseMessage} text={text} type={type} />
      </div>
    )
  );
};

export default Toaster;
