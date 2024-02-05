import React from 'react';
import { Text } from '@site/src/components/Atoms/Text';
import styles from './styles.module.css';
import { Spacer } from '../Spacer';

interface IPictureTitle{
    title:string
    image:React.ReactNode
}

const PictureTitle = ({image, title}:IPictureTitle) => {

    return <div className={styles.pictureTitleRoot}>
        <div>{image}</div>
        <Spacer direction='horizontal' />
        <Text size='xl'>
            {title}
        </Text>
    </div>
}

export default PictureTitle;