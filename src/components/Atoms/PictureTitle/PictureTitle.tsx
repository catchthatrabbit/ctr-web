import React from "react";
import { Text } from "@site/src/components/Atoms/Text";

import styles from "./styles.module.css";

interface IPictureTitle {
  title: string;
  titleStyles?: React.CSSProperties;
  image: React.ReactNode;
  flexStart?: boolean;
  secondaryText?: string;
  secondaryTextStyle?: React.CSSProperties;
}

const PictureTitle = ({
  image,
  title,
  titleStyles,
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
        type="exo"
        size="pictureTitle"
        weight="extraBold"
        lineHeight="mediumLineHeight"
        color="white"
        letterSpacing="letterSpacing"
        style={{ ...titleStyles }}
      >
        {title}
      </Text>
      {secondaryText && (
        <Text
          variant="subheading1"
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
