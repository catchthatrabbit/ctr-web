import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import { generateIBan } from '@site/src/utils/generateIBan';
import clsx from 'clsx';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';
import { CopyButton } from '@site/src/components/Molecules/CopyButton';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './styles.module.css';

interface CustomFields {
  DEFAULT_REGION: string;
}

interface IIBan {
  iBan?: string;
  pool?: string;
}

const IBan = ({ iBan = '', pool }: IIBan) => {
  const { mobile, tablet } = useMediaQueries();
  const { siteConfig } = useDocusaurusContext();
  const { DEFAULT_REGION } = siteConfig.customFields as unknown as CustomFields;
  const defaultPool = DEFAULT_REGION?.toString().toLowerCase() || 'de';
  const poolRegion = pool || defaultPool;
  const permalink = `https://${poolRegion}.ctr.watch/@${iBan}`;

  return (
    <>
      <div className={clsx([[styles.iBanRoot, styles.justifyCenter, 'flex']])}>
        <div className='"md-flex-col--12 sm-flex-col--12 xs-flex-col--12"'>
          <Text
            className={clsx(styles.iBan, {
              [styles.iBanPaddingBottom]: mobile || tablet,
            })}
            variant="heading3"
            color="white"
            type="zephirum"
          >
            {generateIBan(iBan)}
          </Text>
        </div>
      </div>
      <div
        className={clsx([
          'flex md-flex-col--12 sm-flex-col--12 xs-flex-col--12',
          styles.justifyCenter,
        ])}
      >
        <CopyButton
          textToCopy={iBan}
          value="Copy Core ID"
          toastText="Core ID copied to clipboard"
          context={mobile ? 'wallet' : 'config'}
          customStyles={{
            backgroundColor: 'transparent',
            border: 'none',
            width: 'auto',
          }}
        />
        <CopyButton
          textToCopy={permalink}
          value="Copy Permalink"
          toastText="Permalink copied to clipboard"
          context={mobile ? 'wallet' : 'config'}
          customStyles={{
            backgroundColor: 'transparent',
            border: 'none',
            width: 'auto',
          }}
        />
      </div>
    </>
  );
};

export default IBan;
