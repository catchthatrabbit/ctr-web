import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { CreateConfigTitle } from "@site/src/components/Molecules/PictureTitles";
import { InputText } from "@site/src/components/Atoms/InputText";
import { Dropdown } from "../../Atoms/Dropdown";
import { Text } from "@site/src/components/Atoms/Text";
import { Header } from "../../Templates/Header";
import Button from "@site/src/components/Atoms/Button/Button";

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
  const [inputType, setInputType] = useState("plain");
  const [plainMinerName, setPlainMinerName] = useState("");
  const [fediverseMinerName, setFediverseMinerName] = useState("");
  const [typePortal, setTypePortal] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState(regionLabel);
  const [dropdownValue2, setDropdownValue2] = useState(regionLabel);

  const formatWalletAddress = (value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleWalletAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const formattedValue = formatWalletAddress(
      event.target.value.replace(/\s+/g, ""),
    );
    setWalletAddress(formattedValue);
  };

  const handlePlainMinerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPlainMinerName(event.target.value);
  };

  const handleFediverseMinerNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFediverseMinerName(event.target.value);
  };

  const handleTypePortalChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTypePortal(event.target.value);
  };

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
        <InputText
          context="dark"
          value={plainMinerName}
          onChange={handlePlainMinerNameChange}
          placeholder="Miner name"
        />
      );
    } else if (inputType === "fediverse") {
      return (
        <>
          <InputText
            context="dark"
            value={fediverseMinerName}
            onChange={handleFediverseMinerNameChange}
            placeholder="Miner name"
          />
          <Spacer variant="sm" />
          <InputText
            context="dark"
            value={typePortal}
            onChange={handleTypePortalChange}
            placeholder="Type portal"
          />
          <Spacer variant="sm" />
          <InputText
            context="dark"
            value={uniqueId}
            onChange={handleUniqueIdChange}
            placeholder="Unique ID"
          />
        </>
      );
    }
  };

  const handleDownloadConfig = () => {
    let walletAddressFormat = walletAddress.replace(/\s+/g, "").toLowerCase();
    let workerName = "";
    if (inputType === "plain") {
      workerName = plainMinerName;
    } else if (inputType === "fediverse") {
      const { href, caption } = convertWorkerName(
        `_${fediverseMinerName}${typePortal}${uniqueId ? `-${uniqueId}` : ""}`,
      );
      workerName = caption;
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
          <Spacer variant="xs" />
          <div className={styles.dropdowns}>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingPaymentState}
                defaultValue={regionLabel}
                className={clsx(styles.boardDropdown)}
                items={dropdownItems}
                onChange={handleDropdownChange1}
                text="Mining pool"
              />
            </div>
            <div className={styles.dropdownContainer}>
              <Dropdown
                isLoading={isLoadingPaymentState}
                defaultValue={regionLabel}
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
          <Spacer variant="md" />
          <Button
            backgroundColor="#062A1C"
            textColor="#16C784"
            value="Download Config"
            onClick={handleDownloadConfig}
          />
        </div>
      </div>
    </>
  );
};

export default CreateConfig;
