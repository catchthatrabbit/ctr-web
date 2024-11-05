import React from "react";
import { components } from "react-select";
import { DropdownIconDown } from "@site/src/icons";

const CustomDropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <DropdownIconDown
        style={{
          width: "20px",
          height: "20px",
          color: "pink",
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      />
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
