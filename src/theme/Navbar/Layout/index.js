import React, { useEffect } from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import { InfoBoxLoadingSkeleton } from "@site/src/components/Atoms/InfoBoxLoadingSkeleton";
import { InfoBox } from "@site/src/components/Molecules/InsideChart/Info";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import useControls from "@site/src/components/Pages/Dashboard/controls";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

function NavbarBackdrop(props) {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx("navbar-sidebar__backdrop", props.className)}
    />
  );
}

const ConfiguredInfoBox = ({ horClassName, isLoading, infoItems }) => (
  <>
    <InfoBox
      boardClassNameHor={horClassName}
      dir="hor"
      isLoading={isLoading}
      items={infoItems}
      loadingComponent={
        <InfoBoxLoadingSkeleton
          boardClassNameHor={horClassName}
          loadingPlaceholder={<LoadingPlaceholder />}
        />
      }
      applyFullWidthBorder={true}
    />
  </>
);

const horClassName =
  "xl-flex-col--2 lg-flex-col--2 md-flex-col--6 sm-flex-col--12 xs-flex-col--12";

export default function NavbarLayout({ children }) {
  const { mobile, tablet, desktop } = useMediaQueries();

  const {
    infoBoxMapData,
    asStarMiningPoolLocation,
    euStarMiningPoolLocation,
    usStarMiningPoolLocation,
    poolFee,
    infoBoxRadialData,
    radialChartData,
    recentMatureBlockListColumns,
    AllRegionsMaturedBlocks,
    isLoadingMapChart,
    isLoadingRadialBarChart,
    isLoadingAllRegionMaturedBlocks,
    SLoganSecondary,
    sLoganPrimary,
    effectsShowActionIcons,
    effectsShowLocation,
  } = useControls();

  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();
  const mobileSidebar = useNavbarMobileSidebar();
  const { navbarRef, isNavbarVisible } = useHideableNavbar(hideOnScroll);

  return (
    <>
      <nav
        ref={navbarRef}
        aria-label={translate({
          id: "theme.NavBar.navAriaLabel",
          message: "Main",
          description: "The ARIA label for the main navigation",
        })}
        className={clsx(
          "navbar",
          "navbar--fixed-top",
          "flex-column",
          hideOnScroll && [
            styles.navbarHideable,
            !isNavbarVisible && styles.navbarHidden,
          ],
          {
            "navbar--dark": style === "dark",
            "navbar--primary": style === "primary",
            "navbar-sidebar--show": mobileSidebar.shown,
          },
        )}
      >
        {children}
        <NavbarBackdrop onClick={mobileSidebar.toggle} />
        <NavbarMobileSidebar />
      </nav>
      {!mobile && !tablet && (
        <>
          {/* <Spacer variant="lg" /> */}
          <ConfiguredInfoBox
            horClassName={horClassName}
            isLoading={isLoadingMapChart}
            infoItems={infoBoxMapData}
          />
        </>
      )}
    </>
  );
}
