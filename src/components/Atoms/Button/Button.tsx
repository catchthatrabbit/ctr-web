import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import { HTMLAttributes } from "react";

import styles from "./styles.module.css";

interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  href?: string;
  size?: "small" | "medium" | "large";
  full?: boolean;
  icon?: React.ReactNode;
  value: string;
  backgroundColor?: string;
  textColor?: string;
}

const Button = ({
  onClick,
  icon,
  value,
  full = false,
  size = "large",
  className,
  backgroundColor = "#062A1C", // Default background color
  textColor = "white", // Default text color
  ...restProps
}: IButtonProps) => {
  const buttonStyle = {
    backgroundColor,
    color: textColor,
  };

  const renderedButton = (
    <button
      onClick={onClick}
      className={clsx(
        styles.button,
        styles.outline,
        styles[size],
        styles.full && full,
        className,
      )}
      style={buttonStyle}
      {...restProps}
    >
      {icon && <div className={styles.buttonIcon}>{icon}</div>}
      <Text variant={size === "large" ? "body" : "smallBody"} color={textColor}>
        {value}
      </Text>
    </button>
  );

  return renderedButton;
};

export default Button;
