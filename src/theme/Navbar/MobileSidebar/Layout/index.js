import React from 'react';
import clsx from 'clsx';
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal';
import { Spacer } from '@site/src/components/Atoms/Spacer';

import customStyles from './customStyles.module.css';

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}) {
  const { shown: secondaryMenuShown } = useNavbarSecondaryMenu();
  return (
    <div className="navbar-sidebar">
      {header}
      <Spacer variant="xxl" />

      <div
        className={clsx(
          'navbar-sidebar__items',
          customStyles.centered,
          customStyles.navbarItems,
          {
            'navbar-sidebar__items--show-secondary': secondaryMenuShown,
          }
        )}
      >
        <div
          className={`navbar-sidebar__item menu ${customStyles.navbarItem} ${customStyles.centered}`}
        >
          {primaryMenu}
        </div>
      </div>
    </div>
  );
}
