import { InputHTMLAttributes, forwardRef, ReactNode } from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IInputText extends InputHTMLAttributes<HTMLInputElement> {
  onPressEnter?: () => void;
  icon?: ReactNode;
}

const InputText = forwardRef<HTMLInputElement, IInputText>(
  (
    { className, placeholder, onPressEnter, icon, context, ...restProps },
    ref,
  ) => {
    const handleSearchOnPressEnter = (e: { key: string }) => {
      if (e.key === "Enter" && typeof onPressEnter === "function") {
        onPressEnter();
      }
    };

    return (
      <div className={styles.inputContainer}>
        {icon && (
          <span
            className={clsx(styles.icon, {
              [styles.smallIcon]: context === "payments",
            })}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          {...restProps}
          onKeyDown={handleSearchOnPressEnter}
          className={clsx(styles.inputText, className)}
          placeholder={placeholder}
        />
      </div>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
