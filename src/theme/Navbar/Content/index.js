import React, { useEffect, useState } from 'react';
import {useThemeConfig, ErrorCauseBoundary} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import customStyles from './customStyles.module.css';
import './custom.css';
import clsx from 'clsx';
import { useNav } from '@site/src/hooks/useNav';
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({items}) {

  const {activatePageName} = useNav(items);

  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem className={clsx([{[customStyles.activeNavStartMiningItemLink]:item.href === "/start-mining"
          ,[customStyles.activeNavItemLink]:item.href === activatePageName}, 
            {[customStyles.navBarContainerMiningItem]:item.href === "/start-mining"}])} {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
      <div className={customStyles.grow} />
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}
export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <div className={clsx('container content', customStyles.navBarContainer)}>
      <div className={clsx(customStyles.flex, customStyles.fullWidth)}>
        <div className={customStyles.navBarContainerLogo}><NavbarLogo /></div>
        <NavbarContentLayout
          left={
            // TODO stop hardcoding items?
            <>
              {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
              <NavbarItems items={leftItems} />
            </>
          }
          right={
            // TODO stop hardcoding items?
            // Ask the user to add the respective navbar items => more flexible
            <>
              <NavbarItems items={rightItems} />
              {!searchBarItem && (
                <NavbarSearch>
                  <SearchBar />
                </NavbarSearch>
              )}
            </>
          }
        />
      </div>
    </div>
  );
}
