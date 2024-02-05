import clsx from "clsx";
import { FC, HtmlHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface ISpacer extends HtmlHTMLAttributes<HTMLDivElement> {
  direction?: "vertical" | "horizontal";
  variant?: "small" | "medium" | "large" | "xLarge" | "xxLarge";
}

const directionAndVariantToClassName = {
  vertical: {
    small: "spacerVertSmall",
    medium: "spacerVertMedium",
    large: "spacerVertLarge",
    xLarge: "spacerVertXLarge",
    xxLarge: "spacerVertXXLarge"
  },
  horizontal: {
    small: "spacerHorSmall",
    medium: "spacerHorMedium",
    large: "spacerHorLarge",
    xLarge: "spacerHorXLarge",
    xxLarge: "spacerHorXXLarge"
  },
};

const Spacer: FC<ISpacer> = ({
  direction = "vertical",
  variant = "medium",
  className,
  ...restProps
}) => {
  return (
    <div
      {...restProps}
      className={clsx([
        styles.spacer,
        styles[directionAndVariantToClassName[direction][variant]],
        className,
      ])}
    />
  );
};

export default Spacer;
