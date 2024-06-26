import React from "react";
import { Panel } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface ISingleColumnPanel {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  data: Array<{ label: string; value: string }>;
  description?: string;
}

const SingleColumnPanel = ({ title, data, id, description }: ISingleColumnPanel) => {
  const { desktop, laptop, mobile, tablet } = useMediaQueries();
  return (
    <Panel
      id={id || ""}
      title={title || ""}
      variant="heading2"
      color="primary"
      titleClassName={styles.singlePanel}
    >
      {description && (
        <div
          className={clsx(styles.singleColumnValue, {
            [styles.singleColumnValuePaddingDesktop]: desktop || laptop,
            [styles.singleColumnValuePaddingTablet]: tablet,
            [styles.singleColumnValuePaddingMobile]: mobile,
          })}
        >
          <Text type="value" variant="subheading">
            {description}
          </Text>
        </div>
      )}
      {data?.map((item, index) => (
        <div
          key={index}
          className={clsx(styles.singleColumnValue, {
            [styles.singleColumnValuePaddingDesktop]: desktop || laptop,
            [styles.singleColumnValuePaddingTablet]: tablet,
            [styles.singleColumnValuePaddingMobile]: mobile,
          })}
        >
          <Text type="value" variant="subheading">
            {`${item.label}:`}
          </Text>
          &nbsp;&nbsp;
          <Text type="value" variant="subheading">
            {item.value || ""}
          </Text>
        </div>
      ))}
    </Panel>
  );
};

export default SingleColumnPanel;
