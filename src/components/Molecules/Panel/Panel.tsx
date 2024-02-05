import React from 'react';
import styles from './styles.module.css';
import { Spacer } from "@site/src/components/Atoms/Spacer";
import { Text } from "@site/src/components/Atoms/Text";
import clsx from 'clsx';

interface IPanel {
    title?: string
    children?: React.ReactNode
    variant?:"menu" | "normal" | "primary" | "primaryLabels" | "values"
    titleClassName?:string
    titleSize?:"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
    className?:string
}

const Panel = ({title="", variant="normal", children, titleSize = 'lg', titleClassName, className}:IPanel) => {

    return(<div className={clsx(styles.panelRoot, className)}>
                <div className={clsx(styles.panelTitleBase, styles.panelTitle)}>
                    <Text variant={variant} size={titleSize} className={titleClassName}>{title}</Text>
                </div>
                <Spacer />
                    {children}
                <Spacer />
            </div>
    )
}

export default Panel;