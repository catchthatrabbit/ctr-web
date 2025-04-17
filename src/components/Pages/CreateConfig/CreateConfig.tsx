import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { CreateConfigTitle } from "@site/src/components/Molecules/PictureTitles";
import { InputText } from "@site/src/components/Atoms/InputText";
import { Dropdown } from "../../Atoms/Dropdown";
import { Text } from "@site/src/components/Atoms/Text";
import { Warning } from "@site/src/components/Atoms/Warning";
import Button from "@site/src/components/Atoms/Button/Button";
import Ican from "@blockchainhub/ican";
import useControls from "./controls";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import { STANDARD_REGIONS_API_KEYS } from "@site/src/Api/types";
import { constructWorkerName } from "@site/src/utils/convertWorkerName";

import clsx from "clsx";

import styles from "./styles.module.css";

interface IPayments {
  defaultRegion?: STANDARD_REGIONS_API_KEYS;
  onSetWalletAddress?: (address: string) => void;
  onChangeRegion?: (region: any) => void;
}

const CreateConfig = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IPayments) => {
  const {
    handleChangeRegion,
    handleSearch,
    dropdownItems,
    regionLabel,
    convertWorkerName,
    startMiningPoolConfigurations,
    infoBoxMapData,
    isLoadingMapChart,
  } = useControls({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletValid, setIsWalletValid] = useState(true);
  const [inputType, setInputType] = useState("plain");
  const [minerName, setMinerName] = useState({ value: "", isValid: true });
  const [typePortal, setTypePortal] = useState({ value: "", isValid: true });
  const [uniqueId, setUniqueId] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState(regionLabel);
  const [dropdownValue2, setDropdownValue2] = useState(dropdownItems[1].label);
  const [showError, setShowError] = useState(false);

  const { mobile, tablet, desktop } = useMediaQueries();

  const formatWalletAddress = (value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleWalletAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedValue = formatWalletAddress(
      event.target.value.replace(/\s+/g, ""),
    );
    const isValid = Ican.isValid(formattedValue, true);
    setIsWalletValid(isValid);
    setWalletAddress(formattedValue);
  };

  const handleMinerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regex = inputType === "plain" ? /^[A-Za-z0-9_-]+$/ : /^[A-Za-z0-9]+$/;
    const isValid = regex.test(value);
    setMinerName({ value, isValid });
  };

  const handleTypePortalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    const regex =
      /^(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{2,11}?$/;
    const isValid = regex.test(value);
    setTypePortal({ value, isValid });
  };

  const handleUniqueIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueId(event.target.value);
  };

  const handleDropdownChange1 = (selectedOption: { label: string }) => {
    setDropdownValue1(selectedOption.label);
  };

  const handleDropdownChange2 = (selectedOption: { label: string }) => {
    setDropdownValue2(selectedOption.label);
  };

  const renderInputs = () => {
    if (inputType === "plain") {
      return (
        <>
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Plain name
          </Text>
          <InputText
            context="dark"
            value={minerName.value}
            onChange={handleMinerNameChange}
            placeholder="Name of your worker"
          />
          {!minerName.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Plain name is invalid. Use only letters, numbers, underscores (_),
              or hyphens (-).
            </Text>
          )}
          <Spacer variant="xs" />
        </>
      );
    } else if (inputType === "fediverse") {
      return (
        <>
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Fediverse Username
          </Text>
          <InputText
            context="dark"
            value={minerName.value}
            onChange={handleMinerNameChange}
            placeholder="username"
          />
          {!minerName.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Fediverse username is invalid. Use only letters and numbers.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Fediverse portal
          </Text>
          <InputText
            context="dark"
            value={typePortal.value}
            onChange={handleTypePortalChange}
            placeholder="coretalk.space"
          />
          {!typePortal.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Portal is invalid. Enter a valid domain.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Worker ID (optional)
          </Text>
          <InputText
            context="dark"
            value={uniqueId}
            onChange={handleUniqueIdChange}
            placeholder="worker1"
          />
          <Spacer variant="xs" />
        </>
      );
    }
  };

  const areFieldsValid = () => {
    if (inputType === "plain") {
      return (
        isWalletValid && minerName.isValid && walletAddress && minerName.value
      );
    } else if (inputType === "fediverse") {
      return (
        isWalletValid &&
        minerName.isValid &&
        typePortal.isValid &&
        walletAddress &&
        minerName.value &&
        typePortal.value
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
    let walletAddressFormat = walletAddress.replace(/\s+/g, "").toLowerCase();
    let workerName = "";
    if (inputType === "plain") {
      workerName = minerName.value;
    } else if (inputType === "fediverse") {
      workerName = constructWorkerName(
        minerName.value,
        [typePortal.value],
        uniqueId ? uniqueId : undefined,
      );
    }
    const regionKey1 = Object.keys(startMiningPoolConfigurations).find(
      (key) =>
        startMiningPoolConfigurations[key]["DESCRIPTION"] === dropdownValue1,
    );
    const regionKey2 = Object.keys(startMiningPoolConfigurations).find(
      (key) =>
        startMiningPoolConfigurations[key]["DESCRIPTION"] === dropdownValue2,
    );

    const server1 =
      regionKey1 && startMiningPoolConfigurations[regionKey1]["SERVER"];
    const port1 =
      regionKey1 && startMiningPoolConfigurations[regionKey1]["PORT"];
    const server2 =
      regionKey2 && startMiningPoolConfigurations[regionKey2]["SERVER"];
    const port2 =
      regionKey2 && startMiningPoolConfigurations[regionKey2]["PORT"];

    const configData = {
      wallet: walletAddressFormat,
      worker: workerName,
      [`server[1]`]: server1,
      [`port[1]`]: port1,
      [`server[2]`]: server2,
      [`port[2]`]: port2,
    };

    const configContent = Object.entries(configData)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    const blob = new Blob([configContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pool.cfg";
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
      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="xs" />}
      <CreateConfigTitle />

      {desktop ? <Spacer variant="xxl" /> : <Spacer variant="sm" />}

      <div className="flex xl-center-items">
        <div className={`flex flex-column ${styles.mainContent}`}>
          <Text variant="heading3" color="white" weight="semiBold">
            Basic details
          </Text>
          {desktop ? <Spacer variant="xs" /> : <Spacer variant="sm" />}
          <Text
            variant={mobile ? "body" : "smallBody"}
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
            disableMobileStyles
          >
            Core ID (Wallet address)
          </Text>
          <InputText
            context="dark"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            className={styles.familyZephirum}
          />
          {!isWalletValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
            >
              Core ID is not valid!
            </Text>
          )}
          {desktop ? <Spacer variant="sm" /> : <Spacer variant="md" />}
          <div className={styles.dropdowns}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingMapChart}
                defaultValue={dropdownValue1}
                className={clsx(styles.boardDropdown)}
                items={dropdownItems}
                onChange={handleDropdownChange1}
                text="Primary pool"
              />
            </div>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingMapChart}
                defaultValue={dropdownValue2}
                className={clsx(styles.boardDropdown)}
                items={dropdownItems}
                onChange={handleDropdownChange2}
                text="Secondary pool"
              />
            </div>
          </div>
          {desktop ? (
            <Spacer variant="xs" />
          ) : (
            <>
              <Spacer variant="lg" /> <Spacer variant="xxs" />
            </>
          )}
          <Link to="/start-mining#pools" className={styles.viewPoolsLink}>
            <Text
              variant={mobile ? "smallBody" : "subheading"}
              color="primary"
              type="value"
              style={{
                textDecoration: mobile ? "underline" : "none",
                textUnderlineOffset: mobile ? "3px" : "0",
              }}
            >
              Mining Pools Overview
            </Text>
          </Link>
          {mobile ? <Spacer variant="xs" /> : <Spacer variant="sm" />}
          <Text variant="heading3" color="white" weight="semiBold">
            Identification details
          </Text>
          <Spacer variant="xxs" />
          <div className={`row  ${styles.inputs}`}>
            <Text
              variant="smallBody"
              color="primary"
              type="value"
              onClick={() => setInputType("plain")}
              className={clsx(styles.linkText, {
                [styles.activeLink]: inputType === "plain",
              })}
            >
              Plain name
            </Text>

            {desktop ? (
              <Spacer direction="hor" variant="sm" />
            ) : (
              <Spacer direction="hor" variant="xxs" />
            )}
            <Text
              variant="smallBody"
              color="primary"
              type="value"
              onClick={() => setInputType("fediverse")}
              className={clsx(styles.linkText, {
                [styles.activeLink]: inputType === "fediverse",
              })}
            >
              Fediverse
            </Text>
          </div>
          {desktop ? <Spacer variant="md" /> : <Spacer variant="sm" />}
          {renderInputs()}
          <Warning
            context="config"
            text={`Click the download button to get the <span class="${styles.boldText}">pool.cfg</span> file. Place it in the same folder as your miner software.`}
          />
          <Spacer variant="sm" />
          <Button
            backgroundColor="var(--ifm-color-primary)"
            textColor="var(--ifm-button-color)"
            weight="medium"
            value="Download"
            context="config"
            onClick={handleDownloadConfig}
          />
          {showError && (
            <Text
              variant="smallBody"
              style={{ marginTop: "1rem", color: "var(--ifm-color-danger)" }}
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
