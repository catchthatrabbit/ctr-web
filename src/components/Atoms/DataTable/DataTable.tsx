import { ReactNode, Dispatch, SetStateAction } from "react";
import './styles.css';
import styles from './styles.module.css';
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import Link from "@docusaurus/Link";

export interface IDataTable {
    columns: Array<{value:string, label:string, alignToCenter?:boolean, isPrimary?:boolean,  fn?:Dispatch<SetStateAction<unknown>>, 
        href?:string}>
    data: Array<{[key in string]:ReactNode}>
}

const DataTable = ({data, columns}:IDataTable) => {

    return (
        <table className={styles.table} border={0} >
            <thead>
                <tr>
                    {columns?.map((colItem, colIndex) => (
                        <th key={colIndex} className={clsx(colItem.alignToCenter && styles.tableCenteredText, colIndex === 0 && 
                        styles.tablePaddingLeft)}>
                            <Text variant="normal" size="lg">{colItem.label}</Text>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.map((rowItem, rowIndex) => (
                    <tr key={rowIndex} className={styles.tableRow}>
                        {columns?.map((colItem, colIndex) => (
                            <td key={colIndex} className={clsx(colItem.alignToCenter && styles.tableCenteredText, 
                            colIndex === 0 && styles.tablePaddingLeft)}>
                                {colItem.isPrimary?
                                    colItem.href? 
                                    <Link to={`${colItem.href}/${rowItem[colItem.value]}`}>
                                        <Text variant="primary" size="sm">
                                            {rowItem[`${colItem.value}_summarized`]?.toString()}
                                        </Text>
                                    </Link>
                                    : 
                                    <Text variant="primary" size="sm" onClick={() => colItem?.fn(rowItem[colItem.value]?.toString())}>
                                        {rowItem[`${colItem.value}_summarized`]?.toString()}
                                    </Text>
                                    :
                                    <Text size="sm" variant="values">{rowItem[colItem.value]?.toString()}</Text>
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )


}

export default DataTable;