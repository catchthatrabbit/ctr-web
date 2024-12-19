import clsx from "clsx";
import React from "react";
import { useMediaQueries } from "@site/src/hooks/useMediaQueries";

import styles from "./styles.module.css";

interface ILocation {
  children?: React.ReactNode;
}

const Locations = ({ children }: ILocation) => {
  const { desktop, mobile } = useMediaQueries();
  return (
    <div className={clsx(styles.locations, { [styles.flexEnd]: desktop })}>
      <img
        src="/img/thatRabbitImg.png"
        className={clsx(styles.bgImage, { [styles.bgImageMobile]: mobile })}
        alt="BACKGROUND_IMAGE"
      />
      {/* <div
        className={clsx([
          styles.pinWrapper,
          "grid xl-grid-col--8 lg-grid-col--6 md-grid-col--10 sm-grid-col--10 sm-grid-col--12",
        ])}
      >
        {children}
      </div> */}
    </div>
  );
};

export default Locations;
