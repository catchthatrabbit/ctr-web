import React from "react";
import styles from "./styles.module.css";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { Board } from "@site/src/components/Atoms/Board";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { LoadingPlaceholder } from "@site/src/components/Atoms/LoadingPlaceholder";
import { InfoBoxLoadingSkeleton } from "@site/src/components/Atoms/InfoBoxLoadingSkeleton";

interface IMapChart{
  infoItems: Array<{title: string;
  value: TextFormatOutputType}>
  children?: React.ReactNode
  isLoading?:boolean
}

const MapChart = ({ children, infoItems, isLoading }:IMapChart) => {

    return (
      <div className={styles.mapRoot}>
        {isLoading? <InfoBoxLoadingSkeleton loadingPlaceholder={<LoadingPlaceholder />} /> 
          :
          <div className="row">{
            infoItems?.map((info, index) => (
            <Board className="col col--2" isLoading={isLoading} key={index} description={info?.title} value={info?.value.text}
                suffix={info?.value.suffix} prefix={info?.value.prefix} />        
            ))
            }
            </div>

          }
          <Spacer variant="xxxl" />
          <div className="row">
            {children}
          </div>
      </div>
    )
}

export default MapChart;
