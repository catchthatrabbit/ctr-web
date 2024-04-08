import { Text } from "@site/src/components/Atoms/Text";
import styles from './styles.module.css';
import clsx from "clsx";

interface IEmpty{
    text?:string
    size?: "small" | "medium" | "large"
}

const Empty = ({text="No Data", size="large"}:IEmpty) => {
    return (<div className={clsx(styles.emptyRoot, styles[size])}>
        <Text className={styles.emptyContent} variant="subheading">
            {text}
        </Text>
    </div>)
}

export default Empty;