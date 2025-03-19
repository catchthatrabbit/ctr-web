import React, { FC, HtmlHTMLAttributes, createElement, ReactNode } from "react";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";
/**
 *
 * @param variant - heading1  font size 38
 * heading2  font size 22
 * heading3  font size 20
 * subheading  font size 18
 * body  font size 16
 * smallBody  font size 14
 * tinyBody  font size 12
 * tag  font size 11
 * CTA; font size 11
 * @returns React.Node
 */
interface IText extends HtmlHTMLAttributes<HTMLSpanElement> {
  type?: "label" | "value" | "regular" | "exo" | "zephirum";
  variant?:
    | "heading" /** font size 50 */
    | "heading1" /** font size 38 */
    | "headingMobile" /** font size 32 */
    | "heading2" /** font size 22 */
    | "heading3" /** font size 20 */
    | "subheading" /** font size 18 */
    | "subheading1" /** font size 24 */
    | "body" /** font size 16 */
    | "smallBody" /** font size 14 */
    | "tinyBody" /** font size 12 */
    | "tag" /** font size 11 */
    | "CTA" /** font size 11 */;
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
  disableMobileStyles?: boolean; // disable mobile styles
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
      lineHeight={lineHeight}
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
