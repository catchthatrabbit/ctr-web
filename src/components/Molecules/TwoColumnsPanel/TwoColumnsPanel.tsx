import { Text } from '@site/src/components/Atoms/Text';
import styles from './styles.module.css';
import clsx from 'clsx';
import React from 'react';
import { Panel } from '@site/src/components/Molecules/Panel';

interface IDetailsTable {
    data:{
        title:string,
        data: {
              key: string,
              title: string,
              value: number | string,
            }[]
        
    }
}

const TwoColumnsPanel = ({data}:IDetailsTable) => {

    return <Panel title={data.title}>
                {data?.data?.map((item, index) => (
                    <div key={index} className={styles.detailsRow}>
                        <Text weight='normal' componentType='div' variant='body' className={clsx(styles.detailsTableCaption)}>{item.title}</Text>
                        <Text weight='normal' componentType='div' variant='smallBody' type='value' className={clsx(styles.detailsTableValue)}>{item.value?.toString() || ''}</Text>
                    </div>
                ))}
            </Panel>

}

export default TwoColumnsPanel;