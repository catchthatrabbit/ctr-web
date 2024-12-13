import React, { useState, useEffect } from "react";
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

import clsx from "clsx";

import styles from "./styles.module.css";

const CreateConfig = ({
  defaultRegion,
  onSetWalletAddress,
  onChangeRegion,
}: IPayments) => {
  const {
    handleChangeRegion,
    handleSearch,
    isLoadingPaymentState,
    dropdownItems,
    regionLabel,
    convertWorkerName,
    startMiningPoolConfigurations,
  } = useControls({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletValid, setIsWalletValid] = useState(true);
  const [inputType, setInputType] = useState("plain");
  const [minerName, setMinerName] = useState({ value: "", isValid: true }); // Combined state for miner names
  const [typePortal, setTypePortal] = useState({ value: "", isValid: true });
  const [uniqueId, setUniqueId] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState(regionLabel);
  const [dropdownValue2, setDropdownValue2] = useState(dropdownItems[1].label);
  const [showError, setShowError] = useState(false);

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
  // Examples of Valid Domains
  // example.com
  // subdomain.example.com
  // example.co.uk
  // my-site.example.org
  // another.subdomain.example.io

  const handleUniqueIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniqueId(event.target.value);
  };

  const handleDropdownChange1 = (selectedOption: { label: string }) => {
    console.log(selectedOption);
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
            placeholder="Miner name"
          />
          {!minerName.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "4px", color: "#E54E4E" }}
            >
              Plain name is not valid. Only letters, numbers, underscores, and
              hyphens are allowed.
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
            Username
          </Text>
          <InputText
            context="dark"
            value={minerName.value}
            onChange={handleMinerNameChange}
            placeholder="Miner name"
          />
          {!minerName.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "4px", color: "#E54E4E" }}
            >
              Username is not valid. Only letters and numbers are allowed.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Portal
          </Text>
          <InputText
            context="dark"
            value={typePortal.value}
            onChange={handleTypePortalChange}
            placeholder="Type portal"
          />
          {!typePortal.isValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "4px", color: "#E54E4E" }}
            >
              Portal is not valid. Please enter a valid domain.
            </Text>
          )}
          <Spacer variant="sm" />
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Index (optional)
          </Text>
          <InputText
            context="dark"
            value={uniqueId}
            onChange={handleUniqueIdChange}
            placeholder="Unique ID"
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
      return; // Prevent config generation if any field is empty or invalid
    }
    setShowError(false);
    let walletAddressFormat = walletAddress.replace(/\s+/g, "").toLowerCase();
    let workerName = "";
    if (inputType === "plain") {
      workerName = minerName.value;
    } else if (inputType === "fediverse") {
      const { href, caption } = convertWorkerName(
        `_${minerName.value}${typePortal.value}${uniqueId ? `-${uniqueId}` : ""}`,
      );
      workerName = caption.replace(/\./g, "");
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
    a.download = "config.cfg";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Spacer variant="xxl" />
      <CreateConfigTitle />

      <Spacer variant="xxl" />

      <div className="flex xl-center-items">
        <div className={`flex flex-column ${styles.mainContent}`}>
          <Text variant="heading3" color="white" weight="semiBold">
            Miner details
          </Text>
          <Spacer variant="xs" />
          <Text
            variant="smallBody"
            color="subheadingColor"
            style={{ marginBottom: "8px" }}
          >
            Corepass wallet address
          </Text>
          <InputText
            context="dark"
            value={walletAddress}
            onChange={handleWalletAddressChange}
          />
          {!isWalletValid && (
            <Text
              variant="smallBody"
              style={{ marginTop: "4px", color: "#E54E4E" }}
            >
              Wallet address is not valid
            </Text>
          )}
          <Spacer variant="xs" />
          <div className={styles.dropdowns}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingPaymentState}
                defaultValue={dropdownValue1}
                className={clsx(styles.boardDropdown)}
                items={dropdownItems}
                onChange={handleDropdownChange1}
                text="Mining pool"
              />
            </div>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingPaymentState}
                defaultValue={dropdownValue2}
                className={clsx(styles.boardDropdown)}
                items={dropdownItems}
                onChange={handleDropdownChange2}
                text="Mining pool"
              />
            </div>
          </div>
          <Spacer variant="xs" />
          <Link to="/start-mining#pools" className={styles.viewPoolsLink}>
            <Text variant="subheading" color="primary" type="value">
              View pools
            </Text>
          </Link>
          <Spacer variant="sm" />
          <Text variant="heading3" color="white" weight="semiBold">
            Miner name
          </Text>
          <Spacer variant="sm" />
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
              Plain
            </Text>

            <Spacer direction="hor" variant="sm" />
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
          <Spacer variant="md" />
          {renderInputs()}
          <Warning
            context="config"
            text={`By clicking download button, the file pool.cfg will be downloaded, <span class="${styles.boldText}"> which needs to be placed in the same folder where miner software resides. </span>`}
          />
          <Spacer variant="md" />
          <Button
            backgroundColor="#16C784"
            textColor="#020202"
            weight="medium"
            value="Generate & Download"
            context="config"
            onClick={handleDownloadConfig}
          />
          {showError && (
            <Text
              variant="smallBody"
              style={{ marginTop: "4px", color: "#E54E4E" }}
            >
              Please fill out all required fields correctly.
            </Text>
          )}
          <Spacer variant="xxxl" />
        </div>
      </div>
    </>
  );
};

export default CreateConfig;
