import React from "react";
import { Panel } from "../Panel";
import styles from "./styles.module.css";
import clsx from "clsx";

interface ILoadingSkeleton {
    loadingPlaceholder?: React.ReactNode
}

const LoadingSkeleton = ({loadingPlaceholder}:ILoadingSkeleton) => {

    return (
        <Panel>
                {[...Array(6).keys()].map((_,index) => (
                        <div key={index} className={clsx([styles.detailsRow])}>
                            <div className={clsx([styles.detailsRowLoadingSkeleton, styles.detailsRowContentLoadingSkeleton])}>
                                {loadingPlaceholder}
                            </div>
                            <div className={clsx([styles.detailsRowLoadingSkeleton, styles.detailsRowContentLoadingSkeleton])}>
                                {loadingPlaceholder}
                            </div>
                        </div>
                    )
                )}

        </Panel>
    )
}

export default LoadingSkeleton;