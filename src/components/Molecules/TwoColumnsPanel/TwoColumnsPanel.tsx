import { Text } from '@site/src/components/Atoms/Text';
import styles from './styles.module.css';
import clsx from 'clsx';
import { Spacer } from '../../Atoms/Spacer';
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
                        <Text size='sm' className={clsx(styles.detailsTableCaption)}>{item.title}</Text>
                        <Text variant='values' className={clsx(styles.detailsTableValue)}>{item.value?.toString() || ''}</Text>
                    </div>
                ))}
            </Panel>

}

export default TwoColumnsPanel;