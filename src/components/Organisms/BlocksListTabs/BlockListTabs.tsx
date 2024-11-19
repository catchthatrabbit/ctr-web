import React from "react";
import { ITabs, Tabs } from "@site/src/components/Molecules/Tabs";

interface IBlockListTabs {
  blocks?: React.ReactNode;
  immature?: React.ReactNode;
  candidates?: React.ReactNode;
  activeTab: string;
  onTabChange: (value: string) => void;
}

const BlockListTabs = ({
  blocks,
  immature,
  candidates,
  activeTab,
  onTabChange,
}: IBlockListTabs) => {
  const renderContent = () => {
    switch (activeTab) {
      case "blocks":
        return blocks;
      case "immature":
        return immature;
      case "newBlocks":
        return candidates;
      default:
        return null;
    }
  };

  return renderContent();
};

export default BlockListTabs;
