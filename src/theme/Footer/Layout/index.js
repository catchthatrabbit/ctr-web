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
  const { APP_STORE_URL, GOOGLE_PLAY_URL, GOOGLE_PLAY_IMAGE } =
    siteConfig.customFields;
  return (
    <footer
      className={clsx("footer", customStyles.footer, {
        "footer--dark": style === "dark",
      })}
    >
      <div className="container content">
        <div className={customStyles.footerLayout}>
          <Spacer variant="sm" />
          <div className={clsx("col", customStyles.logoContainer)}>{logo}</div>
          <div className={clsx("col col--12", customStyles.footerLinks)}>
            {links}
            <div className={customStyles.btns}>
              <Text
                variant="smallBody"
                type="regular"
                color="white"
                className={customStyles.downloadText}
              >
                Wallet with XCB, CTN, USDX support
              </Text>
              <div className={customStyles.downloadBtns}>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DownloadAppStore />
                </a>
                <a
                  href={GOOGLE_PLAY_URL}
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
