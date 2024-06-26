import { Button } from "@site/src/components/Atoms/Button";
import MapCircle from "./MapCircle";
import Link from "@docusaurus/Link";
import clsx from "clsx";

import styles from "./styles.module.css";

interface IMapButton {
  value?: string;
  href?: string;
}

const MapButton = ({ value, href }: IMapButton) => {
  const LinkComp = (children) => <Link to={href}>{children}</Link>;
  const MapButtonComp = ({ className }: { className?: string }) => (
    <Button
      className={clsx([styles.button, styles.wordWrap, className])}
      value={value}
    />
  );

  return (
    <div className={styles.mapButton}>
      <MapCircle />
      {href ? (
        <LinkComp>
          <MapButtonComp />
        </LinkComp>
      ) : (
        <MapButtonComp className={styles.cursorAuto} />
      )}
    </div>
  );
};

export default MapButton;
