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
}

const Button = ({
  onClick,
  icon,
  value,
  full = false,
  size = "large",
  className,
  ...restProps
}: IButtonProps) => {
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
      {...restProps}
    >
      {icon && <div className={styles.buttonIcon}>{icon}</div>}
      <Text variant={size === "large" ? "body" : "smallBody"} color="primary">
        {value}
      </Text>
    </button>
  );

  return renderedButton;
};

export default Button;
