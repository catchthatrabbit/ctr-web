import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';

import styles from './styles.module.css';

interface IMessage {
  text?: string;
  type?: 'warning' | 'danger' | 'info' | 'success' | 'secondary' | 'primary';
  onClickCloseBtn?: () => void;
}

const Message = ({
  text = '',
  type = 'primary',
  onClickCloseBtn,
}: IMessage) => {
  return (
    <div className={`alert alert--${type}`} role="alert">
      <button
        aria-label="Close"
        className="clean-btn close"
        type="button"
        onClick={onClickCloseBtn}
      >
        <span aria-hidden="true">&times;</span>
      </button>
      <Text className={styles.text}>{text}</Text>
    </div>
  );
};

export default Message;
