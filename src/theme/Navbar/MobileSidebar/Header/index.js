/* eslint-disable import/no-unresolved */
import React from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import IconClose from '@theme/Icon/Close';
import clsx from 'clsx';

import CustomNavButtonsPlaceholder from './CustomNavButtonsPlaceholder';

import customStyles from './customStyles.module.css';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();
  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={() => mobileSidebar.toggle()}
    >
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}
export default function NavbarMobileSidebarHeader() {
  return (
    <div
      className={clsx([
        'content',
        'navbar-sidebar__brand',
        customStyles.mobileSeparatorLine,
      ])}
    >
      <CustomNavButtonsPlaceholder>
        <div className={customStyles.closeButtonPlaceholder}>
          <CloseButton />
        </div>
      </CustomNavButtonsPlaceholder>
    </div>
  );
}
