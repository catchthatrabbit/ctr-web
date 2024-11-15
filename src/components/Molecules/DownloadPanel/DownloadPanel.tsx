import React from "react";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { DownloadAppStore } from "@site/src/icons";
import googlePlayImage from "@site/static/img/GooglePlay.png";
import { QR } from "@site/src/icons";

import styles from "./styles.module.css";

const DownloadPanel: React.FC = () => {
  return (
    <div className={styles.downloadPanel}>
      <div className={styles.content}>
        <Spacer variant="xxs" />
        <Text size="large" weight="semiBold" color="white">
          Download now for free!
        </Text>
        <Spacer variant="xs" />
        <Text variant="heading3" color="white" weight="bold">
          Available worldwide.
        </Text>
        <Spacer variant="md" />
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
              className={styles.googlePlayImage}
            />
          </a>
        </div>
        <Spacer variant="md" />
        <div className={styles.qrCode}>
          <QR />
        </div>
        <Spacer variant="xl" />
      </div>
      <div className={styles.image}>
        <img src="/img/downloadDoubleCell.svg" alt="App Preview" />
      </div>
    </div>
  );
};

export default DownloadPanel;
