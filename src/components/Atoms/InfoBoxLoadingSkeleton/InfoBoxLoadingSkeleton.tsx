import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

interface IInfoBoxLoadingSkeleton{
    loadingPlaceholder?:React.ReactNode
    direction?: "vert" | "hor"
    itemNum?: number
    className?: string
    boardClassNameVert?: string
    boardClassNameHor?: string
}

const InfoBoxLoadingSkeleton = ({loadingPlaceholder, direction="hor", itemNum = 5, className, 
boardClassNameHor, boardClassNameVert}:IInfoBoxLoadingSkeleton) => {
    
    const {desktop,laptop,mobile,tablet} = useMediaQueries()

    return <div className={clsx([className, "flex", {[styles.justifySpaceBetween]:desktop || laptop, 
        [styles.justifyCenter]:tablet || mobile}])}>
                {[...Array(itemNum).keys()].map((_,index) => (
                    <div key={index} className={clsx([styles.borderRadius, {[boardClassNameVert]:(direction === "vert"), 
                    [boardClassNameHor]:(direction === "hor")}, 
                    styles.skeletonBorderItem])}>
                        {loadingPlaceholder}
                    </div>
                ))} 
            </div>
}

export default InfoBoxLoadingSkeleton;