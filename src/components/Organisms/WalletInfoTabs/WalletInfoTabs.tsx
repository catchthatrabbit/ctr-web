import React from 'react';
import { Panel } from "@site/src/components/Molecules/Panel";
import { Spacer } from "../../Atoms/Spacer";

interface IWalletInfoTabs {
  workers?: React.ReactNode;
  payouts?: React.ReactNode;
  handleFilterChange?: (status: string) => void;
}

const WalletInfoTabs = ({
  payouts,
  workers,
  handleFilterChange,
}: IWalletInfoTabs) => {
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
  ];

  return (
    <div>
      <Panel title="Miners" handleFilterChange={handleFilterChange}>
        {workers}
      </Panel>
      <Spacer variant="sm" />
      <Spacer variant="md" />
      <Panel title="Payouts">{payouts}</Panel>
    </div>
  );
};

export default WalletInfoTabs;
