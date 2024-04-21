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
import { KBD } from "@site/src/components/Atoms/KBD";
import { InputText } from "@site/src/components/Atoms/InputText";
import { useRef } from "react";
import { Button } from "../../Atoms/Button";
// eslint-disable-next-line import/no-unresolved
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { Search } from "@site/src/components/Molecules/Search";
import { TwoColumnsPanel } from "@site/src/components/Molecules/TwoColumnsPanel";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { convertSettingsResponse2SettingsInfo } from "./utils";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";

import styles from "./styles.module.css";

interface IStartMining extends IAnyPageAndWallet {}

const StartMining = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IStartMining) => {
  const { GO_CORE_CLIENT_URL, ICAN_WALLET_URL } = useControls();

  const inputStartMiningRef = useRef<HTMLInputElement>();

  const handleOnFocus = () => {
    inputStartMiningRef.current.select();
  };

  const { region, handleSearch } = useHeaders({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
  });

  const { data: fetchSettings } = useFetchSettings(region);

  return (
    <>
      <Spacer variant="xxxxl" />
      <PoolTitle />
      <Spacer variant="xl" />
      {Object.keys(REGIONS).map((REGION_KEY, index) => (
        <div key={index}>
          <SingleColumnPanel
            id={REGIONS[REGION_KEY].value}
            title={REGIONS[REGION_KEY].summary}
            data={[
              { label: "Server", value: REGIONS[REGION_KEY].url },
              { label: "Port", value: "8008" },
              {
                label: "Username",
                value: "<your wallet address>.<worker name>",
              },
              { label: "Password", value: "<empty>" },
            ]}
          />
          <Spacer variant="lg" />
        </div>
      ))}
      <GetStartedTitle />
      <Spacer variant="lg" />
      <Panel variant="heading3" title="Step 1: Get a Wallet">
        <PanelContent>
          <Text componentType="p" variant="body" type="value">
            Please, download the Core Wallet, where you can securely store your
            rewards.
          </Text>
          <Text variant="body" type="value">
            You can download
          </Text>
          <a href={GO_CORE_CLIENT_URL} target="_blank" rel="noreferrer">
            <Text variant="body" color="primary" type="value">
              &nbsp; go-core client &nbsp;
            </Text>
          </a>
          <Text variant="body" type="value">
            or use
          </Text>
          <a href={ICAN_WALLET_URL} target="_blank" rel="noreferrer">
            <Text type="value" color="primary" variant="body">
              &nbsp; generator of ICAN wallets.
            </Text>
          </a>
          <Spacer variant="xs" />
          <Text componentType="p" type="value" variant="body">
            Always remember to backup your private key! Clear your terminal
            session and history if needed:&nbsp;
          </Text>
          <Spacer variant="sm" />
          <KBD>clear && history -c</KBD>
          <Spacer variant="sm" />
          <Text type="value" variant="body" componentType="p">
            No Private key = No Coins!
          </Text>
          <Spacer variant="sm" />
          <div className={clsx(styles.lineFlex, styles.alignItemsCenter)}>
            <Text variant="body">Go-core command:</Text>
            <KBD>chmod -x gocore && ./gocore account new</KBD>
          </div>
          <Spacer />
          <div className={clsx(styles.lineFlex, styles.alignItemsCenter)}>
            <Text variant="body">Wallet Generator command:</Text>
            <KBD>chmod -x wallet-generator && ./wallet-generator</KBD>
          </div>
          <Spacer id="software" variant="xl" />
          <Title
            variant="subheading"
            title="Step 2: Download & Configure Verification software"
          >
            <Text type="value" variant="body">
              You can automatically download and configure software with just
              one command
            </Text>
            <Spacer variant="xs" />
            <Text variant="body" type="value">
              Or you can download the software and set it up.
            </Text>
            <Spacer variant="lg" />
            <Text variant="body" type="value">
              You can choose from the following software:
            </Text>
          </Title>
          <Spacer variant="lg" />
          <div className={clsx("col col--7", styles.coreMiner)}>
            <Panel title="CoreMiner" variant="heading2">
              <div className={styles.panelContent}>
                <Text variant="smallBody" type="value">
                  Fast & Open-source miner with excellent hardware support & 0%
                  fees.
                </Text>
                <Spacer variant="xs" />
                <Text variant="smallBody" type="value" componentType="p">
                  OS: Ubuntu, Raspbian
                </Text>
                <Text variant="smallBody" type="value" componentType="p">
                  CPUs: AMD, Intel, ARM
                </Text>
                <Text variant="smallBody" type="value">
                  Fee: 0%
                </Text>
                <Spacer />
                <Text variant="smallBody" type="value">
                  Command to configure the software:
                </Text>
                <Spacer variant="xs" />
                <InputText
                  readOnly
                  ref={inputStartMiningRef}
                  className={styles.input}
                  onFocus={handleOnFocus}
                  defaultValue="bash <(curl -s https://raw.githubusercontent.com/catchthatrabbit/coreminer/master/mine.sh)"
                />
                <Spacer variant="lg" />
                <div
                  className={clsx(styles.lineFlex, styles.justifyContentCenter)}
                >
                  <Link to="https://github.com/catchthatrabbit/coreminer/releases">
                    <Button value="Download Release"></Button>
                  </Link>
                </div>
              </div>
            </Panel>
          </div>
          <Spacer variant="xxl" />
          <Title variant="subheading" title="Step 3: Choose your server">
            <Text variant="body" type="value">
              We have Geo-locations to choose from:
            </Text>
            <Spacer variant="lg" />
            <div className="grid grid-row-gap grid-col-gap xl-grid-col--6 lg-grid-col--6 md-grid-col--4 sm-grid-col--2 xs-grid-col--1">
              {Object.keys(REGIONS).map((REGION_KEY, index) => (
                <div
                  key={index}
                  className={clsx(styles.buttonConfigLessPadding)}
                >
                  <Link to={`#${REGIONS[REGION_KEY].value}`}>
                    <Button
                      className={clsx([
                        styles.buttonConfig,
                        "whitespace-normal remove-padding-inline",
                      ])}
                      value={REGIONS[REGION_KEY].summary}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </Title>
          <Spacer variant="lg" />
          <Title variant="subheading" title="Step 4: Go To Dashboard">
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
      <Spacer id="pool-details" variant="lg" />
      <TwoColumnsPanel
        data={{
          title: "Pool details",
          data: convertSettingsResponse2SettingsInfo(fetchSettings),
        }}
      />
      <Spacer variant="xl" />
    </>
  );
};

export default StartMining;
