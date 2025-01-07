import React from "react";
import ReactDOM from "react-dom";
import { Text } from "../Text";
import styles from "./styles.module.css";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <Text variant="heading3" weight="semiBold" color="white">
            Mining pool
          </Text>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
