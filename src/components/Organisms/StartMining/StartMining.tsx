import React from "react";
import StartMiningTitle from "@site/src/components/Molecules/PictureTitles/StartMiningTitle";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "../../Atoms/Spacer";
import { Button } from "../../Atoms/Button";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

const StartMining = () => {
  return (
    <div className={styles.startMining}>
      <div className={styles.startMiningContent}>
        <StartMiningTitle />

        <Spacer variant="lg" />
        <Link to={"/start-mining"} className="link-button">
          Start mining
        </Link>
        <Spacer variant="md" />
        <Spacer variant="sm" />
      </div>
    </div>
  );
};

export default StartMining;
