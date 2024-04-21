import React from "react";
import StartMiningTitle from "@site/src/components/Molecules/PictureTitles/StartMiningTitle";
import { Text } from "@site/src/components/Atoms/Text";
import { Spacer } from "../../Atoms/Spacer";
import { Button } from "../../Atoms/Button";
// eslint-disable-next-line import/no-unresolved
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

const StartMining = () => {
  return (
    <div className={styles.startMining}>
      <div className={styles.startMiningContent}>
        <StartMiningTitle />
        <Spacer variant="xl" />
        <Text variant="heading2">Let&#39;s jump into it</Text>
        <Spacer variant="xl" />
        <Link to={"/start-mining"}>
          <Button
            className={styles.button}
            value="Start mining"
            href="/start-mining"
          />
        </Link>
      </div>
    </div>
  );
};

export default StartMining;
