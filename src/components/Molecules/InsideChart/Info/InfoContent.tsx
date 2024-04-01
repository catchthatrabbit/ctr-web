import React from "react";
import styles from "./styles.module.css";

interface IInfoContent{
    children:React.ReactNode;
}

const InfoContent = ({children}:IInfoContent) => {
    return <div className={styles.info}>
        {children}
    </div>
}

export default InfoContent;