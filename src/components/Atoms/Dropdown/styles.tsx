import { StylesConfig } from "react-select";

export const colourStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "var(--white)",
    padding: "10px",
    border: "1px solid rgba(66, 66, 89, 0.5)",
    cursor: "context-menu",
  }),
  singleValue: (styles) => ({ ...styles, color: "var(--white)" }),
  input: (styles) => ({ ...styles, color: "var(--white)" }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "var(--ocean-blue)",
    border: "1px solid var(--gray-700)",
    color: "var(--white)",
    zIndex: 100,
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    ":hover": { backgroundColor: "var(--gray-100" },
    cursor: "pointer",
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
  }),
};
