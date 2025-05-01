import React from 'react';
import styles from './styles.module.css';

const CustomCloseButton: React.FC<{ closeToast: () => void }> = ({
  closeToast,
}) => (
  <button
    onClick={closeToast}
    className={styles.closeButton}
    aria-label="Close notification"
  >
    ✖
  </button>
);

export default CustomCloseButton;
