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
import useIsBrowser from "@docusaurus/useIsBrowser";
function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}
function NavbarItems({items}) {
  const isBrowser = useIsBrowser();
  const [activatePageName, setActivatePageName] = useState(null);

  useEffect(() => {
    if(isBrowser)
    {
      const currentPathname = window.location.pathname;
      const foundActivePageName = items?.find(item => item.href === currentPathname)?.href;

      if(foundActivePageName)
        setActivatePageName(foundActivePageName)
    }
  }, [isBrowser])

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
          <NavbarItem className={clsx([{[customStyles.activeNavItemLink]:item.href === activatePageName}, 
            {[customStyles.navBarContainerMiningItem]:items?.length === i + 1}])} {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarContentLayout({left, right}) {
  return (
    <div className="navbar__inner">
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
    <div className={clsx('container', customStyles.navBarContainer)}>
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
  );
}
