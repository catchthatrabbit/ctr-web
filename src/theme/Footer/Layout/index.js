import React from 'react';
import clsx from 'clsx';
import customStyles from "./customStyles.module.css";
import {Text} from "@site/src/components/Atoms/Text";
import {StartMining} from "@site/src/components/Organisms/StartMining";
import {Spacer} from "@site/src/components/Atoms/Spacer";

export default function FooterLayout({style, links, logo, copyright}) {
  return (
    <footer
      className={clsx('footer', "container", customStyles.footer, {
        'footer--dark': style === 'dark',
      })}>
      <StartMining />
      <Spacer variant='xxl'/>
      <div className="container container-fluid">
        <div className={customStyles.footerLayout}>
          <div className='content'>
            <div className='grid xl-grid-col--2 lg-grid-col--2 md-grid-col--2 sm-grid-row--2 xs-grid-row--2'>
              <div className={customStyles.customLogo}>
                {logo}
                <div className={customStyles.customLogoText}>
                  <Text>Dedicated Pool for Core Coin and IoT devices</Text>
                </div>
              </div>
              {links}
            </div>
          </div>
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
