import React from "react";
import useControls from "../../Pages/Dashboard/controls";
import { Text } from "../../Atoms/Text";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import clsx from "clsx";
import styles from "./styles.module.css";

const StartPanel = () => {
  const { poolFee } = useControls();
  const { mobile } = useMediaQueries();
  return (
    <div
      className={clsx(styles.searchDivWrapper, {
        [styles.searchDivWrapperMobile]: mobile,
      })}
    >
      <div
        className={clsx(styles.searchDiv, { [styles.searchDivMobile]: mobile })}
      >
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
        <a
          href="/start-mining"
          className={clsx(styles.searchButton, {
            [styles.searchButtonMobile]: mobile,
          })}
        >
          View guide
        </a>
      </div>
    </div>
  );
};

export default StartPanel;
