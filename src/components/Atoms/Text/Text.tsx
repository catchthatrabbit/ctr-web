import React, { FC, HtmlHTMLAttributes, createElement, ReactNode } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface IText extends HtmlHTMLAttributes<HTMLSpanElement> {
  type?: "label" | "value" | "regular" | "exo" | "zephirum";
  variant?:
    | "heading"
    | "heading1"
    | "headingMobile"
    | "heading2"
    | "heading3"
    | "subheading"
    | "subheading1"
    | "body"
    | "smallBody"
    | "tinyBody"
    | "tag"
    | "CTA";
  weight?: "normal" | "bold" | "extraBold" | "semiBold" | "medium";
  size?: "small" | "regular" | "mediumSize" | "large" | "pictureTitle";
  color?:
    | "primary"
    | "secondary"
    | "summary"
    | "InsideChartColor"
    | "dashboardColor"
    | "valueChartColor"
    | "subheadingColor"
    | "black"
    | "white";
  componentType?: string;
  decorating?: "simple" | "underlined" | "link";
  lineHeight?:
    | "normalLineHeight"
    | "smallLineHeight"
    | "largeLineHeight"
    | "mediumLineHeight";
  letterSpacing?: "letterSpacing" | "normal";
  children: string;
  disableMobileStyles?: boolean;
}

const CustomComponent: FC<
  Omit<IText, "children"> & { children?: ReactNode }
> = ({ variant, children, className, componentType, ...restProps }) => {
  let element: string = componentType as string;
  if (variant === "heading1") element = "h1";
  else if (variant === "heading2") element = "h2";
  else if (variant === "heading3") element = "h3";
  return createElement(element, { className, ...restProps }, children);
};

const Text: FC<IText> = ({
  variant = "subheading",
  weight = "normal",
  size = "regular",
  children,
  className,
  lineHeight = "smallLineHeight",
  letterSpacing,
  type = "regular",
  componentType = "span",
  color = "InsideChartColor",
  disableMobileStyles,
  ...restProps
}) => {
  const { mobile, tablet } = useMediaQueries();
  const renderTitle = (
    <CustomComponent
      variant={variant}
      componentType={componentType}
      className={clsx([
        styles.text,
        variant === "heading1" ||
        variant === "heading2" ||
        variant === "heading3" ||
        variant === "subheading" ||
        variant === "subheading1" ||
        variant === "heading"
          ? tablet
            ? styles[`${variant}-tablet`]
            : mobile && !disableMobileStyles
              ? styles[`${variant}-mobile`]
              : styles[variant]
          : styles[variant],
        !mobile && !tablet && styles[variant],
        styles[weight],
        styles[size],
        styles[type],
        styles[color],
        styles[lineHeight],
        styles[letterSpacing],
        className,
      ])}
      {...restProps}
    >
      <Translate>{children}</Translate>
    </CustomComponent>
  );

  return renderTitle;
};

export default Text;
