import React, { forwardRef, InputHTMLAttributes } from "react";
import { Text } from "../../Atoms/Text";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import clsx from "clsx";

import styles from "./styles.module.css";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  context?: "wallet" | "main" | "startMining" | "payments" | "dark";
  onPressEnter?: () => void;
  icon?: React.ReactNode;
  text?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      context = "main",
      onPressEnter,
      icon,
      className,
      placeholder,
      text,
      ...restProps
    },
    ref,
  ) => {
    const handleSearchOnPressEnter = (e: { key: string }) => {
      if (e.key === "Enter" && typeof onPressEnter === "function") {
        onPressEnter();
      }
    };
    const { mobile } = useMediaQueries();
    return (
      <div className={`row ${styles.inputContainer}`}>
        {icon && (
          <span
            className={clsx(styles.icon, {
              [styles.smallIcon]: context === "payments",
              [styles.mobileIcon]: mobile,
              [styles.mobileIconWallet]: mobile && context === "wallet",
            })}
          >
            {icon}
          </span>
        )}
        {text && (
          <Text lineHeight="smallLineHeight" color="subheadingColor">
            {text}
          </Text>
        )}
        {mobile ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...restProps}
            onKeyDown={handleSearchOnPressEnter}
            className={clsx(styles.inputText, className, {
              [styles.searchWallet]: context === "wallet",
              [styles.searchDark]: context === "dark",
              [styles.mobileInputText]: mobile,
            })}
            placeholder={placeholder}
            rows={1}
            style={{
              resize: "none",
              overflow: "hidden",
              direction: "ltr",
              textAlign: "left",
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = "auto";
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...restProps}
            onKeyDown={handleSearchOnPressEnter}
            className={clsx(styles.inputText, className, {
              [styles.searchWallet]: context === "wallet",
              [styles.searchDark]: context === "dark",
              [styles.mobileInputText]: mobile,
            })}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
