import React from "react";
import { Text } from "@site/src/components/Atoms/Text";

import styles from "./styles.module.css";

interface IPictureTitle {
  title: string;
  image: React.ReactNode;
  flexStart?: boolean;
  secondaryText?: string;
  secondaryTextStyle?: React.CSSProperties;
}

const PictureTitle = ({
  image,
  title,
  flexStart,
  secondaryText,
  secondaryTextStyle,
}: IPictureTitle) => {
  return (
    <div
      className={`${styles.pictureTitleRoot} ${flexStart ? styles.flexStart : styles.flexColumn}`}
    >
      <div className={styles.pictureImg}>{image}</div>
      <Text
        type="regular"
        size="pictureTitle"
        weight="semiBold"
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
          style={{ marginTop: "8px", ...secondaryTextStyle }}
        >
          {secondaryText}
        </Text>
      )}
    </div>
  );
};

export default PictureTitle;
