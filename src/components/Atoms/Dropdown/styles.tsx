import { StylesConfig } from "react-select";

export const colourStyles:StylesConfig = {
  control: (styles) => ({ ...styles, backgroundColor: 'transparent', color: 'var(--white)', padding:'17px', border: `1px solid rgba(66, 66, 89, 0.5)`}),
  singleValue: (styles) => ({ ...styles, color: 'var(--white)'}),
  input: (styles) => ({ ...styles, color: 'var(--white)'}),
  menu: (styles) => ({...styles, backgroundColor: 'var(--blue-rgb-700)', border: '1px solid var(--gray-700)', color: 'var(--white)'}),
  option: (styles) => ({...styles, backgroundColor: 'transparent', ":hover": {backgroundColor: 'var(--gray-100'}}),
  indicatorSeparator: (styles) => ({ ...styles, backgroundColor: 'transparent'}),
};