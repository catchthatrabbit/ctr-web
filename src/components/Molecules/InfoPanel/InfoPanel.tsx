import React from 'react';
import { Text } from '../../Atoms/Text';
import { Spacer } from '../../Atoms/Spacer';
import useMediaQueries from '@site/src/hooks/useMediaQueries/useMediaQueries';

import styles from './styles.module.css';

interface BlockProps {
  title: string;
  text: string;
  link: string;
  linkText: string;
}

const InfoPanel: React.FC<BlockProps> = ({ title, text, link, linkText }) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (link.startsWith('#')) {
      event.preventDefault();
      const targetElement = document.getElementById(link.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const { mobile, tablet, desktop } = useMediaQueries();

  return (
    <div
      className={`flex flex-column ${styles.block} ${mobile ? styles.mobileBlock : ''}`}
    >
      <Text
        variant="heading3"
        weight="semiBold"
        color="white"
        style={{ marginBottom: '0.5em' }}
      >
        {title}
      </Text>
      <Text variant="body" color="subheadingColor" style={{ lineHeight: '1.3em' }}>
        {text}
      </Text>
      <Spacer variant="xs" />

      <a href={link} className={styles.link} onClick={handleLinkClick}>
        {linkText}
      </a>
    </div>
  );
};

export default InfoPanel;
