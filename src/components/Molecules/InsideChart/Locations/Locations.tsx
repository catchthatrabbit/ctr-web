import clsx from "clsx";
import styles from "./styles.module.css";
import React from "react";

interface ILocation{
    children?:React.ReactNode
}

const Locations = ({children}:ILocation) => {

    return (
        <div className={styles.locations} >
            <img src="/img/map_bg.png" className={styles.bgImage} />
            <div className={clsx([styles.pinWrapper, "grid xl-grid-col--8 lg-grid-col--6 md-grid-col--10 sm-grid-col--10 sm-grid-col--12"])}>
                {children}
            </div>
        </div>
    )
    
}

export default Locations;