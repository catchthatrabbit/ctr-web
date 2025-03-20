import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { DownloadAppStore } from "@site/src/icons";
import googlePlayImage from "@site/static/img/google-play-badge.png";

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
      <div className="container content">
        <div className={customStyles.footerLayout}>
          <Spacer variant="sm" />
          <div className="row">
            {/* Logo */}
            <div className={clsx("col", customStyles.logoContainer)}>
              {logo}
            </div>
            {/* Download buttons */}
            <div className={clsx("col", customStyles.downloadBtns)}>
              <div className={customStyles.downloadContainer}>
                <Text variant="smallBody" type="regular" color="white" className={customStyles.downloadText}>
                  Wallet with XCB, CTN, USDX support
                </Text>
                <div className={customStyles.btns}>
                  <a
                    href="https://apps.apple.com/app/corepass-id/id1644928641"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadAppStore />
                  </a>
                  <a
                    href="https://play.google.com/store/apps/details?id=net.corepass.app"
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
          {/* Links */}
          <div className="row">
            <div className="col col--12">
              <div className={customStyles.footerLinks}>
                {links}
              </div>
            </div>
          </div>
        </div>
      </div>
      {copyright && (
        <div
          className={clsx([
            "footer__bottom text--center ",
            customStyles.footerCopyWrite,
          ])}
        >
          {copyright}
        </div>
      )}
    </footer>
  );
}
