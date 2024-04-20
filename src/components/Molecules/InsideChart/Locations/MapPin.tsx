import clsx from "clsx";
import styles from "./styles.module.css";
import React from "react";

interface IMapPin{
    mapButton: React.ReactNode
    className?: string
}

const MapPin = ({mapButton, className}:IMapPin) => {
    return(
        <div className={clsx([styles.mapPin, className])} >
            {mapButton}
        </div>
    )
}

export default MapPin;