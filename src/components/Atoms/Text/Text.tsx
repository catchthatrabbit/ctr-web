import { FC, HtmlHTMLAttributes, createElement, ReactNode } from "react";
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
  type?: "label" | "value" | "regular";
  variant?:
    | "heading1" /** font size 38 */
    | "heading2" /** font size 22 */
    | "heading3" /** font size 20 */
    | "subheading" /** font size 18 */
    | "body" /** font size 16 */
    | "smallBody" /** font size 14 */
    | "tinyBody" /** font size 12 */
    | "tag" /** font size 11 */
    | "CTA" /** font size 11 */;
  weight?: "normal" | "bold";
  size?: "small";
  color?: "primary" | "InsideChartColor" | "gray" | "valueChartColor";
  componentType?: keyof JSX.IntrinsicElements;
  decorating?: "simple" | "underlined" | "link";
  children: string;
}

const CustomComponent: FC<
  Omit<IText, "children"> & { children?: ReactNode }
> = ({ variant, children, className, componentType, ...restProps }) => {
  return variant === "heading1" ||
    variant === "heading2" ||
    variant === "heading3"
    ? createElement(
        (variant === "heading1" && "h1") ||
          ("heading2" && "h2") ||
          ("heading3" && "h3"),
        { className, ...restProps },
        children,
      )
    : createElement(componentType, { className, ...restProps }, children);
};

const Text: FC<IText> = ({
  variant = "subheading",
  weight = "normal",
  size = "small",
  children,
  className,
  type = "regular",
  componentType = "span",
  color = "InsideChartColor",
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
        variant === "subheading"
          ? tablet
            ? styles[`${variant}-tablet`]
            : mobile
              ? styles[`${variant}-mobile`]
              : styles[variant]
          : styles[variant],
        !mobile && !tablet && styles[variant],
        styles[weight],
        styles[size],
        styles[type],
        styles[color],

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
