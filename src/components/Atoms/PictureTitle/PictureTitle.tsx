import React from "react";
import { Text } from "@site/src/components/Atoms/Text";

import styles from "./styles.module.css";

interface IPictureTitle {
  title: string;
  image: React.ReactNode;
  flexStart?: boolean;
  secondaryText?: string;
}

const PictureTitle = ({
  image,
  title,
  flexStart,
  secondaryText,
}: IPictureTitle) => {
  return (
    <div
      className={`${styles.pictureTitleRoot} ${flexStart ? styles.flexStart : styles.flexColumn}`}
    >
      <div className={styles.pictureImg}>{image}</div>
      <Text
        type="exo"
        size="pictureTitle"
        weight="extraBold"
        lineHeight="mediumLineHeight"
        color="white"
        letterSpacing="letterSpacing"
      >
        {title}
      </Text>
      {secondaryText && (
        <Text
          type="regular"
          size="medium"
          weight="regular"
          lineHeight="normalLineHeight"
          color="subheadingColor"
          letterSpacing="letterSpacing"
          style={{ marginTop: "8px" }}
        >
          {secondaryText}
        </Text>
      )}
    </div>
  );
};

export default PictureTitle;
