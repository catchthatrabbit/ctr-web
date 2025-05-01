import React from 'react';
import StartMiningTitle from '@site/src/components/Molecules/PictureTitles/StartMiningTitle';
import { Spacer } from '../../Atoms/Spacer';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

const StartMining = () => {
  return (
    <div className={styles.startMining}>
      <div className={styles.startMiningContent}>
        <StartMiningTitle />

        <Spacer variant="md" />
        <div className={styles.buttonContainer}>
          <Link to={"/start-mining"} className="link-button">
            Start mining
          </Link>
          <Link to={"/go-live"} className="link-button">
            Launch Miner
          </Link>
        </div>
        <Spacer variant="xxl" />
      </div>
    </div>
  );
};

export default StartMining;
