import clsx from "clsx";
import { FC, HtmlHTMLAttributes, createElement } from "react";

import styles from "./styles.module.css";

interface ISpacer extends HtmlHTMLAttributes<HTMLDivElement> {
  direction?: "vert" | "hor";
  variant?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "xxxxl";
}

/**
 *
 * @param variant -xs: 16px;
 *                -sm: 24px;
 *                -md: 32px;
 *                -lg: 40px;
 *                -xl: 48px;
 *                -xxl: 64px;
 *                -xxxl: 80px;
 *                -xxxxl: 160px;
 * @returns
 */
const Spacer: FC<ISpacer> = ({
  direction = "vert",
  variant = "md",
  className,
  ...restProps
}) => {
  return createElement(direction === "vert" ? "div" : "span", {
    className: clsx([
      styles[`spacer-${direction}`],
      styles[`spacer-${direction}-${variant}`],
      className,
    ]),
    ...restProps,
  });
};

export default Spacer;
