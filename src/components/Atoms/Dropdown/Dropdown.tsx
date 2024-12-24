import React from "react";
import Select, { ActionMeta } from "react-select";
import { colourStyles } from "./styles";
import CustomDropdownIndicator from "./DropdownIndicator";
import { Text } from "@site/src/components/Atoms/Text";
import useMediaQueries from "@site/src/hooks/useMediaQueries/useMediaQueries";

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
  const { mobile, tablet, desktop } = useMediaQueries();

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
    </>
  );
};

export default Dropdown;
