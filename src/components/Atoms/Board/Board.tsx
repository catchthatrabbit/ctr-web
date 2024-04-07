import { Text } from '@site/src/components/Atoms/Text';
import styles from './styles.module.css';
import clsx from 'clsx';
import React from 'react';

interface IBoard {
    value:string
    description:string
    prefix?:string
    suffix?:string
    className?:string
    loaderComp?:React.ReactNode
    isLoading?:boolean
}

const Board = ({description, value, suffix, prefix, className, loaderComp = <Text variant="subheading">&nbsp;--&nbsp;</Text>, isLoading = false}:IBoard) => {

    return (
        <div className={clsx([styles.boardContainer, className])}>
            <div className={styles.boardItem}>
                <Text>{prefix}</Text>
                {isLoading? loaderComp : 
                    <Text variant='subheading' weight='bold'>
                        {value || '0'}
                    </Text>
                }
                <Text variant='subheading' weight='bold'>{suffix}</Text>
            </div>
            <div className={styles.boardItem}>
                <Text>
                    {description || ''}
                </Text>
            </div>
        </div>
    )
}

export default Board;