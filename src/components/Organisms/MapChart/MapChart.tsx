import React from "react";
import styles from "./styles.module.css";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { Board } from "@site/src/components/Atoms/Board";
import { Spacer } from "@site/src/components/Atoms/Spacer";

interface IMapChart{
  infoItems: Array<{title: string;
  value: TextFormatOutputType}>
  children?: React.ReactNode
}

const MapChart = ({ children, infoItems }:IMapChart) => {

    return (
      <div className={styles.mapRoot}>
        <div className="row">
        {infoItems?.map((info, index) => (
        <Board className="col col--2" key={index} description={info?.title} value={info?.value.text}
            suffix={info?.value.suffix} prefix={info?.value.prefix} />        
        ))}
        <Spacer variant="xxxl" />
        </div>
        <div className="row">
          {children}
        </div>
      </div>
    )
}

export default MapChart;
