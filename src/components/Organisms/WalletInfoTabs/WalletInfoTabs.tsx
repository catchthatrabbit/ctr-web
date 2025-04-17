import React from "react";
import { Panel } from "@site/src/components/Molecules/Panel";
import { Spacer } from "../../Atoms/Spacer";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

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
  const { mobile } = useMediaQueries();
  return (
    <div>
      <Panel title="Miners" handleFilterChange={handleFilterChange}>
        {workers}
      </Panel>
      <Spacer variant="sm" />
      {mobile ? <Spacer variant="xs" /> : <Spacer variant="md" />}
      <Panel title="Payouts">{payouts}</Panel>
    </div>
  );
};

export default WalletInfoTabs;
