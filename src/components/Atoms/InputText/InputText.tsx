import {HTMLInputTypeAttribute, InputHTMLAttributes, forwardRef } from "react";
import styles from './styles.module.css';
import { InputProps } from "react-select";
import clsx from "clsx";

const InputText = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & {onPressEnter?:() => void}>
(({className, placeholder,...restProps},ref) => {

    const handleSearchOnPressEnter = (e) => {
        if(e.key === 'Enter' && typeof  restProps.onPressEnter === "function") {
            restProps.onPressEnter();
        }
    }

    return (
        <input ref={ref} {...restProps} 
        onKeyDown={handleSearchOnPressEnter} className={clsx(styles.inputText, className)} placeholder={placeholder} />
    )
})

export default InputText;