import React from "react";
import styles from "./styles.module.css";

interface IInfo{
    children:React.ReactNode;
}

const Info = ({children}:IInfo) => {
    return <div className={styles.info}>
        {children}
    </div>
}

export default Info;