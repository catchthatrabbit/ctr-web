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
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import { Search } from "@site/src/components/Molecules/Search";
import { useFetchSettings } from "@site/src/hooks/useSettings";
import { useHeaders } from "@site/src/hooks/useHeaders";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";
import { InfoPanel } from "@site/src/components/Molecules/InfoPanel";
import { Steps } from "../../Molecules/Steps";
import { DropdownIconDown } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

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
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls();

  const inputStartMiningRef = useRef<HTMLInputElement>();

  const { region, handleSearch } = useHeaders({
    defaultRegion,
    onSetWalletAddress,
    onChangeRegion,
  });

  const { data: fetchSettings } = useFetchSettings(region);

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
      {desktop ? <Spacer variant="md" /> : null}

      <div
        className={`flex ${styles.infoPanel} ${mobile ? `flex-column ${styles.mobileInfoPanel}` : ""}`}
      >
        <InfoPanel
          title="How to start minig"
          text="Step by step guide to get you hop on board."
          link="#steps"
          linkText="View section"
        />
        {mobile && <Spacer variant="xxs" />}
        <InfoPanel
          title="Pools"
          text="View all geo-locations you can use."
          link="#pools"
          linkText="View section"
        />
      </div>
      {desktop ? <Spacer variant="xxxl" /> : <Spacer variant="sm" />}
      <Spacer variant="sm" />
      <span id="steps"></span>
      <GuideTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="lg" />}

      <Steps onSetWalletAddress={onSetWalletAddress} />

      <Spacer variant="xl" />
      <span id="pools"></span>
      {desktop ? <Spacer variant="md" /> : <Spacer variant="xxxl" />}

      <PoolTitle />
      <Spacer variant="xl" />
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
      <Spacer variant="xxxl" />
    </>
  );
};

export default StartMining;
