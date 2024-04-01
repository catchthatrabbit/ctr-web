import clsx from "clsx";
import styles from "./styles.module.css";
import React from "react";

interface IMapPin{
    mapButton: React.ReactNode
    place: "Eu" | "As" | "Us"
}

const MapPin = ({mapButton, place = "Eu"}:IMapPin) => {
    return(
        <div className={clsx([styles.mapPin, styles[place]])} >
            {mapButton}
        </div>
    )
}

export default MapPin;