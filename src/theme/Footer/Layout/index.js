import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import customStyles from "./customStyles.module.css";

export default function FooterLayout({ style, links, logo, copyright }) {
  const { siteConfig } = useDocusaurusContext();
  const estd = siteConfig.customFields.ESTD;

  return (
    <footer
      className={clsx("footer", customStyles.footer, {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container container-fluid">
        <div className={customStyles.footerLayout}>
          <div className="content">
            <div className="flex md-center-items sm-center-items xs-center-items md-center-text sm-center-text xs-center-text">
              <div
                className={clsx([
                  "xl-flex-col--6 lg-flex-col--6 md-flex-col--12 sm-flex-col--12 xs-flex-col--12",
                ])}
              >
                {logo} ESTD {estd}
                <div className={customStyles.customLogoText}>
                  <Text>Dedicated Pool for Core Coin and IoT devices.</Text>
                </div>
              </div>
              <Spacer className="xl-hide lg-hide" />
              <div className="xl-flex-col--6 lg-flex-col--6 md-flex-col--12 sm-flex-col--12 xs-flex-col--12">
                {links}
              </div>
            </div>
          </div>
        </div>
      </div>
      {copyright && (
        <div
          className={clsx([
            "footer__bottom text--center",
            customStyles.footerCopyWrite,
          ])}
        >
          {copyright}
        </div>
      )}
    </footer>
  );
}
