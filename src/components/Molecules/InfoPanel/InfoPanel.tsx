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
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (link.startsWith("#")) {
      event.preventDefault();
      const targetElement = document.getElementById(link.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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

      <a href={link} className={styles.link} onClick={handleLinkClick}>
        <Text variant="smallBody" color="primary" weight="bold">
          {linkText}
        </Text>
      </a>
    </div>
  );
};

export default InfoPanel;
