import React from 'react';
import { Text } from '../../Atoms/Text';
import { Spacer } from '../../Atoms/Spacer';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

import styles from './styles.module.css';

interface BlockProps {
  title: string;
  text: string;
  link?: string; // Make link optional
  linkText: string;
  onClick?: () => void; // Optional onClick handler
}

const InfoPanel: React.FC<BlockProps> = ({
  title,
  text,
  link,
  linkText,
  onClick,
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (link?.startsWith('#')) {
      event.preventDefault();
      const targetElement = document.getElementById(link.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const { mobile } = useMediaQueries();

  return (
    <div
      className={`flex flex-column ${styles.block} ${mobile ? styles.mobileBlock : ''}`}
      onClick={onClick} // Add onClick to the container
      style={onClick ? { cursor: 'pointer' } : undefined} // Add pointer cursor if onClick is provided
    >
      <Text
        variant="heading3"
        weight="semiBold"
        color="white"
        style={{ marginBottom: '0.5em' }}
      >
        {title}
      </Text>
      <Text
        variant="body"
        color="subheadingColor"
        style={{ lineHeight: '1.3em' }}
      >
        {text}
      </Text>
      <Spacer variant="xs" />

      {link ? ( // Conditionally render the link
        <a href={link} className={styles.link} onClick={handleLinkClick}>
          <Text variant="smallBody" color="primary" weight="bold">
            {linkText}
          </Text>
        </a>
      ) : (
        <div className={styles.link}>
          <Text variant="smallBody" color="primary" weight="bold">
            {linkText}
          </Text>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;
