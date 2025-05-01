import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { CreateConfigTitle } from "@site/src/components/Molecules/PictureTitles";
import { InputText } from "@site/src/components/Atoms/InputText";
import { Dropdown } from "../../Atoms/Dropdown";
import { Text } from "@site/src/components/Atoms/Text";
import Button from "@site/src/components/Atoms/Button/Button";
import Ican from "@blockchainhub/ican";
import useControls from "./controls";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import { constructWorkerName } from "@site/src/utils/convertWorkerName";
import { profitabilityCalculation } from "@site/src/utils/profitabilityCalculation";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { POOLS_API_CONFIG_TYPE } from "@site/src/configs/types";
import { ActionMeta } from "react-select";

import clsx from 'clsx';

import styles from './styles.module.css';

interface IPayments {
  defaultRegion?: STANDARD_REGIONS_API_KEYS;
  onSetWalletAddress?: (address: string) => void;
  onChangeRegion?: (region: any) => void;
  address?: string;
  pool?: string;
  secondPool?: string;
}

const CreateConfig = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
  address,
  pool,
  secondPool,
}: IPayments) => {
  const { siteConfig } = useDocusaurusContext();

  const hashratePriceOptions = [
    { value: "max13", label: "MAX series: ~13 kh/s — 100€ per month" },
  ];

  const [profitability, setProfitability] = useState<number>(0);
  const [xcbPrice, setXcbPrice] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>(hashratePriceOptions[0].value);
  const [dropdownValue1, setDropdownValue1] = useState<{ value: string; label: string } | null>(null);
  const [dropdownValue2, setDropdownValue2] = useState<{ value: string; label: string } | null>(null);

  // Group all useState hooks together
  const [walletAddress, setWalletAddress] = useState(address || "");
  const [isWalletValid, setIsWalletValid] = useState(true);
  const [inputType, setInputType] = useState("plain");
  const [minerName, setMinerName] = useState({ value: "", isValid: true });
  const [typePortal, setTypePortal] = useState({ value: "", isValid: true });
  const [uniqueId, setUniqueId] = useState("");
  const [showError, setShowError] = useState(false);
  const { mobile, tablet, desktop } = useMediaQueries();
  const {
    dropdownItems,
    regionLabel,
    startMiningPoolConfigurations,
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls({ defaultRegion, onSetWalletAddress, onChangeRegion });

  // Group all useCallback hooks together
  const formatWalletAddress = useCallback((value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  }, []);

  const handleWalletAddressChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatWalletAddress(
        event.target.value.replace(/\s+/g, ""),
      );
      const isValid = Ican.isValid(formattedValue, true);
      setIsWalletValid(isValid);
      setWalletAddress(formattedValue);
    },
    [formatWalletAddress],
  );

  const handleMinerNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const regex = inputType === "plain" ? /^[A-Za-z0-9_-]+$/ : /^[A-Za-z0-9]+$/;
      const isValid = regex.test(value);
      setMinerName({ value, isValid });
    },
    [inputType],
  );

  const handleTypePortalChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const regex =
        /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
      const isValid = regex.test(value);
      setTypePortal({ value, isValid });
    },
    [],
  );

  const handleUniqueIdChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUniqueId(event.target.value);
    },
    [],
  );

  const handleDropdownChange1 = useCallback(
    (selectedOption: { value: string; label: string }) => {
      setDropdownValue1(selectedOption);
    },
    [],
  );

  const handleDropdownChange2 = useCallback(
    (selectedOption: { value: string; label: string }) => {
      setDropdownValue2(selectedOption);
    },
    [],
  );

  const calculateProfitability = useCallback(async (hashrate: number) => {
    try {
      const result = await profitabilityCalculation(
        hashrate,
        siteConfig.customFields.API_ENDPOINTS as POOLS_API_CONFIG_TYPE,
        String(siteConfig.customFields.API_PATH),
        "usd",
        "monthly"
      );
      if (result) {
        setProfitability(result.revenue);
        setXcbPrice(result.xcbPrice);
      }
    } catch (error) {
      console.error("Error calculating profitability:", error);
    }
  }, [siteConfig]);

  const handleHashratePriceChange = useCallback((newValue: { value: string; label: string }, actionMeta: ActionMeta<unknown>) => {
    setSelectedOption(newValue.value);
  }, []);

  useEffect(() => {
    if (selectedOption) {
      const numericValue = selectedOption.replace(/[^0-9]/g, '');
      const hashrate = Number(numericValue) * 1000; // Convert from kh/s to h/s
      calculateProfitability(hashrate);
    }
  }, [selectedOption, calculateProfitability]);

  useEffect(() => {
    if (hashratePriceOptions.length > 0 && !selectedOption) {
      const initialValue = hashratePriceOptions[0].value;
      const numericValue = initialValue.replace(/[^0-9]/g, '');
      const hashrate = Number(numericValue) * 1000;
      calculateProfitability(hashrate);
    }
  }, [hashratePriceOptions, calculateProfitability]);

  useEffect(() => {
    if (
      dropdownItems.length > 0 &&
      (!dropdownValue1 || !dropdownValue2)
    ) {
      if (pool || secondPool) {
        const pool1 = dropdownItems.find(item => item.value === pool) || dropdownItems[0];
        const pool2 = dropdownItems.find(item => item.value === secondPool) || dropdownItems[1];
        setDropdownValue1(pool1);
        setDropdownValue2(pool2);
      } else {
        const pool1Index = Math.floor(Math.random() * dropdownItems.length);
        const pool1 = dropdownItems[pool1Index];
        setDropdownValue1(pool1);
        const pool2Candidates = dropdownItems.filter((_, idx) => idx !== pool1Index);
        if (pool2Candidates.length > 0) {
          const pool2Index = Math.floor(Math.random() * pool2Candidates.length);
          setDropdownValue2(pool2Candidates[pool2Index]);
        } else {
          setDropdownValue2(null);
        }
      }
    }
  }, [dropdownItems, pool, secondPool, dropdownValue1, dropdownValue2]);

  const renderInputs = () => {
    if (inputType === 'plain') {
      return (
        <>
          <Text
            variant="body"
            color="subheadingColor"
            style={{ marginBottom: "0.5em" }}
          >
            Plain name
          </Text>
          <InputText
            context="dark"
            value={minerName.value}
            onChange={handleMinerNameChange}
            placeholder="Name of your worker"
            ref={minerNameRef}
          />
          {!minerName.isValid && (
            <Text
              variant="body"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Plain name is invalid. Use only letters, numbers, underscores (_),
              or hyphens (-).
            </Text>
          )}
          <Spacer variant="xs" />
        </>
      );
    } else if (inputType === 'fediverse') {
      return (
        <>
          <Text
            variant="body"
            color="subheadingColor"
            style={{ marginBottom: "0.5em" }}
          >
            Fediverse Username
          </Text>
          <InputText
            context="dark"
            value={minerName.value}
            onChange={handleMinerNameChange}
            placeholder="username"
            ref={minerNameRef}
          />
          {!minerName.isValid && (
            <Text
              variant="body"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Fediverse username is invalid. Use only letters and numbers.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="body"
            color="subheadingColor"
            style={{ marginBottom: "0.5em" }}
          >
            Fediverse portal
          </Text>
          <InputText
            context="dark"
            value={typePortal.value}
            onChange={handleTypePortalChange}
            placeholder="coretalk.space"
            ref={typePortalRef}
          />
          {!typePortal.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: '1rem', color: 'var(--ifm-color-danger)' }}
            >
              Portal is invalid. Enter a valid domain.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="body"
            color="subheadingColor"
            style={{ marginBottom: "0.5em" }}
          >
            Worker ID (optional)
          </Text>
          <InputText
            context="dark"
            value={uniqueId}
            ref={workerIdRef}
            onChange={handleUniqueIdChange}
            placeholder="worker1"
          />
          <Spacer variant="xs" />
        </>
      );
    }
  };

  const areFieldsValid = () => {
    if (inputType === 'plain') {
      const walletAddressValue = walletAddressRef.current?.value.trim() || '';
      const minerNameValue = minerNameRef.current?.value.trim() || '';

      return walletAddressValue !== '' && minerNameValue !== '';
    } else if (inputType === 'fediverse') {
      const walletAddressValue = walletAddressRef.current?.value.trim() || '';
      const minerNameValue = minerNameRef.current?.value.trim() || '';
      const typePortalValue = typePortalRef.current?.value.trim() || '';

      const regex =
        /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
      const isPortalValid = regex.test(typePortalValue);

      return (
        walletAddressValue !== '' &&
        minerNameValue !== '' &&
        typePortalValue !== '' &&
        isPortalValid
      );
    }
    return false;
  };

  const handleDownloadConfig = () => {
    if (!areFieldsValid()) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const walletAddressFormat = walletAddressRef.current?.value
      .replace(/\s+/g, '')
      .toLowerCase();
    let workerName = '';

    if (inputType === 'plain') {
      workerName = `_${minerNameRef.current?.value}` || '';
    } else if (inputType === 'fediverse') {
      const minerNameValue = minerNameRef.current?.value || '';
      const typePortalValue = typePortalRef.current?.value || '';

      const processedPortal = typePortalValue
        .split('.')
        .map((part, index) =>
          index === 1 ? part.charAt(0).toUpperCase() + part.slice(1) : part
        ) // Capitalize the TLD
        .join('');

      workerName = `_${minerNameValue}${processedPortal}`;
    }

    const workerIdValue = workerIdRef.current?.value.trim() || '';
    if (workerIdValue !== '') {
      workerName = `${workerName}-${workerIdValue}`;
    }

    const regionKey1 = Object.keys(startMiningPoolConfigurations).find(
      (key) =>
        startMiningPoolConfigurations[key]["DESCRIPTION"] === dropdownValue1?.label,
    );
    const regionKey2 = Object.keys(startMiningPoolConfigurations).find(
      (key) =>
        startMiningPoolConfigurations[key]["DESCRIPTION"] === dropdownValue2?.label,
    );

    const server1 =
      regionKey1 && startMiningPoolConfigurations[regionKey1]['SERVER'];
    const port1 =
      regionKey1 && startMiningPoolConfigurations[regionKey1]['PORT'];
    const server2 =
      regionKey2 && startMiningPoolConfigurations[regionKey2]['SERVER'];
    const port2 =
      regionKey2 && startMiningPoolConfigurations[regionKey2]['PORT'];

    const configData: Record<string, string | undefined> = {
      wallet: walletAddressFormat,
      worker: workerName,
      [`server[1]`]: server1,
      [`port[1]`]: port1,
      [`server[2]`]: server2,
      [`port[2]`]: port2,
    };

    const configContent = Object.entries(configData)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const blob = new Blob([configContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pool.cfg';
    a.click();
    URL.revokeObjectURL(url);
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
      <Spacer variant="xxxl" />
      <Spacer variant={desktop ? 'xxl' : 'xxs'} />

      <CreateConfigTitle />
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="sm" />}
      <div className="flex">
        <div className={`flex flex-column ${styles.mainContent}`}>
          <Text variant="heading3" color="white" weight="semiBold">
            Basic details
          </Text>
          {desktop ? <Spacer variant="xs" /> : <Spacer variant="sm" />}
          <Text
            variant="body"
            color="subheadingColor"
            style={{ marginBottom: "0.5em" }}
            disableMobileStyles
          >
            Core ID (Wallet address)
          </Text>
          <InputText
            context="dark"
            value={walletAddress}
            ref={walletAddressRef}
            onChange={handleWalletAddressChange}
            className={styles.familyZephirum}
          />
          {!isWalletValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: '1rem', color: 'var(--ifm-color-danger)' }}
            >
              Core ID is not valid!
            </Text>
          )}
          {desktop ? <Spacer variant="sm" /> : <Spacer variant="md" />}
          <div className={styles.dropdowns}>
            <div className={styles.dropdownContainer}>
              <Text
                variant="body"
                color="subheadingColor"
                style={{ marginBottom: "0.5em" }}
              >
                Primary pool (Main)
              </Text>
              <select
                className={styles.boardDropdown}
                value={dropdownValue1?.value || ""}
                onChange={e => {
                  const selected = dropdownItems.find(item => item.value === e.target.value);
                  setDropdownValue1(selected || null);
                }}
              >
                {dropdownItems.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.dropdownContainer}>
              <Text
                variant="body"
                color="subheadingColor"
                style={{ marginBottom: "0.5em" }}
              >
                Secondary pool (Fail-Safe)
              </Text>
              <select
                className={styles.boardDropdown}
                value={dropdownValue2?.value || ""}
                onChange={e => {
                  const selected = dropdownItems.find(item => item.value === e.target.value);
                  setDropdownValue2(selected || null);
                }}
              >
                {dropdownItems.map(item => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.viewPoolsLinkContainer}>
            <Link to="/start-mining#pools">
              <Text
                variant="subheading"
                color="primary"
                type="value"
              >
                Mining Pools Overview
              </Text>
            </Link>
          </div>
          {mobile ? <Spacer variant="xs" /> : <Spacer variant="sm" />}
          <Text variant="heading3" color="white" weight="semiBold">
            Identification details
          </Text>
          <Spacer variant="xxs" />
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.tabButton, inputType === "plain" && styles.activeTab)}
              onClick={() => setInputType("plain")}
            >
              Plain name
            </button>
            <button
              type="button"
              className={clsx(styles.tabButton, inputType === "fediverse" && styles.activeTab)}
              onClick={() => setInputType("fediverse")}
            >
              Fediverse
            </button>
          </div>
          {desktop ? <Spacer variant="md" /> : <Spacer variant="sm" />}
          {renderInputs()}
          <Spacer variant="sm" />
          <div className={styles.responsiveContainer}>
            <div className={styles.halfContainer}>
              <div>
                <h3 className={styles.ownHardware}>Own Hardware</h3>
                <p>Click the download button to get the <span className={styles.boldText}>pool.cfg</span> file. Place it in the same folder as your <a href="https://github.com/catchthatrabbit/coreminer/releases" target="_blank" rel="noopener" className={styles.minerLink}>miner software</a>.</p>
              </div>
              {!desktop && <Spacer variant="sm" />}
              {!desktop && (
                <Button
                  backgroundColor="var(--ifm-color-primary)"
                  textColor="var(--ifm-button-color)"
                  weight="medium"
                  value="Download Config"
                  context="config"
                  onClick={handleDownloadConfig}
                  className={styles.fullButton}
                />
              )}
            </div>
            <div className={styles.halfContainer}>
              <div>
                <h3 className={styles.hosting}>Hosting</h3>
                <div className={styles.dropdownPriceContainer}>
                  <Dropdown
                    defaultValue={hashratePriceOptions.find(opt => opt.value === selectedOption)?.label || ""}
                    items={hashratePriceOptions}
                    onChange={handleHashratePriceChange}
                    text="Hashrate & Price"
                  />
                </div>
                <div>
                  <span><strong>Estimation:</strong> {profitability ? `$${profitability.toFixed(2)}` : "Calculating…"} @XCB {xcbPrice ? `$${xcbPrice.toFixed(4)}` : "Loading…"}</span>
                  <span style={{ marginLeft: '0.8em', fontSize: '0.9em' }}>Tip: <a href="https://app.ping.exchange/trade?market=xcb_usdc" target="_blank" rel="noopener" className={styles.minerLink}>Buy more XCB</a> to raise the price globally.</span>
                </div>
              </div>
              {!desktop && (
                <Button
                  backgroundColor="var(--ifm-color-secondary)"
                  textColor="var(--ifm-button-color)"
                  weight="medium"
                  value="Order Machine and Pay Monthly"
                  context="config"
                  className={styles.fullButton}
                />
              )}
            </div>
          </div>
          {desktop && (
            <div className={styles.buttonContainer}>
              <Button
                backgroundColor="var(--ifm-color-primary)"
                textColor="var(--ifm-button-color)"
                weight="medium"
                value="Download Config"
                context="config"
                onClick={handleDownloadConfig}
                className={styles.halfButton}
              />
              <Button
                backgroundColor="var(--ifm-color-secondary)"
                textColor="var(--ifm-button-color)"
                weight="medium"
                value="Order Machine and Pay Monthly"
                context="config"
                className={styles.halfButton}
              />
            </div>
          )}
          {showError && (
            <Text
              variant="smallBody"
              style={{ marginTop: '1rem', color: 'var(--ifm-color-danger)' }}
            >
              All required fields need to be filled out correctly to proceed.
            </Text>
          )}
          <Spacer variant="xxxl" />
        </div>
      </div>
    </>
  );
};

export default CreateConfig;
