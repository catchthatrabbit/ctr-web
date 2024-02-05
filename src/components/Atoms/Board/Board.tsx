import { Text } from '@site/src/components/Atoms/Text';
import styles from './styles.module.css';

interface IBoard {
    value:string
    description:string
    prefix?:string
    suffix?:string
}

const Board = ({description, value, suffix, prefix}:IBoard) => {

    return (
        <div className={styles.boardContainer}>
            <div className={styles.boardItem}>
                <Text>{prefix}</Text>
                <Text size='md' thickness='bold'>
                    {value || '0'}
                </Text>
                <Text size='md' thickness='bold'>{suffix}</Text>
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