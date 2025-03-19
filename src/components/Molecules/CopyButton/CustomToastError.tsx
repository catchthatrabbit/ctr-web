import React from "react";
import { toast } from "react-toastify";
import { Cancel } from "@site/src/icons";

import "react-toastify/dist/ReactToastify.css";

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

const CustomToastError = ({ message }: { message: string }) => {
  toast.error(message, {
    className: styles.customToast,
    closeButton: CustomCloseButton,
    theme: "dark",
    icon: <Cancel />,
    style: { background: 'var(--ifm-color-error)' },
  });

  return null;
};

export default CustomToastError;
