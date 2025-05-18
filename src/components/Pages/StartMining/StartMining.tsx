import React, { useState } from "react";
import { SingleColumnPanel } from "@site/src/components/Molecules/SingleColumnPanel";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import {
  GetStartedTitle,
  PoolTitle,
  GuideTitle,
} from "@site/src/components/Molecules/PictureTitles";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import { IAnyPageAndWallet } from "../types";
import { useControls } from "./controls";
import { InfoPanel } from "@site/src/components/Molecules/InfoPanel";
import { Steps } from "../../Molecules/Steps";
import { DropdownIconDown } from "@site/src/icons";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import ICAN from "@blockchainhub/ican";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { POOLS_LIST } from '@site/src/configs/types';

import styles from './styles.module.css';

interface IStartMining extends IAnyPageAndWallet {}

const StartMining = ({ onSetWalletAddress }: IStartMining) => {
  const { startMiningPoolConfigurations, infoBoxMapData, isLoadingMapChart } =
    useControls();
  const { siteConfig } = useDocusaurusContext();
  const poolsList = siteConfig.customFields.POOLS_LIST as POOLS_LIST;

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
      <Spacer variant={desktop ? 'xxl' : 'xl'} />

      <span id="start"></span>
      <GetStartedTitle />
      <Spacer variant="sm" />
      {desktop ? <Spacer variant="xs" /> : null}

      <div
        className={`flex ${styles.infoPanel} ${mobile ? `flex-column ${styles.mobileInfoPanel}` : ''}`}
      >
        <InfoPanel
          title="How to Start Mining"
          text="Follow our comprehensive guide to begin your mining journey with CTR."
          link="#steps"
          linkText="Read Mining Guide"
        />
        <InfoPanel
          title="Mining Pools"
          text="Connect to our global network of mining pools for optimal performance."
          link="#pools"
          linkText="Explore Pools"
        />
      </div>
      {desktop ? <Spacer variant="xxxl" /> : <Spacer variant="sm" />}
      <Spacer variant="sm" />
      <span id="steps"></span>
      <GuideTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="lg" />}

      <Steps
        onSetWalletAddress={onSetWalletAddress}
      />

      <Spacer variant="xl" />
      <span id="pools"></span>
      {desktop ? <Spacer variant="md" /> : <Spacer variant="lg" />}

      <PoolTitle />
      {desktop ? <Spacer variant="lg" /> : <Spacer variant="md" />}
      <div className={`flex flex-column ${styles.poolContainer}`}>
        {Object.keys(poolsList).map((poolKey, index) => (
          <div key={index} className={styles.poolTable}>
            <Spacer variant="xs" />
            <div
              className={`flex ${styles.dropdownHeader}`}
              onClick={() => toggleRegion(poolKey)}
            >
              {poolsList[poolKey].NAME}
              <DropdownIconDown
                style={{
                  width: '24px',
                  height: '24px',
                  color: 'pink',
                  transform:
                    openRegion === poolKey
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                }}
              />
            </div>
            {openRegion === poolKey && (
              <SingleColumnPanel
                id={poolKey.toLowerCase()}
                description={poolsList[poolKey].DESCRIPTION}
                context="startMining"
                data={[
                  {
                    label: 'Server',
                    value: poolsList[poolKey].SERVER,
                  },
                  {
                    label: 'Port',
                    value: poolsList[poolKey].PORT,
                  },
                  {
                    label: 'Username',
                    value: poolsList[poolKey].USERNAME,
                  },
                  {
                    label: 'Worker name',
                    value: poolsList[poolKey].WORKER_NAME,
                  },
                  {
                    label: 'Password',
                    value: poolsList[poolKey].PASSWORD,
                  },
                  {
                    label: 'Payouts Address',
                    value: poolsList[poolKey].PAYOUT
                      ? ICAN.printFormat(poolsList[poolKey].PAYOUT)
                      : '',
                  },
                ]}
              />
            )}
            <Spacer variant="md" />
          </div>
        ))}
      </div>
      <Spacer variant="xxxl" />
    </>
  );
};

export default StartMining;
