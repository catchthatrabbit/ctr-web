import React from "react";
import { Text } from "../../Atoms/Text";
import { Spacer } from "../../Atoms/Spacer";

import styles from "./styles.module.css"; // Ensure this import is correct

interface BlockProps {
  title: string;
  text: string;
  link: string;
  linkText: string;
}

const InfoPanel: React.FC<BlockProps> = ({ title, text, link, linkText }) => {
  return (
    <div className={`flex flex-column ${styles.block}`}>
      <Text
        variant="heading3"
        weight="semiBold"
        color="white"
        style={{ marginBottom: "4px" }}
      >
        {title}
      </Text>
      <Text variant="subheading" color="subheadingColor">
        {text}
      </Text>
      <Spacer variant="xs" />

      <a href={link} className={styles.link}>
        <Text variant="smallBody" color="primary" weight="bold">
          {linkText}
        </Text>
      </a>
    </div>
  );
};

export default InfoPanel;
