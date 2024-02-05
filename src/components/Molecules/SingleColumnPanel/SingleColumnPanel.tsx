import React from 'react';
import { Panel } from "@site/src/components/Molecules/Panel";
import styles from './styles.module.css';
import { Text } from '@site/src/components/Atoms/Text';
import { Spacer } from '../../Atoms/Spacer';

interface ISingleColumnPanel {

    title? :string

    children?: React.ReactNode

    data:Array<{label:string, value:string}>

}

const SingleColumnPanel = ({title, data}:ISingleColumnPanel) => {


    return( <Panel title={title} variant='primaryLabels' titleClassName={styles.singlePanel}>
        {data?.map(item => (
            <div className={styles.singleColumnValue}>
                <Text size='md' variant='values'>
                    {`${item.label}: `}
                </Text>
                <Spacer direction='horizontal' />
                <Text size='md' variant='values'>
                    {item.value}
                </Text>
            </div>
        ))}
    </Panel>
    )

}

export default SingleColumnPanel;