import React, { useState } from "react";
import Select, { ActionMeta } from "react-select";
import { colourStyles } from "./styles";
import CustomDropdownIndicator from "./DropdownIndicator";
import MobileDropdownIndicator from "./MobileDropdownIndicator";
import { Text } from "@site/src/components/Atoms/Text";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";
import Modal from "@site/src/components/Atoms/Modal/Modal";
import PaginationRight from "@site/src/icons/PaginationRight";

import styles from "./styles.module.css";
import clsx from "clsx";

interface IDropdown {
  id?: string;
  items: Array<{ value: string; label: string }>;
  onChange?: (
    newValue: { value: string; label: string },
    actionMeta: ActionMeta<unknown>,
  ) => void;
  defaultValue?: string;
  className?: string;
  isLoading?: boolean;
  text?: string;
  context?: string;
}

const Dropdown: React.FC<IDropdown> = ({
  items,
  onChange,
  defaultValue,
  className,
  isLoading = false,
  text,
  context,
}) => {
  const { mobile } = useMediaQueries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    items.find((item) => item.label === defaultValue) || items[0],
  );

  const handleOpenModal = () => {
    if (mobile) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectItem = (item: { value: string; label: string }) => {
    setSelectedItem(item);
    onChange?.(item, {
      action: "select-option",
      option: item,
      name: "select",
    } as ActionMeta<unknown>);
    handleCloseModal();
  };

  const controlStyles = {
    ...colourStyles.control(
      {
        children: null,
        innerRef: null,
        innerProps: {},
        isDisabled: false,
        isFocused: false,
        menuIsOpen: false,
        selectProps: { classNamePrefix: "" },
      } as any,
      {
        isDisabled: false,
        isFocused: false,
        menuIsOpen: false,
      } as any,
    ),
    accentColor: undefined,
  };

  const renderMobileDropdown = () => (
    <>
      <div
        onClick={handleOpenModal}
        className={clsx(styles.dropdownTrigger, className)}
        style={{
          ...(controlStyles as React.CSSProperties),
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px 10px 16px",
          boxSizing: "border-box",
        }}
      >
        {selectedItem.label}
        <MobileDropdownIndicator menuIsOpen={isModalOpen} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ul className={styles.dropdownList}>
          {items.map((item) => (
            <li
              key={item.value}
              className={styles.dropdownListItem}
              onClick={() => handleSelectItem(item)}
              style={{
                ...(controlStyles as React.CSSProperties),
                cursor: "pointer",
                boxShadow: "none",
                border: "none",
                marginBottom: "4px",
                padding: "17px 16px",
              }}
            >
              <span>{item.label}</span>
              {item.value === selectedItem.value ? (
                <Text variant="smallBody" color="subheadingColor" weight="bold">
                  Active
                </Text>
              ) : (
                <div>
                  <Text
                    variant="smallBody"
                    color="primary"
                    weight="bold"
                    style={{ marginRight: "10px" }}
                  >
                    Select
                  </Text>
                  <PaginationRight />
                </div>
              )}
            </li>
          ))}
        </ul>
      </Modal>
    </>
  );

  const renderDesktopDropdown = () => (
    <Select
      isLoading={isLoading}
      isDisabled={isLoading}
      className={className}
      isSearchable={false}
      isClearable={false}
      options={items}
      styles={colourStyles}
      onChange={onChange}
      defaultValue={{ value: defaultValue, label: defaultValue }}
      components={{ DropdownIndicator: CustomDropdownIndicator }}
    />
  );

  return (
    <>
      {text && (
        <div
          className={clsx(styles.dropdownTextContainer, {
            [styles.walletContext]: context === "wallet",
          })}
        >
          <Text
            variant={mobile ? "body" : "subheading"}
            color="subheadingColor"
            style={{
              width:
                context === "mobileWallet"
                  ? "95%"
                  : context === "blocks" || context === "payments"
                    ? "100%"
                    : "50%",
              position: "relative",
              bottom: "8px",
            }}
          >
            {text}
          </Text>
        </div>
      )}
      {mobile ? renderMobileDropdown() : renderDesktopDropdown()}
    </>
  );
};

export default Dropdown;
