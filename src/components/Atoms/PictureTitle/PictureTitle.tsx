import React from "react";
import { Text } from "@site/src/components/Atoms/Text";

import styles from "./styles.module.css";

interface IPictureTitle {
  title: string;
  image: React.ReactNode;
  flexStart?: boolean;
}

const PictureTitle = ({ image, title, flexStart }: IPictureTitle) => {
  return (
    <div
      className={`${styles.pictureTitleRoot} ${flexStart ? styles.flexStart : ""}`}
    >
      <div>{image}</div>
      <Text variant="heading1">{title}</Text>
    </div>
  );
};

export default PictureTitle;
