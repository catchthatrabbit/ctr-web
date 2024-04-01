import React from 'react';
import styles from './styles.module.css';
import { Arrow } from '@site/src/icons';

interface IMouseContainer {
    children:React.ReactNode
}

const Mouse = ({children}:IMouseContainer) => {
    return (<div className={styles.mouseContainer}>
        {children}
        <i className={styles.arrow}>
            <Arrow />
        </i>
    </div>
    )
}

export default Mouse;