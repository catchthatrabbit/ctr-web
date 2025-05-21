/* eslint-disable import/no-unresolved */
import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import clsx from 'clsx';
import { useNav } from '@site/src/hooks/useNav';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import customStyles from './customStyles.module.css';
import './custom.css';

function useNavbarItems() {
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }) {
  const { activatePageName } = useNav(items);

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
              { cause: error }
            )
          }
        >
          <NavbarItem
            className={clsx(
              'menuLink',
              {
                'active': item.href === activatePageName,
              }
            )}
            {...item}
          />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({ left, right }) {
  const { desktop } = useMediaQueries();
  return (
    <div className={clsx('navbar__inner', {})}>
      <div className={customStyles.grow} />
      {!desktop && <div className="navbar__items">{left}</div>}
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');
  const { mobile } = useMediaQueries();

  return (
    <div className={clsx('container content', customStyles.navBarContainer)}>
      <div
        className={clsx(customStyles.flex, customStyles.fullWidth, {
          [customStyles.flexCenter]: mobile,
        })}
      >
        <div className={customStyles.navBarContainerLogo}>
          <NavbarLogo />
        </div>
        <NavbarContentLayout
          left={
            <>
              {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
              {!mobileSidebar.disabled && <NavbarItems items={leftItems} />}
            </>
          }
          right={
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
