import React from 'react';
import styles from './styles.module.css';
import ScrollIndicator from './ScrollIndicator';

interface IMouse {
}

const Mouse = ({}:IMouse) => {
    return (<div className={styles.mouse}>
        <ScrollIndicator />
    </div>)
}

export default Mouse;