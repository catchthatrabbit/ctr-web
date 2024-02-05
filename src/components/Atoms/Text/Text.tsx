import clsx from "clsx";
import { FC, HtmlHTMLAttributes } from "react";
// eslint-disable-next-line import/no-unresolved
import Translate from "@docusaurus/Translate";

import { Spacer } from "../Spacer";

import styles from "./styles.module.css";

interface IText extends HtmlHTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  variant?:
    | "normal"
    | "primary"
    | "primaryLabels"
    | "menu"
    | "link"
    | "values";
  position?: "right" | "center" | "left";
  thickness?: "bold" | "narrow";
  children: string;
}

const SizeToCssClassName = {
  "3xl": "threeXLarge",
  "2xl": "twoXLarge",
  xl: "xLarge",
  lg: "large",
  md: "medium",
  sm: "small",
  xs: "xSmall",
};

const TitleWithIndicator: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className={styles.titleIndicator}>
      <Spacer direction="horizontal" />
      {children}
    </div>
  );
};

const Text: FC<IText> = ({
  variant = "normal",
  size = "xs",
  thickness = "narrow",
  children,
  className,
  position,
  ...restProps
}) => {
  const renderTitle = (
    <div
      className={clsx([
        styles[SizeToCssClassName[size]],
        variant && styles[variant],
        styles[thickness],
        styles[position],
        styles.text,
        className,
      ])}
      {...restProps}
    >
      <Translate>{children}</Translate>
    </div>
  );

  return renderTitle
};

export default Text;
