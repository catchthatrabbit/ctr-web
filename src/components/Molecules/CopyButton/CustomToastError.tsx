import React from "react";
import { showErrorToast } from "@site/src/utils/toastUtils";
import Cansel from "@site/src/icons/Cancel";
import "react-toastify/dist/ReactToastify.css";

const getToastStyles = (mobile: boolean) => ({
  top: mobile ? "6.6rem" : undefined,
  maxWidth: mobile ? "95%" : "100%",
  margin: mobile ? "0 auto" : undefined,
  marginTop: mobile ? "0.6rem" : undefined,
  borderRadius: mobile ? "8px" : undefined,
  backgroundColor: "rgb(54, 54, 54)",
});

interface CustomToastErrorProps {
  message: string;
  mobile: boolean;
}

const CustomToastError: React.FC<CustomToastErrorProps> = ({
  message,
  mobile,
}) => {
  showErrorToast(message, mobile, {
    icon: <Cansel />,
    style: getToastStyles(mobile),
  });

  return null;
};

export default CustomToastError;
