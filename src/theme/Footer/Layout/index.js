import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { DownloadAppStore } from "@site/src/icons";
import googlePlayImage from "@site/static/img/GooglePlay.png";

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
          <div className="content grid grid-col--2 grid-end">
            <div className="flex-column md-center-items sm-center-items xs-center-items md-center-text sm-center-text xs-center-text">
              <div
                className={clsx([
                  "xl-flex-col--6 lg-flex-col--6 md-flex-col--12 sm-flex-col--12 xs-flex-col--12",
                ])}
              >
                {logo}
                {/* <div className={customStyles.customLogoText}>
                  <Text>Dedicated Pool for Core Coin and IoT devices.</Text>
                </div> */}
              </div>

              <div className="xl-flex-col--6 lg-flex-col--6 md-flex-col--12 sm-flex-col--12 xs-flex-col--12">
                {links}
              </div>
            </div>
            <div className={customStyles.downloadBtns}>
              <Text variant="smallBody">Download the app</Text>
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <DownloadAppStore />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={googlePlayImage}
                  alt="Download on Google Play"
                  className={customStyles.googlePlayImage}
                />
              </a>
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
