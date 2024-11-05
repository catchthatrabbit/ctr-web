import { ITabs, Tabs } from "@site/src/components/Molecules/Tabs";
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
  ] as ITabs["items"];

  return (
    <div>
      {/* Render the workers table within a Panel */}
      <Panel title="Miners" handleFilterChange={handleFilterChange}>
        {workers}
      </Panel>

      <Spacer variant="sm" />
      <Spacer variant="md" />
      {/* Render the payouts table within a Panel */}
      <Panel title="Payouts">{payouts}</Panel>
    </div>
  );
};

export default WalletInfoTabs;
