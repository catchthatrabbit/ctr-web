import React from "react";
import TabsDocusaurus from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import styles from './styles.module.css'

export interface ITabs {
    items:Array<{label:string, value:string, tabContent: React.ReactNode}>
}

export const Tabs = ({items}:ITabs) => {

    return <TabsDocusaurus className={styles.tabs} >
            {items?.map((item, index) => (
                <TabItem key={index} value={item.value} label={item.label}>
                    {item.tabContent}
                </TabItem>
            ))}
        </TabsDocusaurus>

}