/* eslint-disable import/no-unresolved */
import React from "react";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import IconMenu from "@theme/Icon/Menu";
import clsx from "clsx";

import customStyles from "./customStyles.module.css";
export default function MobileSidebarToggle() {
  const { toggle, shown } = useNavbarMobileSidebar();
  return (
    <button
      onClick={toggle}
      aria-label={translate({
        id: "theme.docs.sidebar.toggleSidebarButtonAriaLabel",
        message: "Toggle navigation bar",
        description:
          "The ARIA label for hamburger menu button of mobile navigation",
      })}
      aria-expanded={shown}
      className={clsx(
        "navbar__toggle clean-btn",
        customStyles.buttonColor,
        customStyles.buttonAlignment,
      )}
      type="button"
    >
      <IconMenu className={customStyles.iconMenuCustom} />
    </button>
  );
}
