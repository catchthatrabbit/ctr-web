import { toast } from "react-toastify";
import CustomCloseButton from "../components/Molecules/CopyButton/CustomCloseButton";

export const showSuccessToast = (message: string, options = {}) => {
  toast.success(message, {
    className: "customToast",
    closeButton: CustomCloseButton,
    theme: "dark",
    style: { background: "#363636" },
    ...options,
  });
};

export const showErrorToast = (message: string, options = {}) => {
  toast.error(message, {
    className: "customToast",
    closeButton: CustomCloseButton,
    theme: "dark",
    style: { background: "#363636" },
    ...options,
  });
};
