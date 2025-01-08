import React from "react";
import { DropdownIconDown } from "@site/src/icons";

const MobileDropdownIndicator = ({ menuIsOpen }) => {
  return (
    <DropdownIconDown
      style={{
        width: "20px",
        height: "20px",
        color: "pink",
        transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
      }}
    />
  );
};

export default MobileDropdownIndicator;
