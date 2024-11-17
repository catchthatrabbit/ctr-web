import React from "react";
import clsx from "clsx";
import { Text } from "../../Atoms/Text";

import styles from "./styles.module.css";

export interface ITabs {
  items: Array<{ label: string; value: string }>;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const Tabs = ({ items, activeTab, onTabChange }: ITabs) => {
  return (
    <div className={styles.tabs}>
      {items.map((item, index) => (
        <button
          key={index}
          className={clsx(styles.tab, {
            [styles.activeTab]: activeTab === item.value,
          })}
          onClick={() => onTabChange(item.value)}
        >
          <Text
            variant="smallBody"
            color={activeTab === item.value ? "white" : "primary"}
            weight="bold"
          >
            {item.label}
          </Text>
        </button>
      ))}
    </div>
  );
};
