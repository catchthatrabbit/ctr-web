import clsx from "clsx";
import { FC, HtmlHTMLAttributes } from "react";
// eslint-disable-next-line import/no-unresolved
import Translate from "@docusaurus/Translate";

import { Spacer } from "../Spacer";

import styles from "./styles.module.css";

interface IText extends HtmlHTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "s" | "m" | "lg" | "xl" | "2xl" | "3xl";
  variant?:
    | "paragraph"
    | "smallTitle"
    | "title"
    | "description"
    | "titleWithIndicator";
  position?: "right" | "center" | "left";
  children: string;
}

const SizeToCssClassName = {
  "3xl": "threeXLarge",
  "2xl": "twoXLarge",
  xl: "xLarge",
  lg: "large",
  m: "medium",
  s: "small",
  xs: "xSmall",
};

const positionToCssClassName = (pos: string) => (pos ? `${pos}Text` : "");

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
  variant = "smallTitle",
  size = "m",
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
        variant === "title" || variant === "titleWithIndicator"
          ? styles.boldText
          : styles.regularText,
        styles[positionToCssClassName(position)],
        styles.text,
        className,
      ])}
      {...restProps}
    >
      <Translate>{children}</Translate>
    </div>
  );

  return variant === "titleWithIndicator" ? (
    <TitleWithIndicator>{renderTitle}</TitleWithIndicator>
  ) : (
    renderTitle
  );
};

export default Text;
