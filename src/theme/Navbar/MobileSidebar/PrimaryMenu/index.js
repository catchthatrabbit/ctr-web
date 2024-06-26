import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import { useNav } from "@site/src/hooks/useNav";
import clsx from "clsx";

import customStyles from "./customStyles.module.css";

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  // TODO how can the order be defined for mobile?
  // Should we allow providing a different list of items?
  const items = useNavbarItems();
  const { activatePageName } = useNav(items);

  return (
    <ul className={clsx("menu__list", customStyles.menuList)}>
      {items.map((item, i) => (
        <NavbarItem
          key={i}
          className={clsx([
            customStyles.navbarItem,
            { [customStyles.startMiningLink]: item.href === "/start-mining" },
            {
              [customStyles.activeNavItemLink]: item.href === activatePageName,
            },
            {
              [customStyles.activeNavStartMiningItemLink]:
                "/start-mining" === activatePageName,
            },
          ])}
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
        />
      ))}
    </ul>
  );
}
