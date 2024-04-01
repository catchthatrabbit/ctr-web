import styles from "./styles.module.css";
import React from "react";

interface ILocation{
    children?:React.ReactNode
}

const Locations = ({children}:ILocation) => {

    return (
        <div className={styles.locations} >
            <img src="/img/map_bg.png" className={styles.bgImage} />
            <div className={styles.pinWrapper}>
                {children}
            </div>
        </div>
    )
    
}

export default Locations;