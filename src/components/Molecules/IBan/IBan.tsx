import React from 'react';
import { Text } from "@site/src/components/Atoms/Text";
import { generateIBan } from "@site/src/utils/generateIBan";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import { CopyButton } from "@site/src/components/Molecules/CopyButton";

import styles from "./styles.module.css";

interface IIBan {
  iBan?: string;
  pool?: string;
}

const IBan = ({ iBan = "", pool = "de" }: IIBan) => {
  const { mobile, tablet } = useMediaQueries();
  const permalink = `${pool}.ctr.watch/@${iBan}`;
  return (
    <>
      <div className={clsx([[styles.iBanRoot, styles.justifyCenter, "flex"]])}>
        <div className='"md-flex-col--12 sm-flex-col--12 xs-flex-col--12"'>
          <Text
            className={clsx(styles.iBan, {
              [styles.iBanPaddingBottom]: mobile || tablet,
            })}
            variant="heading3"
            color="white"
          >
            {generateIBan(iBan)}
          </Text>
        </div>
      </div>
      <div
        className={clsx([
          "flex md-flex-col--12 sm-flex-col--12 xs-flex-col--12",
          styles.justifyCenter,
        ])}
      >
        <CopyButton
          textToCopy={iBan}
          value="Copy wallet address"
          toastText="Wallet address copied to clipboard"
          context={mobile ? "wallet" : "config"}
        />
        <CopyButton
          textToCopy={permalink}
          value="Copy permalink"
          toastText="Permalink copied to clipboard"
          context={mobile ? "wallet" : "config"}
        />
      </div>
    </>
  );
};

export default IBan;
