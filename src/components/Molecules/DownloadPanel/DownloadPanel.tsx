import React from "react";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { DownloadAppStore, QR } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import clsx from "clsx";

import styles from "./styles.module.css";

const googlePlayImage = "/img/GooglePlay.png";

const DownloadPanel: React.FC = () => {
  const { mobile, desktop } = useMediaQueries();

  const renderDownloadButtons = () => (
    <div className={styles.btns}>
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
          className={clsx(styles.googlePlayImage, {
            [styles.googlePlayImageMobile]: mobile,
          })}
        />
      </a>
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
        <Text
          size={desktop ? "large" : "mediumSize"}
          weight="semiBold"
          color="white"
          disableMobileStyles
        >
          Download now for free!
        </Text>
        {desktop ? <Spacer variant="xs" /> : <Spacer variant="xxs" />}
        <Text variant="heading3" color="white" weight="bold">
          Available worldwide.
        </Text>
        <Spacer variant="md" />
        {renderDownloadButtons()}
        <Spacer variant="md" />
        {renderQRCodeOrSpacer()}
        {desktop ? <Spacer variant="md" /> : <Spacer variant="xl" />}
      </div>
      <div
        className={clsx(styles.image, {
          [styles.imageMobile]: mobile,
        })}
      >
        <img src="/img/downloadDoubleCell.svg" alt="App Preview" />
      </div>
    </div>
  );
};

export default DownloadPanel;
