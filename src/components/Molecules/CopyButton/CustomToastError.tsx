import React from "react";
import { showErrorToast } from "@site/src/utils/toastUtils";

import "react-toastify/dist/ReactToastify.css";

const CustomToastError: React.FC<{ message: string }> = ({ message }) => {
  showErrorToast(message, {
    style: {
      background: "#363636",
      display: "flex",
    },
  });
  return null;
};

export default CustomToastError;
