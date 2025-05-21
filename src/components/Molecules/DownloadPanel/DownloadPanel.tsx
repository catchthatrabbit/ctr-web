import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import { DownloadAppStore, QR } from '@site/src/icons';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import clsx from 'clsx';

import styles from './styles.module.css';

interface CustomFields {
  APP_STORE_URL: string;
  GOOGLE_PLAY_URL: string;
}

const googlePlayImage = '/img/GooglePlay.png';

const DownloadPanel: React.FC = () => {
  const { mobile, desktop } = useMediaQueries();
  const { siteConfig } = useDocusaurusContext();
  const { APP_STORE_URL, GOOGLE_PLAY_URL } = (siteConfig.customFields as unknown as CustomFields);

  const renderDownloadButtons = () => (
    <div className={styles.btns}>
      {APP_STORE_URL && (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener"
      >
          <DownloadAppStore />
        </a>
      )}
      {GOOGLE_PLAY_URL && (
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener"
      >
        <img
          src={googlePlayImage}
          alt="Google Play"
          className={clsx(styles.googlePlayImage, {
            [styles.googlePlayImageMobile]: mobile,
          })}
        />
      </a>
      )}
    </div>
  );

  const renderQRCodeOrSpacer = () =>
    desktop ? (
      <div className={styles.qrCode}>
        <QR />
      </div>
    ) : (
      <Spacer variant="lg" />
    );

  return (
    <div
      className={clsx(styles.downloadPanel, {
        [styles.downloadPanelMobile]: mobile,
      })}
    >
      <div className={styles.content}>
        <Spacer variant="xxs" />
        <div className={styles.textContainer}>
          <Text
            size={desktop ? 'large' : 'mediumSize'}
            weight="semiBold"
            color="white"
            disableMobileStyles
          >
            Free download
          </Text>
          {desktop ? <Spacer variant="xs" /> : <Spacer variant="xxs" />}
          <Text variant="heading3" color="white" weight="bold">
            Available globally
          </Text>
        </div>
        {(APP_STORE_URL || GOOGLE_PLAY_URL) && (
          <>
            <Spacer variant="md" />
            {renderDownloadButtons()}
            <Spacer variant="md" />
            {renderQRCodeOrSpacer()}
            {desktop ? <Spacer variant="md" /> : <Spacer variant="xl" />}
          </>
        )}
      </div>
      <div
        className={clsx(styles.image, {
          [styles.imageMobile]: mobile,
        })}
      >
        <img src="/img/app-preview.svg" alt="App Preview" />
      </div>
    </div>
  );
};

export default DownloadPanel;
