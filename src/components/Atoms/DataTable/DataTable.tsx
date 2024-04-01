import { ReactNode, Dispatch, SetStateAction } from "react";
import './styles.css';
import styles from './styles.module.css';
import { Text } from "@site/src/components/Atoms/Text";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { checkArrayObjectIsEmpty } from "@site/src/utils/checkIsEmpty";

export interface IDataTable {
    columns: Array<{value:string, label:string, alignToCenter?:boolean, isPrimary?:boolean,  fn?:Dispatch<SetStateAction<unknown>>, 
        href?:string}>
    data: Array<{[key in string]:ReactNode}>
    emptyComponent: React.ReactNode
}

export const DataTable = ({data, columns, emptyComponent=<></>}:IDataTable) => {

    return checkArrayObjectIsEmpty(data)? emptyComponent : 
        (
            <table className={styles.table} border={0} >
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
                    {data?.map((rowItem, rowIndex) => (
                        <tr key={rowIndex} className={styles.tableRow}>
                            {columns?.map((colItem, colIndex) => (
                                <td key={colIndex} className={clsx(colItem.alignToCenter && styles.tableCenteredText, 
                                colIndex === 0 && styles.tablePaddingLeft)}>
                                    {colItem.isPrimary?
                                        colItem.href? 
                                        <Link to={`${colItem.href}/${rowItem[colItem.value]}`}>
                                            <Text variant="body" color="primary" type="value">
                                                {rowItem[`${colItem.value}_summarized`]?.toString() || ""}
                                            </Text>
                                        </Link>
                                        : 
                                        <Text variant="body" className={styles.cursorPointer} color="primary" type="value" onClick={() => typeof colItem?.fn === "function" && colItem.fn(rowItem[colItem.value]?.toString())}>
                                            {rowItem[`${colItem.value}_summarized`]?.toString() || ""}
                                        </Text>
                                        :
                                        <Text variant="body" type="value">{rowItem[colItem.value]?.toString() || ""}</Text>
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        )
    }