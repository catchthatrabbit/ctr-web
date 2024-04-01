import React from 'react';
import clsx from 'clsx';
import customStyles from "./customStyles.module.css";
import {Text} from "@site/src/components/Atoms/Text";
import {StartMining} from "@site/src/components/Organisms/StartMining";
import {Spacer} from "@site/src/components/Atoms/Spacer";

export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <footer
      className={clsx('footer', customStyles.footer, {
        'footer--dark': style === 'dark',
      })}>
      <StartMining />
      <Spacer variant='xxl'/>
      <div className="container container-fluid">
        <div className={customStyles.footerLayout}>
          <div className={customStyles.customLogo}>
            {logo}
            <div className={customStyles.customLogoText}>
              <Text>Dedicated Pool for Core Coin and IoT devices</Text>
            </div>
          </div>
          <div className={customStyles.customLogoGrow} />
          {links}
        </div>
      </div>
      {(copyright) && (
        <div className={clsx(["footer__bottom text--center", customStyles.footerCopyWrite])}>
          {copyright}
        </div>
      )}
    </footer>
  );
}
