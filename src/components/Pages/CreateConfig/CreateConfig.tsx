import React, { useState } from "react";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { CreateConfigTitle } from "@site/src/components/Molecules/PictureTitles";
import { InputText } from "@site/src/components/Atoms/InputText";
import { Dropdown } from "../../Atoms/Dropdown";
import { Text } from "@site/src/components/Atoms/Text";
import { Header } from "../../Templates/Header";
import Button from "@site/src/components/Atoms/Button/Button"; // Ensure this import is correct

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
  } = useControls({ defaultRegion, onSetWalletAddress, onChangeRegion });

  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("plain");

  const formatWalletAddress = (value: string) => {
    return value.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatWalletAddress(
      event.target.value.replace(/\s+/g, ""),
    );
    setInputValue(formattedValue);
  };

  const renderInputs = () => {
    if (inputType === "plain") {
      return (
        <InputText
          context="dark"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter wallet address..."
        />
      );
    } else if (inputType === "fediverse") {
      return (
        <>
          <InputText
            context="dark"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter first input..."
          />
          <Spacer variant="sm" />
          <InputText
            context="dark"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter second input..."
          />
          <Spacer variant="sm" />
          <InputText
            context="dark"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter third input..."
          />
        </>
      );
    }
  };

  return (
    <>
      <Spacer variant="xxl" />
      <CreateConfigTitle />
      <Spacer variant="md" />
      <Spacer variant="sm" />

      <div className="flex xl-center-items">
        <div className={`flex flex-column ${styles.mainContent}`}>
          <Text variant="heading3" color="white" weight="semiBold">
            Miner details
          </Text>
          <Spacer variant="xs" />
          <InputText
            context="dark"
            value={inputValue}
            onChange={handleInputChange}
            text="Corepass wallet address"
          />
          <div className="row">
            <Dropdown
              isLoading={isLoadingPaymentState}
              defaultValue={regionLabel}
              className={clsx(styles.boardDropdown, {
                [styles.smallWidth]: true,
              })}
              items={dropdownItems}
              onChange={handleChangeRegion}
            />

            <Dropdown
              isLoading={isLoadingPaymentState}
              defaultValue={regionLabel}
              className={clsx(styles.boardDropdown, {
                [styles.smallWidth]: true,
              })}
              items={dropdownItems}
              onChange={handleChangeRegion}
            />
          </div>
          <Spacer variant="md" />
          <div className="row">
            <Button
              backgroundColor="#062A1C"
              textColor="#16C784"
              value="Plain"
              onClick={() => setInputType("plain")}
            />
            <Spacer direction="hor" variant="sm" />
            <Button
              backgroundColor="#062A1C"
              textColor="#16C784"
              value="Fediverse"
              onClick={() => setInputType("fediverse")}
            />
          </div>
          <Spacer variant="md" />
          {renderInputs()}
        </div>
      </div>
    </>
  );
};

export default CreateConfig;
