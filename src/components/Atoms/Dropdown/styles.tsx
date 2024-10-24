import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "rgba(32, 33, 33, 1)",
    color: "var(--white)",
    padding: "10px",
    border: "1px solid rgba(128, 128, 128, 1)",
    borderRadius: "8px",
    cursor: "context-menu",
    boxShadow: "0 0 5px rgba(128, 128, 128, 0.5)",
    ":hover": { border: "1px solid rgba(128, 128, 128, 1)" },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "var(--white)",
    fontFamily: "var(--regular-font-family )",
  }),
  input: (styles) => ({ ...styles, color: "var(--white)" }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "rgba(32, 33, 33, 1)",
    border: "1px solid rgba(128, 128, 128, 1)",
    color: "var(--white)",
    borderRadius: "8px",
    marginTop: "4px",
    zIndex: 100,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    ":hover": { backgroundColor: "rgba(54, 54, 54, 1)" },
    cursor: "pointer",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
};
