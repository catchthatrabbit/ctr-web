import React from 'react';
import styles from './styles.module.css';

interface ILegal {
  title: string;
  message: string;
}

const Legal = ({ title, message }: ILegal) => {
  return (
    <div className={styles.legalRoot}>
      <div className={styles.legalContent}>
        <div className={styles.legalTitle}>{title}</div>
        <div className={styles.legalMessage}>{message}</div>
      </div>
    </div>
  );
};

export default Legal;
