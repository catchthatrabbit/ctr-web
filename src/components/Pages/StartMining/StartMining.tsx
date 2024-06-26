import { SingleColumnPanel } from "@site/src/components/Molecules/SingleColumnPanel";
import { REGIONS } from "@site/src/constants/regions";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import {
  GetStartedTitle,
  PoolTitle,
} from "@site/src/components/Molecules/PictureTitles";
import {
  Panel,
  PanelContent,
  Title,
} from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import { useRef } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { Search } from "@site/src/components/Molecules/Search";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";

import styles from "./styles.module.css";

interface IStartMining extends IAnyPageAndWallet {}

const StartMining = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IStartMining) => {
  const {
    startMiningPoolConfigurations,
    githubReleaseDownloadUrl,

  } = useControls();

  const inputStartMiningRef = useRef<HTMLInputElement>();

  const { region, handleSearch } = useHeaders({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
  });

  const { data: fetchSettings } = useFetchSettings(region);

  return (
    <>
      <Spacer variant="xxxxl" />
      <span id="start"></span>
      <GetStartedTitle />
      <Spacer variant="lg" />
      <Panel variant="heading3" title="Configure your device">
        <PanelContent>
        <Text variant="body" type="value">
            Download software:
          </Text>
          <Spacer variant="lg" />
          <div className="grid grid-row-gap grid-col-gap xl-grid-col--6 lg-grid-col--6 md-grid-col--4 sm-grid-col--2 xs-grid-col--1">
            <div
              className={clsx(styles.buttonConfigLessPadding)}
            >
              <Link to={githubReleaseDownloadUrl} className="link-button">
                CoreMiner for Linux
              </Link>
              <Link to="/docs/intro" className="link-button">
                Auto-install script
              </Link>
            </div>
          </div>
          <Spacer variant="lg" />
          <Text variant="body" type="value">
            Choose the configuration type:
          </Text>
          <Spacer variant="lg" />
          <div className="grid grid-row-gap grid-col-gap xl-grid-col--6 lg-grid-col--6 md-grid-col--4 sm-grid-col--2 xs-grid-col--1">
            <div
              className={clsx(styles.buttonConfigLessPadding)}
            >
              <Link to="/docs/intro" className="link-button">
                Open configuration manual
              </Link>
              <Link to="/docs/intro" className="link-button">
                Create config file
              </Link>
            </div>
          </div>
          <Spacer variant="lg" />
          <Title title="Open your account">
            <Text type="value" variant="body">
              To access the Dashboard, type your address below.
            </Text>
            <Spacer variant="lg" />
            <div className={clsx(styles.marginAuto, "col col--11")}>
              <Search onSearch={handleSearch} />
            </div>
          </Title>
        </PanelContent>
      </Panel>
      <Spacer variant="xl" />
      <span id="pools"></span>
      <PoolTitle />
      <Spacer variant="xl" />
      {Object.keys(REGIONS).map((REGION_KEY, index) => (
        <div key={index}>
          <SingleColumnPanel
            id={REGION_KEY.toLowerCase()}
            title={startMiningPoolConfigurations[REGION_KEY][`NAME`]}
            description={startMiningPoolConfigurations[REGION_KEY][`DESCRIPTION`]}
            data={[
              {
                label: "Server",
                value: startMiningPoolConfigurations[REGION_KEY][`SERVER`],
              },
              {
                label: "Port",
                value: startMiningPoolConfigurations[REGION_KEY][`PORT`],
              },
              {
                label: "Username",
                value: startMiningPoolConfigurations[REGION_KEY][`USERNAME`],
              },
              {
                label: "Worker name",
                value: startMiningPoolConfigurations[REGION_KEY][`WORKER_NAME`],
              },
              {
                label: "Password",
                value: startMiningPoolConfigurations[REGION_KEY][`PASSWORD`],
              },
              {
                label: "Payouts from",
                value: startMiningPoolConfigurations[REGION_KEY][`PAYOUT`] ? startMiningPoolConfigurations[REGION_KEY][`PAYOUT`].toUpperCase() : '',
              },
            ]}
          />
          <Spacer variant="lg" />
        </div>
      ))}
      <Spacer variant="xl" />
    </>
  );
};

export default StartMining;
