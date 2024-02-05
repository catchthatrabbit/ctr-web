import Select, { ActionMeta } from 'react-select';
import {colourStyles} from './styles';

interface IDropdown {
    id?: string
    items: Array<{value:string, label:string}>
    onChange?: (newValue: {value:string, label:string}, actionMeta: ActionMeta<unknown>) => void
    defaultValue?: string
    className?:string
}
  

const Dropdown = ({items, onChange, defaultValue, className}:IDropdown) => {

    return (
        <Select
            className={className}
            isSearchable={false}
            isClearable={false}
            options={items}
            styles={colourStyles}
            onChange={onChange}
            defaultValue={{value:defaultValue, label:defaultValue}}
        />
    )

}

export default Dropdown;