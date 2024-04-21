import { ITabs, Tabs } from "@site/src/components/Molecules/Tabs";

interface IBlockListTabs {
  blocks?: React.ReactNode;
  immature?: React.ReactNode;
  candidates?: React.ReactNode;
}

const BlockListTabs = ({ blocks, immature, candidates }: IBlockListTabs) => {
  const tabs = [
    {
      label: "Blocks",
      value: "blocks",
      tabContent: blocks,
    },
    {
      label: "Immature",
      value: "immature",
      tabContent: immature,
    },
    {
      label: "New blocks",
      value: "newBlocks",
      tabContent: candidates,
    },
  ] as ITabs["items"];

  return <Tabs items={tabs} />;
};

export default BlockListTabs;
