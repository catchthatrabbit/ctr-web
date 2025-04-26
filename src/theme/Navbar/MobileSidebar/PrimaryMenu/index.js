import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";
import { useNav } from "@site/src/hooks/useNav";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

import clsx from "clsx";

import customStyles from "./customStyles.module.css";

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

// The primary menu displays the navbar items
export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { mobile } = useMediaQueries();
  const items = useNavbarItems();
  const { activatePageName } = useNav(items);

  return (
    <ul className={clsx("menu__list", customStyles.menuList)}>
      {items.map((item, i) => (
        <NavbarItem
          key={i}
          className={clsx(
            customStyles.navbarItem,
            { [customStyles.startMiningLink]: item.href === "/start-mining" },
            {
              [customStyles.activeNavItemLink]: item.href === activatePageName,
            },
            {
              [customStyles.activeNavStartMiningItemLink]:
                "/start-mining" === activatePageName,
            },
            {
              [customStyles.navbarItemMobile]: mobile,
            },
          )}
          mobile
          {...item}
          onClick={() => mobileSidebar.toggle()}
        />
      ))}
    </ul>
  );
}
