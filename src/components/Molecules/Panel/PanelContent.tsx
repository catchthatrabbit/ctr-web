import React from 'react';
import styles from './styles.module.css';

interface IPanelContent{
    children: React.ReactNode
}

const PanelContent = ({children}:IPanelContent) => {

    return <div className={styles.panelContent}>
        {children}
    </div>
 }

 export default PanelContent;