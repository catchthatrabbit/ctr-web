import React, { useState, useRef } from "react";
import { SingleColumnPanel } from "@site/src/components/Molecules/SingleColumnPanel";
import { REGIONS } from "@site/src/constants/regions";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import {
  GetStartedTitle,
  PoolTitle,
  GuideTitle,
} from "@site/src/components/Molecules/PictureTitles";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";
import { InfoPanel } from "@site/src/components/Molecules/InfoPanel";
import { Steps } from "../../Molecules/Steps";
import { DropdownIconDown } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import ICAN from "@blockchainhub/ican";

import styles from "./styles.module.css";

interface IStartMining extends IAnyPageAndWallet {}

const StartMining = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IStartMining) => {
  const { startMiningPoolConfigurations, infoBoxMapData, isLoadingMapChart } =
    useControls();

  const [openRegion, setOpenRegion] = useState<string | null>(null);
  const { mobile, tablet, desktop } = useMediaQueries();

  const toggleRegion = (regionKey: string) => {
    setOpenRegion(openRegion === regionKey ? null : regionKey);
  };
  return (
    <>
      {(mobile || tablet) && (
        <>
          <ConfiguredInfoBox
            infoItems={infoBoxMapData}
            isLoading={isLoadingMapChart}
          />
        </>
      )}
      <Spacer variant="sm" />
      {desktop ? <Spacer variant="md" /> : null}

      <span id="start"></span>
      <GetStartedTitle />
      <Spacer variant="sm" />
      {desktop ? <Spacer variant="xs" /> : null}

      <div
        className={`flex ${styles.infoPanel} ${mobile ? `flex-column ${styles.mobileInfoPanel}` : ""}`}
      >
        <InfoPanel
          title="How to Start Mining"
          text="A step-by-step guide to help you get started."
          link="#steps"
          linkText="View Section"
        />
        {mobile && <Spacer variant="xxs" />}
        <InfoPanel
          title="Pools"
          text="Explore all available geo-locations you can connect to."
          link="#pools"
          linkText="View Section"
        />
      </div>
      {desktop ? <Spacer variant="xxxl" /> : <Spacer variant="sm" />}
      <Spacer variant="sm" />
      <span id="steps"></span>
      <GuideTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="lg" />}

      <Steps
        onSetWalletAddress={onSetWalletAddress}
        steps={[
          {
            title: "Step 1",
            text: "Download mining software compatible with your hardware.",
            number: 1,
          },
          {
            title: "Step 2",
            text: "Configure your wallet address in the mining software.",
            number: 2,
          },
          {
            title: "Step 3",
            text: "Join a mining pool for consistent rewards.",
            number: 3,
          },
          {
            title: "Step 4",
            text: "Start the mining process and monitor performance.",
            number: 4,
          },
          {
            title: "Step 5",
            text: "Optimize your settings for maximum efficiency.",
            number: 5,
          },
        ]}
      />

      <Spacer variant="xl" />
      <span id="pools"></span>
      {desktop ? <Spacer variant="md" /> : <Spacer variant="lg" />}

      <PoolTitle />
      {desktop ? <Spacer variant="lg" /> : <Spacer variant="md" />}
      <div className={`flex flex-column ${styles.poolContainer}`}>
        {Object.keys(REGIONS).map((REGION_KEY, index) => (
          <div key={index} className={styles.poolTable}>
            <div
              className={`flex ${styles.dropdownHeader}`}
              onClick={() => toggleRegion(REGION_KEY)}
            >
              {startMiningPoolConfigurations[REGION_KEY][`NAME`]}
              <DropdownIconDown
                style={{
                  width: "24px",
                  height: "24px",
                  color: "pink",
                  transform:
                    openRegion === REGION_KEY
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.2s ease",
                }}
              />
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
                    label: "Payouts Address",
                    value: startMiningPoolConfigurations[REGION_KEY][`PAYOUT`]
                      ? ICAN.printFormat(
                          startMiningPoolConfigurations[REGION_KEY][`PAYOUT`],
                        )
                      : "",
                  },
                ]}
              />
            )}
            <Spacer variant="lg" />
          </div>
        ))}
      </div>
      <Spacer variant="xxxl" />
    </>
  );
};

export default StartMining;
