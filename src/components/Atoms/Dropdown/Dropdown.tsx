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

const Dropdown = ({
  items,
  onChange,
  defaultValue,
  className,
  isLoading,
  text,
  context,
}: IDropdown) => {
  const { mobile } = useMediaQueries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    items.find((item) => item.value === defaultValue) || items[0],
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
    onChange?.(item, { action: "select-option" });
    handleCloseModal();
  };
  const controlStyles = colourStyles.control({});

  return (
    <>
      {text && (
        <Text
          variant={mobile ? "smallBody" : "subheading"}
          color="subheadingColor"
          style={{
            width:
              context === "mobileWallet"
                ? "95%"
                : context === "blocks" || context === "payments"
                  ? "100%"
                  : "52%",
            marginBottom: "8px",
          }}
        >
          {text}
        </Text>
      )}
      {mobile ? (
        <>
          <div
            onClick={handleOpenModal}
            className={className}
            style={{
              ...controlStyles,
              display: "flex",

              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px 10px 16px",
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
                    ...controlStyles,
                    cursor: "pointer",
                    boxShadow: "none",
                    border: "none",
                    marginBottom: "4px",
                    padding: "17px 16px",
                  }}
                >
                  <span>{item.label}</span>
                  {item.value === selectedItem.value ? (
                    <Text
                      variant="smallBody"
                      color="subheadingColor"
                      weight="bold"
                    >
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
      ) : (
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
      )}
    </>
  );
};

export default Dropdown;
