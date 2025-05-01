import React from "react";
import { Panel } from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";
import { Spacer } from "@site/src/components/Atoms/Spacer";

import styles from "./styles.module.css";

interface ISingleColumnPanel {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  data: Array<{ label: string; value: string }>;
  description?: string;
  context?: "default" | "startMining";
}

const SingleColumnPanel = ({
  title,
  data,
  id,
  description,
  context = "default",
}: ISingleColumnPanel) => {
  const { desktop, mobile, tablet } = useMediaQueries();
  return (
    <Panel
      id={id || ""}
      title={title || ""}
      variant="heading2"
      color="primary"
      titleClassName={styles.singlePanel}
      context={context}
    >
      {description && (
        <>
          <Spacer variant="xxs" />
          <div
            className={clsx(styles.singleColumnValue, {
              [styles.singleColumnValuePaddingTablet]: tablet,
              [styles.singleColumnValuePaddingMobile]: mobile,
              [styles.singleColumnValuePaddingStartMining]:
                context === "startMining",
            })}
          >
            <Text type="value" variant={desktop ? "subheading" : "body"}>
              {description}
            </Text>
          </div>
          <Spacer variant="sm" />
        </>
      )}
      {data?.map((item, index) => (
        <div
          key={index}
          className={clsx(styles.singleColumnValue, {
            [styles.singleColumnValuePaddingTablet]: tablet,
            [styles.singleColumnValuePaddingMobile]: mobile,
            [styles.singleColumnValuePaddingStartMining]:
              context === "startMining",
          })}
        >
          {context === "startMining" ? (
            <div className={styles.labelValueContainer}>
              <div className={styles.label}>
                <Text
                  type="value"
                  variant="smallBody"
                  color="white"
                  weight={desktop ? "normal" : "bold"}
                >
                  {item.label}
                </Text>
              </div>
              <div className={styles.value}>
                <Text
                  type="value"
                  variant="smallBody"
                  color="white"
                  weight={desktop ? "normal" : "bold"}
                >
                  {item.value || ""}
                </Text>
              </div>
            </div>
          ) : (
            <>
              <Text type="value" variant="subheading">
                {`${item.label}:`}
              </Text>
              <Text type="value" variant="subheading">
                {item.value || ""}
              </Text>
            </>
          )}
        </div>
      ))}
    </Panel>
  );
};

export default SingleColumnPanel;
