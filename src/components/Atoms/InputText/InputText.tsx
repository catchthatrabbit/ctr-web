import { InputHTMLAttributes, forwardRef } from "react";
import styles from './styles.module.css';
import clsx from "clsx";

const InputText = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & {onPressEnter?:() => void}>
(({className, placeholder, onPressEnter,...restProps},ref) => {

    const handleSearchOnPressEnter = (e) => {
        if(e.key === 'Enter' && typeof onPressEnter === "function") {
            onPressEnter();
        }
    }

    return (
        <input ref={ref} {...restProps} 
        onKeyDown={handleSearchOnPressEnter} className={clsx(styles.inputText, className)} placeholder={placeholder} />
    )
})

export default InputText;