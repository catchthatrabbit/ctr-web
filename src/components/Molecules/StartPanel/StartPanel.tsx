import React from "react";
import useControls from "../../Pages/Dashboard/controls";
import { Text } from "../../Atoms/Text";

import styles from "./styles.module.css";

const StartPanel = () => {
  const { poolFee } = useControls();
  return (
    <div className={styles.searchDivWrapper}>
      <div className={styles.searchDiv}>
        <div className={styles.searchDivTitle}>
          <Text
            variant="heading3"
            weight="semiBold"
            color="white"
            type="regular"
          >
            Start minig today
          </Text>

          <Text variant="body" color="subheadingColor" type="regular">
            Pay-per-last-N-shares&nbsp;
          </Text>
          <Text variant="body" color="subheadingColor" type="regular">
            (PPLNS)&nbsp;
          </Text>
          <Text variant="body" color="subheadingColor" type="regular">
            system with only&nbsp;
          </Text>
          <Text variant="body" color="secondary" type="regular">
            {poolFee ? `${poolFee}% fee` : "-"}
          </Text>
        </div>
        <a href="/start-mining" className={styles.searchButton}>
          View guide
        </a>
      </div>
    </div>
  );
};

export default StartPanel;
