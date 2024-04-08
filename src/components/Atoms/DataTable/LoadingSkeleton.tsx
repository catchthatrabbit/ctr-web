import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";
import { Text } from "../Text";
import clsx from "clsx";

interface ILoadingSkeleton{
    columns: Array<{value:string, label:string, alignToCenter?:boolean, isPrimary?:boolean,  
    fn?:Dispatch<SetStateAction<unknown>>, 
    href?:string}>
    loadingComp?: React.ReactNode
}

const LoadingSkeleton = ({columns, loadingComp}:ILoadingSkeleton) => {
    return (
        <table className={styles.table} border={0}>
                <thead>
                    <tr>
                        {columns?.map((colItem, colIndex) => (
                            <th key={colIndex} className={clsx(colItem.alignToCenter && styles.tableCenteredText, colIndex === 0 && 
                            styles.tablePaddingLeft)}>
                                <Text variant="heading2" weight="bold">{colItem.label || ""}</Text>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(10).keys()].map((_, indexRow) => <tr key={indexRow}>
                        {columns?.map((_,indexCol) => <td key={indexCol}><div className={styles.loadingComp}>{loadingComp}</div> </td>)}</tr>
                    )}
                </tbody>
            </table>
    )
}

export default LoadingSkeleton;