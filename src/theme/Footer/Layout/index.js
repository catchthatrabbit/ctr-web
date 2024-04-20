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
          <div className='content'>
            <div className='flex md-center-items sm-center-items xs-center-items md-center-text sm-center-text xs-center-text'>
              <div className={clsx(["xl-flex-col--6 lg-flex-col--6 md-flex-col--12 sm-flex-col--12 xs-flex-col--12"])}>
                {logo}
                <div className={customStyles.customLogoText}>
                  <Text>Dedicated Pool for Core Coin and IoT devices</Text>
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
      {(copyright) && (
        <div className={clsx(["footer__bottom text--center", customStyles.footerCopyWrite])}>
          {copyright}
        </div>
      )}
    </footer>
  );
}
