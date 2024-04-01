import React from 'react';
import { Panel } from "@site/src/components/Molecules/Panel";
import styles from './styles.module.css';
import { Text } from '@site/src/components/Atoms/Text';

interface ISingleColumnPanel {

    title? :string

    children?: React.ReactNode

    data:Array<{label:string, value:string}>

}

const SingleColumnPanel = ({title, data}:ISingleColumnPanel) => {


    return( <Panel title={title} variant='heading2' color='primary' titleClassName={styles.singlePanel}>
        {data?.map(item => (
            <div className={styles.singleColumnValue}>
                <Text type='value' variant='subheading'>
                    {`${item.label}:`}
                </Text>
                &nbsp;&nbsp;
                <Text type='value' variant='subheading'>
                    {item.value}
                </Text>
            </div>
        ))}
    </Panel>
    )

}

export default SingleColumnPanel;