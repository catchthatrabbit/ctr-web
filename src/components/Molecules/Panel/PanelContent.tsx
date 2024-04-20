import React from 'react';
import styles from './styles.module.css';
import { useMediaQueries } from '@site/src/hooks/useMediaQueries';
import clsx from 'clsx';

interface IPanelContent{
    children: React.ReactNode
}

const PanelContent = ({children}:IPanelContent) => {

    const {desktop, laptop, mobile, tablet} = useMediaQueries();

    return <div className={clsx({[styles.panelContentDesktop]:desktop || laptop, [styles.panelContentTablet]:tablet, 
        [styles.panelContentMobile]:mobile})}>
        {children}
    </div>
 }

 export default PanelContent;