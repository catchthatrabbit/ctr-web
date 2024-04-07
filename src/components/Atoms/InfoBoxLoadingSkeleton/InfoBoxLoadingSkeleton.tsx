import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface IInfoBoxLoadingSkeleton{
    loadingPlaceholder?:React.ReactNode
    direction?: "row" | "col"
    itemNum?: number
    className?: string
}

const InfoBoxLoadingSkeleton = ({loadingPlaceholder, direction="col", itemNum = 5, className}:IInfoBoxLoadingSkeleton) => {
    

    return <div className={clsx([className, "grid", `grid-${direction}`, `grid-${direction}--${itemNum}`])}>
                {[...Array(itemNum).keys()].map((_,index) => (
                    <div key={index} className={clsx([styles.removePadding, styles.borderRadius, styles.skeletonBorderItem])}>
                        {loadingPlaceholder}
                    </div>
                ))} 
            </div>
}

export default InfoBoxLoadingSkeleton;