import React from 'react';
import useControls from '../../Pages/Dashboard/controls';
import { Text } from '../../Atoms/Text';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';

import clsx from 'clsx';
import styles from './styles.module.css';

const StartPanel = () => {
  const { poolFee } = useControls();
  const { mobile } = useMediaQueries();
  return (
    <div
      className={clsx(styles.startDivWrapper, {
        [styles.startDivWrapperMobile]: mobile,
      })}
    >
      <div
        className={clsx(styles.startDiv, { [styles.startDivMobile]: mobile })}
      >
        <div className={styles.startDivTitle}>
          <Text
            variant="heading3"
            weight="semiBold"
            color="white"
            type="regular"
          >
            Start mining today
          </Text>
          <Text variant="body" color="subheadingColor" type="regular">
            Pay-per-last-N-shares (PPLNS) system
          </Text>
          {poolFee && (
            <>
              <Text variant="body" color="subheadingColor" type="regular">
                &nbsp;with only
              </Text>
              <Text variant="body" color="secondary" type="regular">
                {` ${poolFee}% fee`}
              </Text>
            </>
          )}
        </div>
        <a
          href="/start-mining"
          className={clsx(styles.startButton, {
            [styles.startButtonMobile]: mobile,
          })}
        >
          View guide
        </a>
      </div>
    </div>
  );
};

export default StartPanel;
