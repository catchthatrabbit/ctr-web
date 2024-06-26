import { ITabs, Tabs } from "@site/src/components/Molecules/Tabs";

interface IWalletInfoTabs {
  workers?: React.ReactNode;
  payouts?: React.ReactNode;
}

const WalletInfoTabs = ({ payouts, workers }: IWalletInfoTabs) => {
  const tabs = [
    {
      label: "Workers",
      value: "workers",
      tabContent: workers,
    },
    {
      label: "Payouts",
      value: "payouts",
      tabContent: payouts,
    },
  ] as ITabs["items"];

  return <Tabs items={tabs} />;
};

export default WalletInfoTabs;
