import { StylesConfig } from "react-select";

export const colourStyles:StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'transparent', color: 'var(--ifm-color-emphasis-0)', padding:'17px', border: `1px solid rgba(66, 66, 89, 0.5)`}),
  singleValue: (styles) => ({ ...styles, color: 'var(--ifm-color-emphasis-0)'}),
  input: (styles) => ({ ...styles, color: 'var(--ifm-color-emphasis-0)'}),
  menu: (styles) => ({...styles, backgroundColor: 'var(--blue-rgb-700)', border: '1px solid var(--blue-600)'}),
  option: (styles) => ({...styles, backgroundColor: 'transparent', ":hover": {backgroundColor: 'var(--blue-200'}}),
  indicatorSeparator: (styles) => ({ ...styles, backgroundColor: 'transparent'}),
};