import clsx from "clsx";

import styles from "./styles.module.css";

interface ILoadingPlaceholder {
  className?: string;
}

const LoadingPlaceholder = ({ className }: ILoadingPlaceholder) => {
  return (
    <div className={clsx([styles.placeholder, className])}>
      <div className={styles.animatedBackground} />
    </div>
  );
};

export default LoadingPlaceholder;
