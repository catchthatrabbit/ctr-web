import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import clsx from 'clsx';

import styles from './styles.module.css';

interface IEmpty {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}

const Empty = ({ text = 'No Data', size = 'large' }: IEmpty) => {
  return (
    <div className={clsx(styles.emptyRoot, styles[size])}>
      <Text
        className={styles.emptyContent}
        variant="subheading"
        lineHeight="normalLineHeight"
        letterSpacing="letterSpacing"
      >
        {text}
      </Text>
    </div>
  );
};

export default Empty;
