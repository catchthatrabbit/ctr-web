import { InputHTMLAttributes, forwardRef } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IInputText extends InputHTMLAttributes<HTMLInputElement> {
  onPressEnter?: () => void;
}

const InputText = forwardRef<HTMLInputElement, IInputText>(
  ({ className, placeholder, onPressEnter, ...restProps }, ref) => {
    const handleSearchOnPressEnter = (e: { key: string }) => {
      if (e.key === "Enter" && typeof onPressEnter === "function") {
        onPressEnter();
      }
    };

    return (
      <input
        ref={ref}
        {...restProps}
        onKeyDown={handleSearchOnPressEnter}
        className={clsx(styles.inputText, className)}
        placeholder={placeholder}
      />
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
