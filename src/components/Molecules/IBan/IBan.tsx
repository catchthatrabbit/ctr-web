import { Text } from "@site/src/components/Atoms/Text";
import { generateIBan } from "@site/src/utils/generateIBan";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import {
  CopyButton,
  CopyPermalinkButton,
} from "@site/src/components/Molecules/CopyButton";

import styles from "./styles.module.css";

interface IIBan {
  iBan?: string;
}

const IBan = ({ iBan = "" }: IIBan) => {
  const { mobile, tablet } = useMediaQueries();
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
        <CopyButton textToCopy={iBan} />
        <CopyPermalinkButton textToCopy={iBan} />
      </div>
    </>
  );
};

export default IBan;
