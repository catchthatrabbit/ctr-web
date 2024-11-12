import React, { useState, useRef } from "react";
import { SingleColumnPanel } from "@site/src/components/Molecules/SingleColumnPanel";
import { REGIONS } from "@site/src/constants/regions";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import {
  GetStartedTitle,
  PoolTitle,
  GuideTitle,
} from "@site/src/components/Molecules/PictureTitles";
import {
  Panel,
  PanelContent,
  Title,
} from "@site/src/components/Molecules/Panel";
import { Text } from "@site/src/components/Atoms/Text";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { Search } from "@site/src/components/Molecules/Search";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";
import { InfoPanel } from "@site/src/components/Molecules/InfoPanel";
import { Steps } from "../../Molecules/Steps";

import styles from "./styles.module.css";

interface IStartMining extends IAnyPageAndWallet {}

const StartMining = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IStartMining) => {
  const { startMiningPoolConfigurations, githubReleaseDownloadUrl } =
    useControls();

  const inputStartMiningRef = useRef<HTMLInputElement>();

  const { region, handleSearch } = useHeaders({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
  });

  const { data: fetchSettings } = useFetchSettings(region);

  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const toggleRegion = (regionKey: string) => {
    setOpenRegion(openRegion === regionKey ? null : regionKey);
  };

  return (
    <>
      <Spacer variant="sm" />
      <Spacer variant="md" />

      <span id="start"></span>
      <GetStartedTitle />
      <Spacer variant="sm" />
      <Spacer variant="md" />
      <div className={`flex ${styles.infoPanel}`}>
        <InfoPanel
          title="How to start minig"
          text="Step by step guide to get you hop on board."
          link=""
          linkText="View section"
        />
        <InfoPanel
          title="Pools"
          text="View all geo-locations you can use."
          link=""
          linkText="View section"
        />
      </div>
      <Spacer variant="xxxl" />
      <Spacer variant="sm" />
      <GuideTitle />
      <Spacer variant="xxl" />

      <Steps onSetWalletAddress={onSetWalletAddress} />

      <Spacer variant="xl" />
      <span id="pools"></span>
      <Spacer variant="md" />
      <PoolTitle />
      <Spacer variant="xl" />
      <div className={`flex flex-column ${styles.poolContainer}`}>
        {Object.keys(REGIONS).map((REGION_KEY, index) => (
          <div key={index}>
            <div
              className={styles.dropdownHeader}
              onClick={() => toggleRegion(REGION_KEY)}
            >
              {startMiningPoolConfigurations[REGION_KEY][`NAME`]}
            </div>
            {openRegion === REGION_KEY && (
              <SingleColumnPanel
                id={REGION_KEY.toLowerCase()}
                description={
                  startMiningPoolConfigurations[REGION_KEY][`DESCRIPTION`]
                }
                context="startMining"
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
                    value:
                      startMiningPoolConfigurations[REGION_KEY][`USERNAME`],
                  },
                  {
                    label: "Worker name",
                    value:
                      startMiningPoolConfigurations[REGION_KEY][`WORKER_NAME`],
                  },
                  {
                    label: "Password",
                    value:
                      startMiningPoolConfigurations[REGION_KEY][`PASSWORD`],
                  },
                  {
                    label: "Payouts from",
                    value: startMiningPoolConfigurations[REGION_KEY][`PAYOUT`]
                      ? startMiningPoolConfigurations[REGION_KEY][
                          `PAYOUT`
                        ].toUpperCase()
                      : "",
                  },
                ]}
              />
            )}
            <Spacer variant="lg" />
          </div>
        ))}
      </div>
      <Spacer variant="xl" />
    </>
  );
};

export default StartMining;
