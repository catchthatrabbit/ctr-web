import React, { useState, useEffect } from "react";
import { TextFormatOutputType } from "@site/src/utils/textFormat";
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { ConfiguredInfoBox } from "../../Molecules/ConfiguredInfoBox";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface IMapChart {
  infoItems: Array<{ title: string; value: TextFormatOutputType }>;
  children?: React.ReactNode;
  isLoading?: boolean;
}

const horClassName =
  "xl-flex-col--2 lg-flex-col--2 md-flex-col--6 sm-flex-col--12 xs-flex-col--12";

const MapChart = ({ children, infoItems, isLoading }: IMapChart) => {
  const { mobile, tablet } = useMediaQueries();

  return (
    <div className={styles.mapRoot}>
      {(mobile || tablet) && (
        <>
          <ConfiguredInfoBox infoItems={infoItems} isLoading={isLoading} />
        </>
      )}
      <div
        className={`${styles.dashboardContainer} ${mobile && styles.mobileDashboard}`}
      >
        {children}
      </div>
    </div>
  );
};

export default MapChart;
